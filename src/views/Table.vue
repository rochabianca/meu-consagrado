<template>
  <div class="restautant-table">
    <div v-if="table">
      <div v-if="!isMobile" class="restaurant-table__header">
        <router-link to="/">
          <arrow-left class="restaurant-table__header__arrow" color="#9292a0" />
        </router-link>
        <h2 class="title">Mesa {{ table.id }}</h2>
      </div>
      <div class="restautant-table__container">
        <p class="restautant-table__available" v-if="table.orders.length === 0">
          Essa mesa está disponível
        </p>
        <table-orders
          v-else
          :orders="table.orders"
          :total="+total"
          :is-mobile="isMobile"
          @show-pay-bill="showPayBill = true"
        />
        <div
          v-if="table.payments.length > 0"
          class="restautant-table__payments"
        >
          <h3 class="title title--subtitle">
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
            <div class="total" :class="{ 'total--paid': total === '0.00' }">
              <span class="total__label">Total Pago</span>
              <span class="total__price">
                {{ totalPaid | price }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div
      @click="showPayBill = true"
      v-if="total !== '0.00'"
      class="total--mobile"
      :class="{ 'total--mobile--paid': total === '0.00' }"
    >
      <span class="total__label--paid" v-if="total === '0.00'">
        A conta está paga!
      </span>
      <template v-else>
        <span>Adicionar Pagamento</span>
        <div class="total--mobile__price">
          {{ total | price }}
        </div>
      </template>
    </div>
    <div v-else class="total--mobile total--mobile--paid">
      <span class="total__label--paid">
        A conta está paga!
      </span>
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
import TableOrders from "@/components/TableOrders.vue";
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import { mapGetters } from "vuex";

export default {
  name: "Table",
  components: {
    PayBill,
    TableOrders,
    ArrowLeft
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
  margin-bottom: 86px; // 54px of total--mobile and 32px of space
  .restaurant-table__header {
    display: flex;
    align-items: baseline;
    margin-bottom: 32px;
  }
  .restaurant-table__header__arrow {
    width: 12px;
    margin-right: 8px;
  }
  .restautant-table__container {
    @media (min-width: 1024px) {
      display: flex;
      align-items: flex-start;
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
  .total--mobile {
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
    &.total--mobile--paid {
      background: $green;
    }
    .total--mobile__price {
      font-weight: bold;
    }
  }
}
</style>
