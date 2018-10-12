import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profilePreview: {
      desktopView: false,
    },
  },
  mutations: {
    toggleProfilePreviewDesktopView(state, update) {
      state.profilePreview.desktopView = update.desktopView; // eslint-disable-line no-param-reassign
    },
  },
  actions: {

  },
});
