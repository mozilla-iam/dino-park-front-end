import AccessGroups from '@/assets/js/access-groups';
import { DisplayMemberViewModel } from '@/view_models/AccessGroupViewModel';

const accessGroupsService = new AccessGroups();

export const accessGroupRequestsState = {
  requests: [],
};
export const accessGroupRequestsActions = {
  async fetchRequests({ commit, state }) {
    const groupName = state.group.name;
    try {
      const requests = await accessGroupsService.getAccessGroupMemberRequests(
        groupName,
      );
      commit('setRequests', requests);
      return requests;
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
  async rejectRequest({ state, dispatch }, request) {
    try {
      const result = await accessGroupsService.rejectRequest(
        state.group.name,
        request.uuid,
      );
      return await dispatch('fetchRequests', request.name);
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export const accessGroupRequestsMutations = {
  setRequests(state, requests) {
    try {
      state.requests = requests.map(
        (invite) => new DisplayMemberViewModel(invite),
      );
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};
export const accessGroupRequestsGetters = {
  getRequests: (state) => {
    return state.requests;
  },
};
