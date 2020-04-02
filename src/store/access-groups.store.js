import { AbbGroupViewModel } from '@/view_models/AccessGroupViewModel';
import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();

export default {
  namespaced: true,
  state: {
    list: [],
    next: null,
  },
  actions: {
    async fetchList({ commit }, options = {}) {
      try {
        const data = await accessGroupsService.getGroups(options);
        commit('setList', data.groups);
        commit('setNext', data.next);
        return data.groups;
      } catch (e) {
        throw new Error(e.message);
      }
    },
    async fetchNext({ commit, state }, options = {}) {
      try {
        const data = await accessGroupsService.getGroups({
          ...options,
          next: state.next,
        });
        commit('setNext', data.next);
        return data.groups.map((group) => new AbbGroupViewModel(group));
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  mutations: {
    setList(state, groups) {
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
    setNext(state, next) {
      try {
        state.next = next;
      } catch (e) {
        state.error = e.message;
        throw new Error(e.message);
      }
    },
  },
  getters: {
    getList: ({ list }) => list,
    getNext: ({ next }) => next,
  },
};
