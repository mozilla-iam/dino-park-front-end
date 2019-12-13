import {
  profileState,
  profileActions,
  profileMutations,
  profileGetters,
} from './profile.store';
import {
  userInvitationsState,
  userInvitationsActions,
  userInvitationsMutations,
  userInvitationsGetters,
} from './user-invitations.store';

export default {
  namespaced: true,
  state: {
    ...profileState,
    ...userInvitationsState,
    personListViewPreference: 'list',
  },
  actions: {
    ...profileActions,
    ...userInvitationsActions,
    setPersonViewPreference({ commit }, preference) {
      commit('setPersonViewPreference', preference);
    },
  },
  mutations: {
    ...profileMutations,
    ...userInvitationsMutations,
    setPersonViewPreference(state, preference) {
      state.personListViewPreference = preference;
    },
  },
  getters: {
    ...profileGetters,
    ...userInvitationsGetters,
  },
};
