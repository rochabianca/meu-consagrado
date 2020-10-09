import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    ],
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
  },
  mutations: {},
  actions: {
    getTables() {
      return this.state.tables;
    },
    getTableInfo(context, payload) {
      //under normal circustances this would be a call for the API, but since the data is mocked on state I will just find the right table
      const table = this.state.tableInfo.find(table => table.id === payload.id);
      if (table === undefined)
        return Promise.reject(new Error("Mesa não encontrada"));
      return Promise.resolve(table);
    }
  },
  modules: {}
});
