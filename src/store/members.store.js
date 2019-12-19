import { DisplayMemberViewModel } from '@/view_models/AccessGroupViewModel.js';
import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();
export const membersState = {
  members: null,
};
export const membersActions = {
  async fetchMembers({ commit }, groupName) {
    try {
      // Change this later
      const { members } = await accessGroupsService.getAllMembers(groupName);
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
      return await dispatch('fetchMembers');
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async addMembers({ state, dispatch }, { invites, expiration }) {
    try {
      const result = await accessGroupsService.addMembers(
        state.group.name,
        invites,
        expiration
      );
      return await dispatch('fetchMembers');
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
      return await dispatch('fetchMembers');
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
      return await dispatch('fetchMembers');
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeCurators({ state, dispatch }, curators) {
    try {
      const result = await accessGroupsService.removeCurators(
        state.group.name,
        curators
      );
      return await dispatch('fetchMembers');
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
export const membersMutations = {
  setMembers(state, memberData) {
    try {
      state.members = [];
      for (let aMember of memberData) {
        state.members.push(new DisplayMemberViewModel(aMember));
      }
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};
export const membersGetters = {
  getMembers: ({ members }) => members,
  getCurators: ({ members }) => members.filter(member => member.isCurator()),
  isCurator: ({ members }) => uuid =>
    members.filter(member => member.uuid === uuid && member.isCurator())
      .length > 0,
  isAdmin: ({ members }) => uuid =>
    members.filter(member => member.uuid === uuid && member.isAdmin()).length >
    0,
};
