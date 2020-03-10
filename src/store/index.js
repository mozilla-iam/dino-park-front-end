import Vuex from 'vuex';
import Vue from 'vue';
import { DISPLAY_PROFILE } from '@/queries/profile';
import Scope from '@/assets/js/scope';
import { client } from '@/server';
import user from './user.store';
import scope from './scope.store';
import accessGroup from './access-group.store';
import features from './features.store';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    userV2: user,
    scopeV2: scope,
    features,
    accessGroup,
  },
  state: {
    user: null,
    scope: new Scope(),
    org: null,
    error: false,
    loading: false,
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
    setLoading({ commit }) {
      commit('setLoading', true);
    },
    completeLoading({ commit }) {
      commit('setLoading', false);
    },
  },
  mutations: {
    setUser(state, userContent) {
      state.user = userContent;
      state.scope.update(userContent);
    },
    setOrg(state, org) {
      state.org = org;
    },
    setLoading(state, loadingState) {
      state.loading = loadingState;
    },
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
  },
});
