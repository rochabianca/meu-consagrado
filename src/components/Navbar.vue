<template>
  <div class="navbar">
    <img :src="require('@/assets/images/logo.png')" class="navbar__logo" />
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
export default {
  name: "Navbar",
  computed: {
    links() {
      return [
        {
          value: "/",
          label: "Home"
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
