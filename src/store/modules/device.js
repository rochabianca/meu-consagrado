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
  }
});
