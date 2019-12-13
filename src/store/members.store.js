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
      const { members } = await accessGroupsService.getAllMembersV2(groupName);
      commit('setMembers', members);
      return members;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeMember({ commit, state }, member) {
    const groupName = state.group.name;
    try {
      const result = await accessGroupsService.deleteMember(
        groupName,
        member.uuid
      );
      const { members } = await accessGroupsService.getAllMembersV2(groupName);
      commit('setMembers', members);
      return members;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async addMembers({ commit, state }, addableMembers) {
    try {
      const result = await accessGroupsService.addAccessGroupMembers(
        state.group.name,
        addableMembers
      );
      const { members } = await accessGroupsService.getAllMembersV2(
        state.group.name
      );
      commit('setMembers', members);
      return members;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async addCurators({ commit, state }, curators) {
    try {
      const result = await accessGroupsService.addAccessGroupCurators(
        state.group.name,
        curators
      );
      const { members } = await accessGroupsService.getAllMembersV2(
        state.group.name
      );
      commit('setMembers', members);
      return members;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeCurators({ commit, state }, curators) {
    try {
      const result = await accessGroupsService.removeAccessGroupCurators(
        state.group.name,
        curators
      );
      const { members } = await accessGroupsService.getAllMembersV2(
        state.group.name
      );
      commit('setMembers', members);
      return members;
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
  getMembers: state => {
    return state.members;
  },
};
