import { DisplayMemberViewModel } from '@/view_models/AccessGroupViewModel.js';
import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();
export const membersState = {
  members: null,
  curators: null,
};
export const membersActions = {
  async fetchMembers({ commit }, groupName) {
    try {
      // Change this later
      const { members } = await accessGroupsService.getInitialMembers(
        groupName
      );
      commit('setMembers', members);
      commit('setCurators', members);
      return members;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async fetchMembersWithOptions({ commit }, { groupName, options }) {
    try {
      const { members } = await accessGroupsService.getMembersFromOptions(
        groupName,
        options
      );
      commit('setMembers', members);
      return members;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeMember({ state, dispatch }, member) {
    const groupName = state.group.name;
    try {
      const result = await accessGroupsService.deleteMember(
        groupName,
        member.uuid
      );
      return await dispatch('fetchMembers', groupName);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async renewMember({ state, dispatch }, { memberUuid, expiration }) {
    try {
      const result = await accessGroupsService.renewMember(
        state.group.name,
        memberUuid,
        expiration
      );
      return await dispatch('fetchMembers', state.group.name);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async addCurators({ state, dispatch }, curators) {
    try {
      const result = await accessGroupsService.addCurators(
        state.group.name,
        curators
      );
      return await dispatch('fetchMembers', state.group.name);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeCurators({ state, dispatch }, { curators, expiration }) {
    try {
      const result = await accessGroupsService.removeCurators(
        state.group.name,
        curators,
        expiration
      );
      return await dispatch('fetchMembers', state.group.name);
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
export const membersMutations = {
  setMembers(state, memberData) {
    try {
      state.members = [];
      for (const aMember of memberData) {
        state.members.push(new DisplayMemberViewModel(aMember));
      }
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
  setCurators(state, memberData) {
    try {
      state.curators = [];
      for (const aMember of memberData) {
        const member = new DisplayMemberViewModel(aMember);
        if (member.isCurator()) {
          state.curators.push(member);
        }
      }
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};
export const membersGetters = {
  getMembers: ({ members }) => members,
  getCurators: ({ curators }) => curators,
  isCurator: ({ curators }) => uuid =>
    curators.filter(curator => curator.uuid === uuid).length > 0,
  isMember: ({ members }) => uuid =>
    members.filter(member => member.uuid === uuid).length > 0,
};
