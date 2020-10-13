/* eslint-disable no-useless-escape */
export const store = target => {
  const output = {
    namespaced: true,
    state: {},
    getters: {
      "*": state => state
    },
    mutations: {},
    actions: {
      mounted: context => context
    }
  };
  output.state = target.state;
  if (target.mounted && typeof target.mounted === "function") {
    output.actions.mounted = target.mounted;
  }
  if (target.mutations && typeof target.mutations === "object") {
    target.mutations = target.mutations || {};
    Object.keys(target.state).forEach(k => {
      if (!target.mutations[k]) {
        output.mutations[k] = (state, payload) => {
          state[k] = payload;
        };
      }
    });
    output.mutations = Object.assign(output.mutations, target.mutations);
  }
  if (target.state && typeof target.state === "object") {
    target.getters = target.getters || {};
    Object.keys(target.state).forEach(k => {
      if (!target.getters[k]) {
        output.getters[k] = state => state[k];
      }
    });
    output.getters = Object.assign(output.getters, target.getters);
  }
  if (target.actions && typeof target.actions === "object") {
    Object.keys(target.actions).forEach(k => {
      if (k !== "mounted") {
        output.actions[k] = target.actions[k];
      }
    });
  }
  return output;
};
