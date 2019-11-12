import Vuex from 'vuex';
import Vue from 'vue';
import { DISPLAY_PROFILE } from './queries/profile';
import Scope from './assets/js/scope';
import { client } from './server';
import accessGroupData from './accessgroupdata.json';
import { AccessGroupDetailsViewModel } from './view_models/AccessGroupViewModel';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null,
    scope: new Scope(),
    accessGroup: null,
    org: null,
    personViewPreference: 'list',
    error: false,
  },
  actions: {
    async fetchUser({ commit }) {
      const { data } = await client.query({
        query: DISPLAY_PROFILE,
        variables: { username: null },
      });
      commit('setUser', data.profile);
    },
    async fetchAccessGroup({ commit }) {
      const data = accessGroupData;
      try {
        commit('setAccessGroupData', data);
      } catch (e) {
        throw new Error(e.message);
      }
      return data;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.scope.update(user);
    },
    setOrg(state, org) {
      state.org = org;
    },
    setPersonViewPreference(state, preference) {
      state.personViewPreference = preference;
    },
    setAccessGroupData(state, accessGroup) {
      try {
        state.accessGroup = new AccessGroupDetailsViewModel(accessGroup);
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
  },
});
