import Vuex from 'vuex';
import Vue from 'vue';
import { DISPLAY_PROFILE } from './queries/profile';
import Scope from './assets/js/scope';
import { client } from './server';
import accessGroupData from './accessgroupdata.json';
import invitationGroupData from './invitationgroupdata.json';
import accessGroupTermsOfService from './accessgrouptermsofservice.json';
import {
  AccessGroupDetailsViewModel,
  GroupInvitationViewModel,
  INVITATION_STATE,
} from './view_models/AccessGroupViewModel';
import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: null,
    scope: new Scope(),
    accessGroup: null,
    groupInvitations: [],
    org: null,
    personViewPreference: 'list',
    error: false,
  },
  actions: {
    async fetchUser({ commit }) {
      const { data } = await client.query({
        query: DISPLAY_PROFILE,
        variables: { username: null },
      });
      commit('setUser', data.profile);
    },
    async fetchAccessGroup({ commit }) {
      const data = accessGroupData;
      console.log('found acess data: ', data);
      try {
        commit('setAccessGroupData', data);
      } catch (e) {
        throw new Error(e.message);
      }
      return data;
    },
    // TODO: Eventually will want to put this under a list of global fetches
    async fetchGroupInvitations({ commit }) {
      const data = invitationGroupData;
      try {
        commit('setInvitationData', data.invitations);
      } catch (e) {
        throw new Error(e.message);
      }
      return data;
    },
    async fetchAccessGroupTOS({ commit }) {
      const { content } = accessGroupTermsOfService;
      try {
        commit('setAccessGroupTOS', content);
      } catch (e) {
        throw new Error(e.message);
      }
      return content;
    },
    async acceptGroupInvitation({ commit, state }, idx) {
      if (idx >= state.groupInvitations.length) {
        state.error = `Index out of bounds for groupInvitations: ${idx}`;
        throw new Error(state.error);
      }
      const currentInvitation = state.groupInvitations[idx];
      try {
        const result = await accessGroupsService.acceptInvitation(
          currentInvitation.group_name
        );
        commit('acceptGroupInvitation', idx);
        return result;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async rejectGroupInvitation({ commit, state }, idx) {
      if (idx >= state.groupInvitations.length) {
        state.error = `Index out of bounds for groupInvitations: ${idx}`;
        throw new Error(state.error);
      }
      const currentInvitation = state.groupInvitations[idx];
      try {
        const result = await accessGroupsService.rejectInvitation(
          currentInvitation.group_name
        );
        commit('rejectGroupInvitation', idx);
        return result;
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.scope.update(user);
    },
    setOrg(state, org) {
      state.org = org;
    },
    setPersonViewPreference(state, preference) {
      state.personViewPreference = preference;
    },
    setAccessGroupData(state, accessGroup) {
      try {
        state.accessGroup = new AccessGroupDetailsViewModel(accessGroup);
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
    setInvitationData(state, invitations) {
      try {
        state.groupInvitations = invitations.map(
          invite => new GroupInvitationViewModel(invite)
        );
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
    acceptGroupInvitation(state, idx) {
      if (idx >= state.groupInvitations.length) {
        state.error = `Index out of bounds for groupInvitations: ${idx}`;
        throw new Error(state.error);
      }
      state.groupInvitations[idx].state = INVITATION_STATE.ACCEPTED;
    },
    rejectGroupInvitation(state, idx) {
      if (idx >= state.groupInvitations.length) {
        state.error = `Index out of bounds for groupInvitations: ${idx}`;
        throw new Error(state.error);
      }
      state.groupInvitations[idx].state = INVITATION_STATE.REJECTED;
    },
    setAccessGroupTOS(state, content) {
      state.groupTOS = content;
    },
  },
  getters: {
    getActiveInvitations: state => {
      return state.groupInvitations.filter(invitation => {
        return (
          invitation.state !== INVITATION_STATE.ACCEPTED &&
          invitation.state !== INVITATION_STATE.REJECTED
        );
      });
    },
  },
});
