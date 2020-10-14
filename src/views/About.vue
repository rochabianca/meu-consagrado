<template>
  <div data-cy="about-page" class="about">
    <p>
      Criado com <span class="about__heart">♥</span> por
      <a
        target="_blank"
        class="about__link"
        href="https://github.com/rochabianca"
      >
        Bianca Rocha
      </a>
    </p>
    <p>Você pode me encontrar em</p>
    <ul class="about__list">
      <li
        v-for="{ icon, value } in links"
        :key="icon"
        class="about__list__item"
      >
        <a
          target="_blank"
          class="about__social-link"
          :class="`about__social-link--${icon}`"
          :href="value"
        >
          <img
            :src="require(`@/assets/icons/social/${icon}.svg`)"
            :alt="icon"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "About",
  computed: {
    links() {
      return [
        {
          value: "https://github.com/rochabianca",
          icon: "github"
        },
        {
          value: "https://dribbble.com/baiah",
          icon: "dribbble"
        },
        {
          value: "https://www.linkedin.com/in/bianca-rocha-0a6794100/",
          icon: "linkedin"
        },
        {
          value: "mailto:bianca.rocha1711@gmail.com",
          icon: "email"
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  color: $dark-blue;
  .about__heart {
    color: $red;
  }
  .about__link {
    color: $purple;
  }
  .about__list {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .about__list__item + .about__list__item {
    margin-left: 8px;
  }
  .about__social-link {
    display: inline-block;
    width: 25px;
    &.about__social-link--linkedin {
      width: 23px;
    }
    &.about__social-link--email {
      width: 28px;
    }
  }
}
</style>
