import { GroupViewModel } from '@/view_models/AccessGroupViewModel';
import AccessGroups from '@/assets/js/access-groups';
import {
  accessGroupInvitationsState,
  accessGroupInvitationsActions,
  accessGroupInvitationsMutations,
  accessGroupInvitationsGetters,
} from './access-group-invitations.store';
import {
  accessGroupRequestsState,
  accessGroupRequestsActions,
  accessGroupRequestsMutations,
  accessGroupRequestsGetters,
} from './access-group-requests.store';
import {
  membersState,
  membersActions,
  membersMutations,
  membersGetters,
} from './members.store';
import {
  termsState,
  termsActions,
  termsMutations,
  termsGetters,
} from './terms.store';

const accessGroupsService = new AccessGroups();

export default {
  namespaced: true,
  state: {
    ...accessGroupInvitationsState,
    ...accessGroupRequestsState,
    ...membersState,
    ...termsState,
    group: null,
    memberCount: 0,
    invitationCount: 0,
    renewalCount: 0,
    invitationConfig: null,
    loading: false,
    isCurator: false,
    isMember: false,
  },
  actions: {
    ...accessGroupInvitationsActions,
    ...accessGroupRequestsActions,
    ...membersActions,
    ...termsActions,
    async fetchGroup({ commit }, groupName) {
      try {
        const data = await accessGroupsService.getGroup(groupName);
        commit('setGroup', data);
        return data;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async updateGroup({ dispatch, state }, { field, value }) {
      try {
        const updateData = {
          ...state.group,
          [field]: value,
        };
        const result = await accessGroupsService.updateGroupDetails(
          state.group.name,
          updateData
        );
        return await dispatch('fetchGroup', state.group.name);
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async updateInviteText({ state, dispatch }, text) {
      try {
        const data = await accessGroupsService.updateInviteText(text);
        return await dispatch('fetchGroup', state.group.name);
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
    async resendInvitation({ state }, invitation) {
      try {
        return await accessGroupsService.resendInvitation(invitation);
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
    async leaveGroup({ state, rootState, dispatch }) {
      try {
        await accessGroupsService.leaveGroup(
          state.group.name,
          rootState.user.uuid.value
        );
        return await dispatch('fetchGroup', state.group.name);
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async closeGroup({ state }) {
      try {
        return await accessGroupsService.closeGroup(state.group.name);
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async createGroup(context, form) {
      try {
        return await accessGroupsService.createGroup(form);
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  mutations: {
    ...accessGroupInvitationsMutations,
    ...accessGroupRequestsMutations,
    ...membersMutations,
    ...termsMutations,
    setGroup(state, accessGroup) {
      try {
        state.group = new GroupViewModel(accessGroup.group);
        state.memberCount = !accessGroup.member_count
          ? 0
          : accessGroup.member_count;
        state.invitationCount = !accessGroup.invitation_count
          ? 0
          : accessGroup.invitation_count;
        state.renewalCount = !accessGroup.renewal_count
          ? 0
          : accessGroup.renewal_count;
        state.invitationConfig = accessGroup.invitation;
        state.isCurator = Boolean(accessGroup.curator);
        state.isMember = Boolean(accessGroup.member);
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
  },
  getters: {
    ...accessGroupInvitationsGetters,
    ...accessGroupRequestsGetters,
    ...membersGetters,
    ...termsGetters,
    getGroup: ({ group }) => group,
    getGroupName: ({ group }) => group.name,
    getMemberCount: ({ memberCount }) => memberCount,
    getInvitationCount: ({ invitationCount }) => invitationCount,
    getRenewalCount: ({ renewalCount }) => renewalCount,
    getExpiration: ({ group }) =>
      group && group.expiration ? group.expiration : 0,
    getInvitationConfig: ({ invitationConfig }) =>
      invitationConfig ? invitationConfig.content : null,
    isCurator: ({ isCurator }) => isCurator,
    isMember: ({ isMember }) => isMember,
  },
};
