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
import { mapGetters } from "vuex";

export default {
  name: "TableItem",
  props: {
    table: Object
  },
  computed: {
    ...mapGetters({
      isMobile: "device/isMobile"
    })
  }
};
</script>

<style lang="scss" scoped>
.table-item {
  display: block;
  padding: 16px;
  max-width: 150px;
  border: 1px solid $gray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    max-width: 100%;
    justify-content: space-between;
  }
  .table-tem__arrow {
    display: none;
    @media (max-width: 768px) {
      width: 8px;
      display: block;
    }
  }
  .table-item__title {
    color: $dark-blue;
    font-size: 18px;
  }
}
.table-item + .table-item {
  margin-left: 16px;
  @media (max-width: 768px) {
    margin-left: 0px;
    margin-top: 16px;
  }
}
</style>
