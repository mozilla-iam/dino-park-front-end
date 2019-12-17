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
  async updateTerms({ commit, state }, text) {
    try {
      const result = await accessGroupsService.updateAccessGroupTOS(
        state.group.name,
        text
      );
      commit('setTerms', text);
      return result;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  async deleteTerms({ commit, state }) {
    try {
      const result = await accessGroupsService.deleteAccessGroupTOS(
        state.group.name
      );
      commit('deleteTerms', state.group.name);
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
  deleteTerms(state) {
    try {
      state.terms = '';
      // TODO: Might want to put this up in the action and just re-get the terms
      state.group.terms = false;
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
