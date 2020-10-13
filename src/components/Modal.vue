<template>
  <transition :name="animation">
    <div class="modal">
      <div class="modal__header">
        <h2 class="modal__title">
          {{ title }}
        </h2>
        <button @click="$emit('close')" class="modal__close">
          <img :src="require('@/assets/icons/close.svg')" alt="x" />
        </button>
      </div>

      <div class="modal__content">
        <slot></slot>
      </div>

      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Modal",
  props: {
    title: String
  },
  computed: {
    ...mapGetters({
      isMobile: "device/isMobile"
    }),
    animation() {
      if (this.isMobile) return "slideUp";
      return "slideRight";
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: white;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  @media (min-width: 769px) {
    width: 40%;
    left: auto;
    box-shadow: 12px 0px 10px 11px rgba(0, 0, 0, 0.3);
  }
  .modal__header,
  .modal__footer {
    padding: 16px;
  }
  .modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $gray;
    margin-bottom: 32px;
    .modal__title {
      font-size: 24px;
      color: $dark-blue;
      margin: 0px;
    }
    .modal__close {
      display: block;
      outline-color: $gray;
      background: none;
      border: none;
      img {
        height: 25px;
      }
    }
  }
  .modal__content {
    padding: 0px 16px;
  }
  .modal__footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: calc(100% - 32px);
    border-top: 1px solid $gray;
    text-align: right;
    @media (min-width: 769px) {
      width: calc(100% - 32px);
      left: auto;
    }
  }
}
</style>
