// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   },
// });

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // Equivalent à "data" dans Vue: état à l'instant "T".
  state: {
    admin: false,
  },
  // Equivalent à "computed" dans Vue.
  getters: {
    systemAdministrator(state) {
      return state.admin;
    },
  },
  // Modification du state (synchrone).
  mutations: {
    SET_ROLE(state, userRole) {
      state.admin = userRole;
    },
  },
  // Equivalent à "methods" dans Vue (asynchrone).
  actions: {
    setRole({ commit }, userRole) {
      commit('SET_ROLE', userRole);
    },
  },
});
