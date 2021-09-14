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
      /*
      The other places these groups are handled.
      https://github.com/mozilla-iam/dino-park-packs/pull/20
      https://github.com/mozilla-iam/dino-park-gate/pull/3
      */
      const options = {
        isStaff,
        isNdaed:
          'nda' in (mozilliansorgGroups || {}) ||
          'ghe_group_curators' in (mozilliansorgGroups || {}) ||
          'contingentworkernda' in (mozilliansorgGroups || {}),
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
      if (state.isStaff) {
        return 'Staff';
      }
      if (state.isNdaed) {
        return 'Ndaed';
      }
      if (state.isLdap) {
        return 'Authenticated';
      }
      return 'Public';
    },
    isStaff: ({ isStaff }) => isStaff,
    isNdaed: ({ isNdaed }) => isNdaed,
    isLdap: ({ isLdap }) => isLdap,
  },
};
