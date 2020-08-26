export default {
  namespaced: true,
  state: {
    personListViewPreference: 'list',
  },
  actions: {
    setPersonViewPreference({ commit }, preference) {
      commit('setPersonViewPreference', preference);
    },
  },
  mutations: {
    setPersonViewPreference(state, preference) {
      state.personListViewPreference = preference;
    },
  },
};
