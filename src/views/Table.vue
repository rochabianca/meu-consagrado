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
        {{ table.payments }}
      </div>

      <div class="table__total">Total: {{ total }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      table: null
    };
  },
  created() {
    const { id } = this.$route.params;
    this.getTableInfo(id);
  },
  methods: {
    getTableInfo(id) {
      this.$store.dispatch("getTableInfo", { id: Number(id) }).then(data => {
        this.table = data;
        console.log(this.table.orders);
      });
    }
  },
  computed: {
    total() {
      const totalOrders = this.table.orders
        .map(order => order.price * order.qtd)
        .reduce((total, order) => {
          return total + order;
        });
      const totalPaid = this.table.payments
        .map(pay => pay.paid)
        .reduce((total, paid) => {
          return total + paid;
        });
      return (totalOrders - totalPaid).toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped></style>
