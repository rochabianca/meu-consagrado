<template>
  <div class="home">
    Mesas Disponíveis
    <router-link
      class="tables__container"
      v-for="table in filteredTables"
      :key="table.id"
      :to="`/table/${table.id}`"
    >
      {{ table.id }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
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
      this.$store.dispatch("getTables").then(data => {
        this.tables = data;
      });
    }
  },
  computed: {
    filteredTables() {
      return this.tables.filter(table => !table.available);
    }
  }
};
</script>
