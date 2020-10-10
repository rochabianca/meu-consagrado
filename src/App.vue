<template>
  <div id="app">
    <navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  ul,
  li {
    margin: 0px;
    padding: 0;
    list-style: none;
  }
  a {
    text-decoration: none;
  }
}
.container {
  padding: 32px;
  @media (max-width: 768px) {
    padding: 16px;
  }
}
</style>
