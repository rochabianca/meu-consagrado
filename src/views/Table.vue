<template>
  <div class="table">
    <div v-if="table">
      <h2 class="table__title">Mesa {{ table.id }}</h2>
      <p class="table__available" v-if="table.orders.length === 0">
        Essa mesa está disponível
      </p>
      <div class="table__orders" v-else>
        <h3 class="table__title table__title--subtitle">Pedidos</h3>
        <table class="table__table">
          <thead>
            <th>Produto</th>
            <th class="table__table__align-center">Quantidade</th>
            <th class="table__table__align-right">Preço</th>
          </thead>
          <tbody>
            <tr v-for="order in table.orders" :key="order.product">
              <td>{{ order.product }}</td>
              <td class="table__table__align-center">{{ order.qtd }}</td>
              <td class="table__table__align-right">
                {{ order.price | price }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="table.payments.length > 0" class="table__payments">
        <h3 class="table__title table__title--subtitle">Pagamentos</h3>
        <div>
          <table class="table__table">
            <thead>
              <th>Hora</th>
              <th class="table__table__align-right">Valor Pago</th>
            </thead>
            <tbody>
              <tr
                v-for="(payment, index) in table.payments"
                :key="`payments-${index}`"
              >
                <td>{{ payment.created_at | date }}</td>
                <td class="table__table__align-right">
                  {{ payment.paid | price }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="table__total">Total: {{ total | price }}</div>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div @click="showPayBill = true" class="table__total--mobile">
      <span>Adicionar Pagamento</span>
      <div class="table__total--mobile__price">{{ total | price }}</div>
    </div>
    <pay-bill
      @new-payment="addNewPayment"
      @close="showPayBill = false"
      v-if="showPayBill"
    />
  </div>
</template>

<script>
import PayBill from "@/components/PayBill.vue";

export default {
  name: "Table",
  components: {
    PayBill
  },
  data() {
    return {
      table: null,
      error: null,
      showPayBill: true
    };
  },
  created() {
    const { id } = this.$route.params;
    this.getTableInfo(id);
  },
  methods: {
    getTableInfo(id) {
      this.$store
        .dispatch("getTableInfo", { id: Number(id) })
        .then(data => {
          this.table = data;
        })
        .catch(e => {
          this.error = e.message;
        });
    },
    addNewPayment(payment) {
      this.table.payments.push(payment);
      this.showPayBill = false;
    }
  },
  computed: {
    totalPaid() {
      if (
        !this.table ||
        !this.table.payments ||
        this.table.payments.length === 0
      )
        return 0;
      return this.table.payments
        .map(pay => Number(pay.paid))
        .reduce((total, paid) => {
          return total + paid;
        });
    },
    total() {
      if (!this.table || !this.table.orders) return 0;
      const totalOrders = this.table.orders
        .map(order => order.price * order.qtd)
        .reduce((total, order) => {
          return total + order;
        });
      return (totalOrders - this.totalPaid).toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  position: relative;
  margin-bottom: 86px; // 54px of table__total--mobile and 32px of space
  .table__title {
    font-size: 24px;
    margin-top: 0px;
    margin-bottom: 24px;
    color: $dark-blue;
    &.table__title--subtitle {
      font-size: 18px;
      margin-bottom: 16px;
      font-weight: bold;
    }
  }
  .table__table {
    margin: 0px;
    width: 100%;
    border-collapse: collapse;
    color: $dark-blue;
    thead,
    tbody {
      text-align: left;
    }
    th,
    td {
      padding: 16px 0px;
      vertical-align: middle;
      border-bottom: 1px solid $gray;
    }
    thead {
      th {
        padding: 0px 0px 16px 0px;
        border-bottom: 1px solid $dark-blue;
      }
    }
    .table__table__align-center {
      text-align: center;
    }
    .table__table__align-right {
      text-align: right;
    }
  }
  .table__payments {
    margin-top: 32px;
  }
  .table__total {
    @media (max-width: 768px) {
      display: none;
    }
  }
  .table__total--mobile {
    @media (min-width: 769px) {
      display: none;
    }
    position: fixed;
    width: calc(100% - 64px);
    left: 0;
    right: 0;
    bottom: 0px;
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    background: $dark-blue;
    color: $white;
    .table__total--mobile__price {
      font-weight: bold;
    }
  }
}
</style>
