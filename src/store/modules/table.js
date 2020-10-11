export default {
  state: () => ({
    tableInfo: [
      {
        id: 1,
        orders: [],
        payments: []
      },
      {
        id: 2,
        orders: [
          {
            produtct: "Cappuccino",
            qtd: 2,
            price: 5.0
          },
          {
            produtct: "Suco de Laranja",
            qtd: 1,
            price: 9.5
          },
          {
            produtct: "X-Tudo",
            qtd: 3,
            price: 19.99
          },
          {
            produtct: "Batata Frita",
            qtd: 1,
            price: 10.0
          }
        ],
        payments: [
          {
            created_at: Date.now(),
            paid: 10.0
          },
          {
            created_at: Date.now(),
            paid: 20.0
          }
        ]
      },
      {
        id: 3,
        orders: [
          {
            produtct: "Cappuccino",
            qtd: 2,
            price: 5.0
          },
          {
            produtct: "Suco de Laranja",
            qtd: 1,
            price: 9.5
          },
          {
            produtct: "X-Tudo",
            qtd: 3,
            price: 19.99
          },
          {
            produtct: "Batata Frita",
            qtd: 1,
            price: 10.0
          }
        ],
        payments: []
      },
      {
        id: 4,
        orders: [
          {
            produtct: "Cappuccino",
            qtd: 2,
            price: 5.0
          },
          {
            produtct: "Suco de Laranja",
            qtd: 1,
            price: 9.5
          },
          {
            produtct: "X-Tudo",
            qtd: 3,
            price: 19.99
          },
          {
            produtct: "Batata Frita",
            qtd: 1,
            price: 10.0
          }
        ],
        payments: []
      }
    ]
  }),
  mutations: {
    addPayment(state, payload) {
      const { idTable } = payload;
      const tableIndex = state.tableInfo.findIndex(
        table => table.id === idTable
      );
      if (tableIndex !== -1) state.tableInfo[tableIndex].payments.push(payload);
    }
  },
  actions: {
    getTableInfo({ state }, payload) {
      const table = state.tableInfo.find(table => table.id === payload.id);
      if (table === undefined)
        return Promise.reject(new Error("Mesa não encontrada"));
      return Promise.resolve(table);
    },
    createPayment({ commit }, payload) {
      commit("addPayment", payload);
      return payload;
    }
  }
};
