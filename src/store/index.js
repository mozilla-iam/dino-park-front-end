import Vuex from 'vuex';
import Vue from 'vue';
import { DISPLAY_PROFILE } from '@/queries/profile';
import Scope from '@/assets/js/scope';
import { client } from '@/server';
import user from './user.store';
import scope from './scope.store';
import accessGroup from './access-group.store';
import accessGroups from './access-groups.store';
import features from './features.store';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    userV2: user,
    scopeV2: scope,
    features,
    accessGroup,
    accessGroups,
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

export function fetchBase(store) {
  return [
    [() => store.dispatch('features/fetch'), () => store.dispatch('fetchUser')],
    [() => {}, () => {}],
  ];
}

export function fetchMembers(store, groupname) {
  return [
    [() => store.dispatch('accessGroup/fetchMembers', groupname)],
    [(data) => {}],
  ];
}

export function fetchProfile(store) {
  return [
    [() => store.dispatch('userV2/fetchProfile')],
    [() => store.dispatch('userV2/fetchInvitations')],
  ];
}

export function fetchAccessGroup(store, groupname) {
  return [
    [() => store.dispatch('accessGroup/fetchGroup', groupname)],
    [(data) => {}],
  ];
}
export function fetchAccessGroups(store) {
  return [[() => store.dispatch('accessGroups/fetchList')], [(data) => {}]];
}
export function fetchTerms(store) {
  return [[() => store.dispatch('accessGroup/fetchTerms')], [(data) => {}]];
}

export function fetchInvitationsAndRequests(store) {
  return [
    [
      () => store.dispatch('accessGroup/fetchInvitations'),
      () => store.dispatch('accessGroup/fetchRequests'),
    ],
    [(data) => {}, (data) => {}],
  ];
}

export async function resolvePromisesSerially(promises, resolvers) {
  try {
    for (let i = 0, len = promises.length; i < len; i += 1) {
      resolvers[i](await promises[i]());
    }
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
}
