<template>
  <div class="home">
    <h1 class="home__title">Mesas Disponíveis</h1>
    <table-item
      v-for="table in filteredTables"
      :key="table.id"
      :table="table"
    />
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
