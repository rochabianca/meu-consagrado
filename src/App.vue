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
  },
  beforeRouteUpdate() {
    console.log("beforeRouteUpdate");
  },
  mounted() {
    console.log("montou");

    const resources = container => {
      this.$store.commit("device/calc", {
        width: container.innerWidth,
        heigth: container.innerHeight
      });
    };
    resources(window);
    window.addEventListener("resize", () => {
      resources(window);
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/global.scss";

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
    padding: 32px 16px;
  }
}
</style>
