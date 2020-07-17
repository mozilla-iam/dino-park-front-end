import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();

export const invitationEmailState = {
  invitationEmail: '',
};
export const invitationEmailActions = {
  async fetchInvitationEmail({ state, commit }) {
    try {
      const { body } = await accessGroupsService.getInvitationEmail(
        state.group.name,
      );
      commit('setInvitationEmail', body);
      return body;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateInvitationEmail({ dispatch, state }, text) {
    try {
      const result = await accessGroupsService.updateInvitationEmail(
        state.group.name,
        text,
      );
      await dispatch('fetchInvitationEmail');
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async deleteInvitationEmail({ dispatch, state }) {
    try {
      const result = await accessGroupsService.updateInvitationEmail(
        state.group.name,
        '',
      );
      await dispatch('fetchInvitationEmail');
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
export const invitationEmailMutations = {
  setInvitationEmail(state, content) {
    try {
      state.invitationEmail = !content ? '' : content;
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};
export const invitationEmailGetters = {
  getInvitationEmail: (state) => {
    return state.invitationEmail;
  },
};
