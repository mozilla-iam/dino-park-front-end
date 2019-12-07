import { client } from '@/server.js';
import { DISPLAY_PROFILE } from '@/queries/profile';
import { ProfileViewModel } from '@/view_models/ProfileViewModel.js';

export default {
  namespaced: true,
  state: {
    data: null,
  },
  actions: {
    async fetch({ commit, dispatch }) {
      const { data } = await client.query({
        query: DISPLAY_PROFILE,
        variables: { username: null },
      });
      dispatch('scopeV2/set', data.profile, { root: true });
      commit('set', data.profile);
    },
  },
  mutations: {
    set(state, user) {
      state.data = new ProfileViewModel(user);
    },
  },
  getters: {
    get: state => {
      return state.data;
    },
  },
};
