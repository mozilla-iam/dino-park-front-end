import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    previewUserId: null,
  },
  mutations: {
    updatePreviewProfileId(state, update) {
        state.previewUserId = update.newId;
    },
  },
  actions: {

  },
});