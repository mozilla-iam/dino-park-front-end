import {
  GroupViewModel,
  MembershipModel,
} from '@/view_models/AccessGroupViewModel';
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
import {
  invitationEmailState,
  invitationEmailActions,
  invitationEmailMutations,
  invitationEmailGetters,
} from './invitation-email.store';

const accessGroupsService = new AccessGroups();

export default {
  namespaced: true,
  state: {
    ...accessGroupInvitationsState,
    ...accessGroupRequestsState,
    ...invitationEmailState,
    ...membersState,
    ...termsState,
    group: null,
    membership: null,
    memberCount: 0,
    invitationCount: 0,
    renewalCount: 0,
    requestCount: null,
    invitationConfig: null,
    loading: false,
    isCurator: false,
    isMember: false,
  },
  actions: {
    ...accessGroupInvitationsActions,
    ...accessGroupRequestsActions,
    ...invitationEmailActions,
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
        await accessGroupsService.updateGroupDetails(
          state.group.name,
          updateData,
        );
        return await dispatch('fetchGroup', state.group.name);
      } catch (e) {
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
          rootState.user.uuid.value,
        );
        await dispatch('fetchUser', null, { root: true });
        return await dispatch('fetchGroup', state.group.name);
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async deleteGroup({ state }) {
      try {
        return await accessGroupsService.deleteGroup(state.group.name);
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
    ...invitationEmailMutations,
    ...membersMutations,
    ...termsMutations,
    setGroup(state, accessGroup) {
      try {
        state.group = new GroupViewModel(accessGroup.group);
        state.membership = new MembershipModel(accessGroup.membership);
        state.memberCount = !accessGroup.member_count
          ? 0
          : accessGroup.member_count;
        state.invitationCount = !accessGroup.invitation_count
          ? 0
          : accessGroup.invitation_count;
        state.renewalCount = !accessGroup.renewal_count
          ? 0
          : accessGroup.renewal_count;
        state.requestCount = accessGroup.request_count;
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
    ...invitationEmailGetters,
    ...membersGetters,
    ...termsGetters,
    getGroup: ({ group }) => {
      console.log('access-group.store.js#getGroup() was called');
      return group;
    },
    getMembership: ({ membership }) => {
      console.log('access-group.store.js#getMembership() was called');
      return membership;
    },
    getGroupName: ({ group }) => {
      console.log('access-group.store.js#getGroupName() was called');
      return group.name;
    },
    getMemberCount: ({ memberCount }) => {
      console.log('access-group.store.js#getMemberCount() was called');
      return memberCount;
    },
    getInvitationCount: ({ invitationCount }) => {
      console.log('access-group.store.js#getInvitationCount() was called');
      return invitationCount;
    },
    getRenewalCount: ({ renewalCount }) => {
      console.log('access-group.store.js#getRenewalCount() was called');
      return renewalCount;
    },
    getRequestCount: ({ requestCount }) => {
      console.log('access-group.store.js#getRequestCount() was called');
      return requestCount;
    },
    getExpiration: ({ group }) => {
      console.log('access-group.store.js#getExpiration() was called');
      return group && group.expiration ? group.expiration : 0;
    },
    getInvitationConfig: ({ invitationConfig }) => {
      console.log('access-group.store.js#getInvitationConfig was called');
      return invitationConfig ? invitationConfig.content : null;
    },
    isCurator: ({ isCurator }) => {
      console.log('access-group.store.js#isCurator was called');
      return isCurator;
    },
    isMember: ({ isMember }) => {
      console.log('access-group.store.js#isMember was called');
      return isMember;
    },
  },
};
