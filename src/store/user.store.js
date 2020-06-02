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
import {
  userRequestsState,
  userRequestsActions,
  userRequestsMutations,
  userRequestsGetters,
} from './user-requests.store';

export default {
  namespaced: true,
  state: {
    ...profileState,
    ...userInvitationsState,
    ...userRequestsState,
    personListViewPreference: 'list',
  },
  actions: {
    ...profileActions,
    ...userInvitationsActions,
    ...userRequestsActions,
    setPersonViewPreference({ commit }, preference) {
      commit('setPersonViewPreference', preference);
    },
  },
  mutations: {
    ...profileMutations,
    ...userInvitationsMutations,
    ...userRequestsMutations,
    setPersonViewPreference(state, preference) {
      state.personListViewPreference = preference;
    },
  },
  getters: {
    ...profileGetters,
    ...userInvitationsGetters,
    ...userRequestsGetters,
  },
};
