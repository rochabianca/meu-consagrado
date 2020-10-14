<template>
  <div class="table-payments">
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
          <tr v-for="(payment, index) in payments" :key="`payments-${index}`">
            <td>{{ payment.created_at | date }}</td>
            <td class="table__align-right">
              {{ payment.paid | price }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total" :class="{ 'total--paid': total === 0 }">
        <span class="total__label">Total Pago</span>
        <span class="total__price">
          {{ totalPaid | price }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TablePayments",
  props: {
    payments: Array,
    totalPaid: Number,
    total: Number
  }
};
</script>

<style lang="scss" scoped>
.table-payments {
  margin-top: 48px;
  @media (min-width: 1024px) {
    width: 50%;
    margin-top: 0px;
    border-left: 1px dotted $gray;
    padding-left: 48px;
  }
}
</style>
