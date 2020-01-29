import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import {
  ACCESS_GROUP_TOS_PAGE,
  ACCESS_GROUP_EDIT_PAGE,
  ACCESS_GROUP_CREATE_PAGE,
  ACCESS_GROUP_PAGE,
  constructRouter,
} from './router';
import { ACCESS_GROUP_TYPES } from '@/view_models/AccessGroupViewModel.js';

import { apolloProvider } from './server';
import store from '@/store';
import Features from '@/features.js';
import Fluent from './assets/js/fluent';

async function resolvePromisesSerially(promises, resolvers) {
  try {
    for (let i = 0, len = promises.length; i < len; i += 1) {
      resolvers[i](await promises[i]());
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

// polyfill/fallback adapted from MDN (https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API#Falling_back_to_setTimeout)
window.requestIdleCallback =
  window.requestIdleCallback ||
  (handler => {
    const startTime = Date.now();

    return setTimeout(() => {
      handler({
        didTimeout: false,
        timeRemaining() {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        },
      });
    }, 1);
  });

Vue.use(VueApollo);

// eslint-disable-next-line
Promise.all([store.dispatch('fetchUser'), Fluent.init()]).then(([, fluent]) => {
  const router = constructRouter(fluent);

  router.beforeEach((to, from, next) => {
    const promises = [];
    const resolvers = [];

    // Don't try to load data
    if (
      // cond: if you're on the create page
      to.name === ACCESS_GROUP_CREATE_PAGE ||
      // cond: if you're just changing tabs on the edit page
      (to.name === ACCESS_GROUP_EDIT_PAGE &&
        from.name === ACCESS_GROUP_EDIT_PAGE &&
        to.query.section &&
        from.query.section &&
        to.query.section !== from.query.section) ||
      // cond: if you're going from the edit page to the view page
      (to.name === ACCESS_GROUP_PAGE && from.name === ACCESS_GROUP_EDIT_PAGE) ||
      // cond: if you're going from the view page to the edit page
      (to.name === ACCESS_GROUP_EDIT_PAGE && from.name === ACCESS_GROUP_PAGE)
    ) {
      next();
      return;
    }

    if (to.meta.key === 'access-group') {
      // eslint-disable-next-line
      promises.push(() =>
        store.dispatch('accessGroup/fetchGroup', to.params.groupname)
      );
      resolvers.push(data => {});
      if (to.name !== ACCESS_GROUP_TOS_PAGE) {
        promises.push(() =>
          store.dispatch('accessGroup/fetchMembers', to.params.groupname)
        );

        resolvers.push(data => {});
      }
      if (
        to.name === ACCESS_GROUP_TOS_PAGE ||
        to.name === ACCESS_GROUP_EDIT_PAGE
      ) {
        promises.push(() => store.dispatch('accessGroup/fetchTerms'));
        resolvers.push(data => {
          console.log('Fetched terms: ', data);
        });
      }
      if (to.name === ACCESS_GROUP_EDIT_PAGE) {
        promises.push(() => store.dispatch('accessGroup/fetchInvitations'));
        resolvers.push(data => {});
      }
    }

    resolvePromisesSerially(promises, resolvers)
      .then(() => {
        next();
      })
      .catch(e => {
        console.error('Caught dispatch error: ', e);
        next(`/error?message=${e}`);
      });
  });

  Vue.mixin({
    computed: {
      scope() {
        return this.$store.state.scope;
      },
      groupTypes() {
        return ACCESS_GROUP_TYPES.filter(type => type !== 'Open');
      },
    },
    methods: {
      getFeature(featureName) {
        return Features.get(featureName);
      },
      fluent(...args) {
        return fluent.get(...args);
      },
    },
  });
  new Vue({
    router,
    apolloProvider,
    render: h => h(App),
    store,
  }).$mount('#app');
});

// TODO: After using these for testing, replace the old actions with these
store.dispatch('userV2/fetchProfile').then(function() {
  store.dispatch('userV2/fetchInvitations').then(function() {});
});
