import {
  GroupInvitationViewModel,
  INVITATION_STATE,
} from '@/view_models/AccessGroupViewModel.js';
import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();

export const userInvitationsState = {
  invitations: [],
};

export const userInvitationsActions = {
  async fetchInvitations({ commit }) {
    try {
      const data = await accessGroupsService.getUserInvitations();
      commit('setInvitations', data);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async acceptInvitation({ dispatch }, invitation) {
    try {
      const result = await accessGroupsService.acceptInvitation(
        invitation.groupName,
      );
      await dispatch('fetchInvitations');
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async rejectInvitation({ dispatch }, invitation) {
    try {
      const result = await accessGroupsService.rejectInvitation(
        invitation.groupName,
      );
      await dispatch('fetchInvitations');
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export const userInvitationsMutations = {
  setInvitations(state, invitations) {
    try {
      state.invitations = invitations.map(
        (invite) => new GroupInvitationViewModel(invite),
      );
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};

export const userInvitationsGetters = {
  getInvitationByName: ({ invitations }) => (groupName) => {
    const options = invitations.filter(
      (invite) => invite.groupName === groupName,
    );
    if (options.length !== 1) {
      return null;
    }
    return options[0];
  },
  getInvitations: ({ invitations }) => invitations,
  getActiveInvitations: ({ invitations }) =>
    invitations.filter((invitation) => {
      return (
        invitation.state !== INVITATION_STATE.ACCEPTED &&
        invitation.state !== INVITATION_STATE.REJECTED
      );
    }),
};
