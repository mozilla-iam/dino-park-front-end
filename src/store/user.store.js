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
    ...userInvitationsState,
    ...userRequestsState,
    personListViewPreference: 'list',
  },
  actions: {
    ...userInvitationsActions,
    ...userRequestsActions,
    setPersonViewPreference({ commit }, preference) {
      commit('setPersonViewPreference', preference);
    },
  },
  mutations: {
    ...userInvitationsMutations,
    ...userRequestsMutations,
    setPersonViewPreference(state, preference) {
      state.personListViewPreference = preference;
    },
  },
  getters: {
    ...userInvitationsGetters,
    ...userRequestsGetters,
  },
};
