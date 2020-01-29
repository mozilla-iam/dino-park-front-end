import Vuex from 'vuex';
import Vue from 'vue';
import { DISPLAY_PROFILE } from '@/queries/profile';
import Scope from '@/assets/js/scope';
import { client } from '@/server';
import user from './user.store.js';
import scope from './scope.store.js';
import accessGroup from './access-group.store.js';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    userV2: user,
    scopeV2: scope,
    accessGroup,
  },
  state: {
    user: null,
    scope: new Scope(),
    org: null,
    error: false,
  },
  actions: {
    // TODO: Create error handling for this action
    async fetchUser({ commit }) {
      const { data } = await client.query({
        query: DISPLAY_PROFILE,
        variables: { username: null },
      });
      commit('setUser', data.profile);
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
  },
  getters: {},
});
