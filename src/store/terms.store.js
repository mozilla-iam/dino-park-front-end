import AccessGroups from '@/assets/js/access-groups';

const accessGroupsService = new AccessGroups();

export const termsState = {
  terms: '',
};
export const termsActions = {
  async fetchTerms({ state, commit }) {
    try {
      const content = await accessGroupsService.getAccessGroupTOS(
        state.group.name
      );
      commit('setTerms', content);
      return content;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async updateTerms({ dispatch, state }, text) {
    try {
      const result = await accessGroupsService.updateAccessGroupTOS(
        state.group.name,
        text
      );
      await dispatch('fetchTerms');
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async addTerms({ dispatch, state }, text) {
    try {
      const result = await accessGroupsService.addAccessGroupTOS(
        state.group.name,
        text
      );
      await dispatch('fetchTerms');
      await dispatch('accessGroup/fetchGroup', state.group.name, {
        root: true,
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async deleteTerms({ dispatch, state }) {
    try {
      const result = await accessGroupsService.deleteAccessGroupTOS(
        state.group.name
      );
      await dispatch('fetchTerms');
      await dispatch('accessGroup/fetchGroup', state.group.name, {
        root: true,
      });
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
export const termsMutations = {
  setTerms(state, content) {
    try {
      state.terms = !content ? '' : content;
    } catch (e) {
      state.error = e.message;
      throw new Error(e.message);
    }
  },
};
export const termsGetters = {
  getTerms: state => {
    return state.terms;
  },
};
