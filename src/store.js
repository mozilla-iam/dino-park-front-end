import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profilePreview: {
      userId: null,
      lastTrigger: null,
    }
  },
  mutations: {
    updatePreviewProfileId(state, update) {
      state.profilePreview.userId = update.newId; // eslint-disable-line no-param-reassign
      state.profilePreview.lastTrigger = update.trigger; // eslint-disable-line no-param-reassign
    },
  },
  actions: {

  },
});
