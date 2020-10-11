import { store } from "../helpers";

export default store({
  state: {
    isMobile: false
  },
  getters: {
    isMobile(state) {
      return state.isMobile;
    }
  },
  mutations: {
    calc(state, payload) {
      state.isMobile = payload.width <= 768;
    }
  },
  mounted(context) {
    const resources = container => {
      context.commit("calc", {
        width: container.innerWidth,
        heigth: container.innerHeight
      });
    };
    resources(window);
    window.addEventListener("resize", () => {
      resources(window);
    });
  }
});
