<template>
  <div class="restautant-table">
    <div v-if="table">
      <h2 v-if="!isMobile" class="restautant-table__title">
        Mesa {{ table.id }}
      </h2>

      <div class="restautant-table__container">
        <p class="restautant-table__available" v-if="table.orders.length === 0">
          Essa mesa está disponível
        </p>
        <div class="restautant-table__orders" v-else>
          <div class="restautant-table__orders__header">
            <h3
              class="restautant-table__title restautant-table__title--subtitle restautant-table__orders__header__title"
            >
              Pedidos
            </h3>
            <button
              @click="showPayBill = true"
              class="button button__secondary"
              v-if="!isMobile"
            >
              Adicionar Pagamento
            </button>
          </div>
          <table class="table">
            <thead>
              <th>Produto</th>
              <th class="table__align-center">Quantidade</th>
              <th class="table__align-right">Preço</th>
            </thead>
            <tbody>
              <tr v-for="order in table.orders" :key="order.product">
                <td>{{ order.product }}</td>
                <td class="table__align-center">{{ order.qtd }}</td>
                <td class="table__align-right">
                  {{ order.price | price }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!isMobile" class="restautant-table__total">
            <span class="restautant-table__total__label">Total</span>
            <span class="restautant-table__total__price">{{
              total | price
            }}</span>
          </div>
        </div>
        <div
          v-if="table.payments.length > 0"
          class="restautant-table__payments"
        >
          <h3 class="restautant-table__title restautant-table__title--subtitle">
            Pagamentos
          </h3>
          <div>
            <table class="table">
              <thead>
                <th>Hora</th>
                <th class="table__align-right">Valor Pago</th>
              </thead>
              <tbody>
                <tr
                  v-for="(payment, index) in table.payments"
                  :key="`payments-${index}`"
                >
                  <td>{{ payment.created_at | date }}</td>
                  <td class="table__align-right">
                    {{ payment.paid | price }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div @click="showPayBill = true" class="restautant-table__total--mobile">
      <span>Adicionar Pagamento</span>
      <div class="restautant-table__total--mobile__price">
        {{ total | price }}
      </div>
    </div>
    <pay-bill
      @new-payment="addNewPayment"
      @close="showPayBill = false"
      :total="+total"
      :show="showPayBill"
    />
  </div>
</template>

<script>
import PayBill from "@/components/PayBill.vue";
import { mapGetters } from "vuex";

export default {
  name: "Table",
  components: {
    PayBill
  },
  data() {
    return {
      table: null,
      error: null,
      showPayBill: false
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
    ...mapGetters({
      isMobile: "device/isMobile"
    }),
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
.restautant-table {
  position: relative;
  margin-bottom: 86px; // 54px of restautant-table__total--mobile and 32px of space
  .restautant-table__title {
    font-size: 32px;
    margin-top: 0px;
    margin-bottom: 32px;
    color: $dark-blue;
    text-transform: uppercase;
    font-weight: lighter;

    &.restautant-table__title--subtitle {
      font-size: 24px;
      margin-bottom: 16px;
      text-transform: capitalize;
    }
  }
  .restautant-table__container {
    @media (min-width: 1024px) {
      display: flex;
      align-items: flex-start;
    }
  }
  .restautant-table__orders {
    @media (min-width: 1024px) {
      width: 50%;
      padding-right: 48px;
    }
    .restautant-table__orders__header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .restautant-table__orders__header__title {
        margin-bottom: 0px;
        margin-right: 16px;
      }
    }
  }
  .restautant-table__payments {
    margin-top: 48px;
    @media (min-width: 1024px) {
      width: 50%;
      margin-top: 0px;
      border-left: 1px dotted $gray;
      padding-left: 48px;
    }
  }
  .restautant-table__total {
    @media (max-width: 768px) {
      display: none;
    }
  }
  .restautant-table__total {
    background: $dark-blue;
    color: $white;
    padding: 16px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .restautant-table__total__price {
      font-weight: bold;
    }
  }
  .restautant-table__total--mobile {
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
    .restautant-table__total--mobile__price {
      font-weight: bold;
    }
  }
}
</style>
