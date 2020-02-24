import Features from '@/assets/js/features';
const features = new Features();

export default {
  namespaced: true,
  state: {},
  actions: {
    async fetch({ commit }) {
      try {
        const featureConfig = await features.get();
        commit('set', featureConfig);
        return featureConfig;
      } catch (e) {
        console.error(e);
        throw new Error(e.message);
      }
    },
  },
  mutations: {
    set(state, features) {
      for (let k in features) {
        if (!features.hasOwnProperty(k)) {
          continue;
        }
        state[k] = features[k];
      }
    },
  },
  getters: {
    get: state => feature => {
      if (feature in state) {
        return state[feature];
      }
      return false;
    },
  },
};
