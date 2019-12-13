import AccessGroups from '@/assets/js/access-groups';
import { DisplayMemberViewModel } from '@/view_models/AccessGroupViewModel.js';

const accessGroupsService = new AccessGroups();

export const accessGroupInvitationsState = {
  invitations: [],
};
export const accessGroupInvitationsActions = {
  async fetchInvitations({ commit, state }) {
    const groupName = state.group.name;
    try {
      const invitations = await accessGroupsService.getAccessGroupMemberInvitations(
        groupName
      );
      commit('setInvitations', invitations);
      return invitations;
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};
export const accessGroupInvitationsMutations = {
  setInvitations(state, invitations) {
    try {
      state.invitations = invitations.map(
        invite => new DisplayMemberViewModel(invite)
      );
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};
export const accessGroupInvitationsGetters = {
  getInvitations: state => {
    return state.invitations;
  },
};
