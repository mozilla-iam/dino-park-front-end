import { GroupInvitationViewModel } from '@/view_models/AccessGroupViewModel.js';
import invitationGroupData from './invitationgroupdata.json';

export default {
  namespaced: true,
  state: {
    data: null,
  },
  actions: {
    async fetch({ commit }) {
      const data = invitationGroupData;
      try {
        commit('set', data.invitations);
      } catch (e) {
        throw new Error(e.message);
      }
      return data;
    },
  },
  mutations: {
    set(state, invitations) {
      try {
        state.data = invitations.map(
          invite => new GroupInvitationViewModel(invite)
        );
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
  },
  getters: {
    get: state => {
      return state.data;
    },
  },
};
