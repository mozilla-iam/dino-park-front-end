export default {
  namespaced: true,
  state: {
    isStaff: false,
    isNdaed: false,
    isLdap: false,
  },
  actions: {
    set({ commit }, user) {
      const {
        staffInformation: { staff: { value: isStaff = false } = {} } = {},
        accessInformation: {
          mozilliansorg: { values: mozilliansorgGroups = {} } = {},
          ldap: { values: ldapGroups = {} } = {},
        } = {},
      } = user || {};
      const options = {
        isStaff,
        isNdaed: 'nda' in (mozilliansorgGroups || {}),
        isLdap: Boolean(ldapGroups),
      };
      commit('set', options);
    },
  },
  mutations: {
    set(state, options) {
      state.isStaff = options.isStaff;
      state.isNdaed = options.isNdaed;
      state.isLdap = options.isLdap;
    },
  },
  getters: {
    get(state) {
      return {
        ...state,
      };
    },
  },
};
