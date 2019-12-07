import profile from './profile.store';
import invitations from './invitations.store';
export default {
  namespaced: true,
  modules: {
    profile,
    invitations,
  },
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
  getters: {},
};
