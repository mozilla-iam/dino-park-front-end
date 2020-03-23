import { AbbGroupViewModel } from '@/view_models/AccessGroupViewModel';
import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();

export default {
  namespaced: true,
  state: {
    list: [],
  },
  actions: {
    async fetch({ commit }, options = {}) {
      try {
        const data = await accessGroupsService.getGroups(options);
        commit('set', data);
        return data;
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  mutations: {
    set(state, { groups }) {
      if (!groups) {
        throw new Error('Invalid groups response');
      }
      try {
        state.list = groups.map((group) => new AbbGroupViewModel(group));
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
  },
  getters: {
    list: ({ list }) => {
      console.log('found list: ', list);
      return list;
    },
  },
};
