<template>
  <div class="home">
    <h1 class="home__title">Mesas</h1>
    <div class="home__container">
      <table-item
        v-for="table in filteredTables"
        :key="table.id"
        :table="table"
      />
    </div>
  </div>
</template>

<script>
import TableItem from "@/components/TableItem.vue";
export default {
  name: "Home",
  components: {
    TableItem
  },
  data() {
    return {
      tables: []
    };
  },
  created() {
    this.getTables();
  },
  methods: {
    getTables() {
      this.tables = this.$store.getters.getTables;
    }
  },
  computed: {
    filteredTables() {
      return this.tables.filter(table => !table.available);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .home__title {
    font-size: 24px;
    color: $dark-blue;
    margin-top: 0px;
    margin-bottom: 24px;
    font-weight: lighter;
  }
  .home__container {
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
      flex-direction: column;
      align-self: stretch;
    }
  }
}
</style>
