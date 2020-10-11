<template>
  <router-link class="table-item" :to="`/table/${table.id}`">
    <span class="table-item__title">Mesa {{ table.id }}</span>
    <img
      class="table-tem__arrow"
      :src="require('@/assets/icons/arrow-right.svg')"
      alt=">"
    />
  </router-link>
</template>

<script>
export default {
  name: "TableItem",
  props: {
    table: Object
  }
};
</script>

<style lang="scss" scoped>
.table-item {
  display: block;
  padding: 16px;
  max-width: 180px;
  border: 1px solid $gray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .table-tem__arrow {
    display: none;
    @media (max-width: 768px) {
      width: 8px;
    }
  }
  .table-item__title {
    color: $dark-blue;
    font-size: 18px;
  }
}
.table-item + .table-item {
  margin-top: 16px;
}
</style>
