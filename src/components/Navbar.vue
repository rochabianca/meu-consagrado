<template>
  <div class="navbar">
    <router-link v-if="isMobile && isTablePage" to="/" class="navbar__table">
      <arrow-left class="navbar__go-back" />
      <span>{{ routerName }}</span>
    </router-link>
    <router-link v-else to="/">
      <img :src="require('@/assets/images/logo.png')" class="navbar__logo" />
    </router-link>

    <nav class="navbar__nav">
      <ul class="navbar__list">
        <li
          v-for="({ value, label }, index) in links"
          :key="index"
          class="navbar__item"
        >
          <router-link :to="value">{{ label }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  components: {
    ArrowLeft
  },
  data() {
    return {
      isTablePage: false
    };
  },
  created() {
    this.isTablePage = this.$route.path.includes("/table/");
  },
  watch: {
    $route(to) {
      this.isTablePage = to.path.includes("/table/");
    }
  },
  computed: {
    ...mapGetters({
      isMobile: "device/isMobile"
    }),
    routerName() {
      const { id } = this.$route.params;
      return `${this.$router.history.current.name} ${id}`;
    },
    links() {
      return [
        {
          value: "/",
          label: "Início"
        },
        {
          value: "/about",
          label: "Sobre"
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background: $red;
  padding: 8px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .navbar__table {
    width: 150px;
    height: 40px;
    display: flex;
    align-items: center;
    .navbar__go-back {
      display: inline-block;
      width: 10px;
      margin-right: 8px;
    }
    text-transform: uppercase;
    font-weight: bold;
    color: $white;
  }
  .navbar__logo {
    width: 180px;
    @media (max-width: 768px) {
      width: 150px;
    }
  }
  .navbar__nav {
    .navbar__list {
      display: flex;
      align-items: center;
      .navbar__item a {
        color: $white;
        transition: all ease 0.3s;
        font-size: 18px;
        &:hover,
        &.router-link-exact-active {
          color: $dark-blue;
        }
        @media (max-width: 768px) {
          font-size: 16px;
        }
      }
      .navbar__item + .navbar__item {
        margin-left: 16px;
      }
    }
  }
}
</style>
