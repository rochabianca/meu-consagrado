import Vue from "vue";
import Vuex from "vuex";

//modubles
import device from "@/store/modules/device.js";
import tables from "@/store/modules/tables.js";
import table from "@/store/modules/table.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    device,
    tables,
    table
  }
});
