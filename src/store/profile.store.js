import { client } from '@/server.js';
import { DISPLAY_PROFILE } from '@/queries/profile';
import { ProfileViewModel } from '@/view_models/ProfileViewModel.js';

export const profileState = {
  profile: null,
};
export const profileActions = {
  async fetchProfile({ commit, dispatch }) {
    const { data } = await client.query({
      query: DISPLAY_PROFILE,
      variables: { username: null },
    });
    dispatch('scopeV2/set', data.profile, { root: true });
    commit('setProfile', data.profile);
  },
};
export const profileMutations = {
  setProfile(state, user) {
    try {
      state.profile = new ProfileViewModel(user);
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};
export const profileGetters = {
  getProfile: state => {
    return state.profile;
  },
};
