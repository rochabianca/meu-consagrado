<template>
  <div class="table__orders">
    <div class="table__orders__header">
      <h3 class="title title--subtitle table__orders__header__title">
        Pedidos
      </h3>
      <button
        @click="$emit('show-pay-bill')"
        class="button button__secondary"
        v-if="!isMobile && total !== '0.00'"
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
        <tr v-for="order in orders" :key="order.product">
          <td>{{ order.product }}</td>
          <td class="table__align-center">{{ order.qtd }}</td>
          <td class="table__align-right">
            {{ order.price | price }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="total" :class="{ 'total--paid': total === 0 }">
      <span class="total__label--paid" v-if="total === 0">
        A conta está paga!
      </span>
      <template v-else>
        <span class="total__label">Total</span>
        <span class="total__price">
          {{ total | price }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableOrders",
  props: {
    orders: Array,
    total: Number,
    isMobile: Boolean
  }
};
</script>

<style lang="scss" scoped>
.table__orders {
  @media (min-width: 1024px) {
    width: 50%;
    padding-right: 48px;
  }
  .table__orders__header {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .table__orders__header__title {
      margin-bottom: 0px;
      margin-right: 16px;
    }
  }
}
</style>
