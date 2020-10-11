export default {
  state: () => ({
    tables: [
      {
        id: 1,
        available: true
      },
      {
        id: 2,
        available: false
      },
      {
        id: 3,
        available: false
      },
      {
        id: 4,
        available: true
      },
      {
        id: 5,
        available: true
      },
      {
        id: 6,
        available: false
      },
      {
        id: 7,
        available: false
      }
    ]
  }),
  getters: {
    getTables(state) {
      return state.tables;
    }
  },
  mutations: {}
};
