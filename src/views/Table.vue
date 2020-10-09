<template>
  <div>
    <div v-if="table" class="table">
      <h2 class="table__title">Mesa {{ table.id }}</h2>
      <p class="table__available" v-if="table.orders.length === 0">
        Essa mesa está disponível
      </p>
      <div class="table__orders" v-else>
        <h3>Pedidos</h3>
        {{ table.orders }}
      </div>
      <div v-if="table.payments.length > 0" class="table__payments">
        <h3>Pagamentos</h3>
        <button @click="showPayBill = true" class="table__payments__button">
          Registrar Pagamento
        </button>
        <div>
          {{ table.payments }}
        </div>
      </div>
      <div class="table__total">Total: {{ total }}</div>
    </div>
    <pay-bill @new-payment="addNewPayment" v-if="showPayBill" />
    <div v-if="error">
      {{ error }}
    </div>
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
        .map(pay => pay.paid)
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

<style lang="scss" scoped></style>
