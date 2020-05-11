import { DisplayMemberViewModel } from '@/view_models/AccessGroupViewModel.js';
import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();
export const membersState = {
  members: null,
  curators: null,
  next: null,
};
export const membersActions = {
  async fetchAllCurators({ commit }, groupName) {
    try {
      let cont = 0;
      const allMembers = [];
      while (cont !== null) {
        // eslint-disable-next-line no-await-in-loop
        const {
          members,
          next,
        } = await accessGroupsService.getMembersFromOptions(groupName, {
          role: 'curators',
          numResults: 100,
          next: cont,
        });
        allMembers.push(...members);
        cont = next;
      }
      commit('setCurators', allMembers);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async fetchMembers({ commit }, groupName) {
    try {
      // Change this later
      const { members, next } = await accessGroupsService.getInitialMembers(
        groupName,
      );
      commit('setMembers', members);
      commit('setMembersNext', next);
      return members;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async fetchMembersWithOptions({ commit }, { groupName, options }) {
    try {
      const { members, next } = await accessGroupsService.getMembersFromOptions(
        groupName,
        options,
      );
      commit('setMembers', members);
      commit('setMembersNext', next);
      return members;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async fetchMembersWithOptionsNext({ commit, state }, { groupName, options }) {
    try {
      const { members, next } = await accessGroupsService.getMembersFromOptions(
        groupName,
        {
          ...options,
          next: state.next,
        },
      );
      commit('setMembersNext', next);
      return members.map((member) => new DisplayMemberViewModel(member));
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeMember({ state, dispatch }, member) {
    const groupName = state.group.name;
    try {
      const result = await accessGroupsService.deleteMember(
        groupName,
        member.uuid,
      );
      await Promise.all([
        dispatch('fetchMembers', state.group.name),
        dispatch('fetchAllCurators', state.group.name),
      ]);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async renewMember({ state, dispatch }, { memberUuid, expiration }) {
    try {
      const result = await accessGroupsService.renewMember(
        state.group.name,
        memberUuid,
        expiration,
      );
      await dispatch('fetchMembers', state.group.name);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async addCurators({ state, dispatch }, curators) {
    try {
      const result = await accessGroupsService.addCurators(
        state.group.name,
        curators,
      );
      await Promise.all([
        dispatch('fetchMembers', state.group.name),
        dispatch('fetchAllCurators', state.group.name),
      ]);
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async removeCurators({ state, dispatch }, { curators, expiration }) {
    try {
      const result = await accessGroupsService.removeCurators(
        state.group.name,
        curators,
        expiration,
      );
      await Promise.all([
        dispatch('fetchMembers', state.group.name),
        dispatch('fetchAllCurators', state.group.name),
      ]);
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
  setMembersNext(state, nextVal) {
    try {
      state.next = nextVal;
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};
export const membersGetters = {
  getMembers: ({ members }) => members,
  getCurators: ({ curators }) => curators,
  getMembersNext: ({ next }) => next,
};
