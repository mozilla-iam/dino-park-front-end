import { GroupRequestViewModel } from '@/view_models/AccessGroupViewModel.js';
import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();

export const userRequestsState = {
  requests: [],
};

export const userRequestsActions = {
  async fetchRequests({ commit }) {
    try {
      const data = await accessGroupsService.getUserRequests();
      commit('setRequests', data);
      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async requestInvitation({ dispatch }, request) {
    try {
      const result = await accessGroupsService.requestInvitation(
        request.groupName,
      );
      await dispatch('fetchRequests');
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async cancelRequest({ dispatch }, request) {
    try {
      const result = await accessGroupsService.cancelRequest(request.groupName);
      await dispatch('fetchRequests');
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export const userRequestsMutations = {
  setRequests(state, requests) {
    try {
      state.requests = requests.map(
        (request) => new GroupRequestViewModel(request),
      );
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};

export const userRequestsGetters = {
  getRequestByName: ({ requests }) => (groupName) => {
    const options = requests.filter(
      (request) => request.groupName === groupName,
    );
    if (options.length !== 1) {
      return null;
    }
    return options[0];
  },
  getRequests: ({ requests }) => requests,
};
