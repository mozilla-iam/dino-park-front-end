import { GroupViewModel } from '@/view_models/AccessGroupViewModel.js';
import AccessGroups from '@/assets/js/access-groups';
import {
  accessGroupInvitationsState,
  accessGroupInvitationsActions,
  accessGroupInvitationsMutations,
  accessGroupInvitationsGetters,
} from './access-group-invitations.store';
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
    ...membersState,
    ...termsState,
    group: null,
    memberCount: 0,
    invitationCount: 0,
    renewalCount: 0,
    expiration: null,
    invitationConfig: null,
  },
  actions: {
    ...accessGroupInvitationsActions,
    ...membersActions,
    ...termsActions,
    async fetchGroup({ commit }, groupName) {
      try {
        const data = await accessGroupsService.getAccessGroup(groupName);
        commit('setGroup', data);
        return data;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async updateGroup({ dispatch, state }, { field, value }) {
      try {
        const result = await accessGroupsService.updateAccessGroupDetails(
          name,
          field,
          value
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
    async leaveGroup({ state }) {
      try {
        return await accessGroupsService.leaveGroup(state.group.name);
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async closeGroup({ state }) {
      try {
        return await accessGroupsService.closeAccessGroup(state.group.name);
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async createGroup(context, form) {
      try {
        return await accessGroupsService.createAccessGroup(form);
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  mutations: {
    ...accessGroupInvitationsMutations,
    ...membersMutations,
    ...termsMutations,
    setGroup(state, accessGroup) {
      try {
        state.group = new GroupViewModel(accessGroup.group);
        state.memberCount = accessGroup.member_count;
        state.invitationCount = accessGroup.invitation_count;
        state.renewalCount = accessGroup.renewal_count;
        state.expiration = accessGroup.expiration;
        state.invitationConfig = accessGroup.invitation;
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
  },
  getters: {
    ...accessGroupInvitationsGetters,
    ...membersGetters,
    ...termsGetters,
    getGroup: ({ group }) => group,
    getMemberCount: ({ memberCount }) => memberCount,
    getInvitationCount: ({ invitationCount }) => invitationCount,
    getRenewalCount: ({ renewalCount }) => renewalCount,
    getExpiration: ({ expiration }) => expiration,
    getInvitationConfig: ({ invitationConfig }) =>
      invitationConfig ? invitationConfig.content : null,
  },
};
