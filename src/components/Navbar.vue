<template>
  <div class="navbar">
    <img :src="require('@/assets/images/logo.png')" class="navbar__logo" />
    <nav class="navbar__nav">
      <ul class="navbar__list">
        <li class="navbar__item">
          <router-link to="/">Home</router-link>
        </li>
        <li class="navbar__item">
          <router-link to="/about">Sobre</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar"
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
  }
  .navbar__nav {
    .navbar__list {
      display: flex;
      align-items: center;
      .navbar__item a {
        color: $white;
        transition: all ease 0.3s;
        &:hover,
        &.router-link-exact-active {
          color: $dark-blue;
        }
      }
      .navbar__item + .navbar__item {
        margin-left: 16px;
      }
    }
  }
}
</style>
