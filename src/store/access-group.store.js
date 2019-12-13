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
    getGroup: state => {
      return state.data;
    },
  },
};
