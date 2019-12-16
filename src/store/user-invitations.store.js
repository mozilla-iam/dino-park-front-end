import {
  GroupInvitationViewModel,
  INVITATION_STATE,
} from '@/view_models/AccessGroupViewModel.js';
import invitationGroupData from './invitationgroupdata.json';
import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();

export const userInvitationsState = {
  invitations: [],
};

export const userInvitationsActions = {
  async fetchInvitations({ commit }) {
    const data = invitationGroupData;
    try {
      commit('setInvitations', data.invitations);
    } catch (e) {
      throw new Error(e.message);
    }
    return data;
  },
  async acceptInvitations({ commit, state }, idx) {
    if (idx >= state.data.length) {
      state.error = `Index out of bounds for invitations: ${idx}`;
      throw new Error(state.error);
    }
    const currentInvitation = state.data[idx];
    try {
      const result = await accessGroupsService.acceptInvitation(
        currentInvitation.group_name
      );
      commit('acceptInvitations', idx);
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async rejectInvitations({ commit, state }, idx) {
    if (idx >= state.data.length) {
      state.error = `Index out of bounds for invitations: ${idx}`;
      throw new Error(state.error);
    }
    const currentInvitation = state.data[idx];
    try {
      const result = await accessGroupsService.rejectInvitation(
        currentInvitation.group_name
      );
      commit('rejectInvitations', idx);
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
        invite => new GroupInvitationViewModel(invite)
      );
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
  acceptInvitations(state, idx) {
    if (idx >= state.invitations.length) {
      state.error = `Index out of bounds for userInvitations: ${idx}`;
      throw new Error(state.error);
    }
    state.invitations[idx].state = INVITATION_STATE.ACCEPTED;
  },
  rejectInvitations(state, idx) {
    if (idx >= state.invitations.length) {
      state.error = `Index out of bounds for userInvitations: ${idx}`;
      throw new Error(state.error);
    }
    state.invitations[idx].state = INVITATION_STATE.REJECTED;
  },
};

export const userInvitationsGetters = {
  getInvitations: ({ invitations }) => invitations,
  getActiveInvitations: ({ invitations }) =>
    invitations.filter(invitation => {
      return (
        invitation.state !== INVITATION_STATE.ACCEPTED &&
        invitation.state !== INVITATION_STATE.REJECTED
      );
    }),
};
