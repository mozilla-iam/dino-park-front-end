import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { mapGetters } from 'vuex';

import store from '@/store';
import { ACCESS_GROUP_TYPES } from '@/view_models/AccessGroupViewModel';
import App from './App.vue';
import DPRouter from './router';
import Fluent from './assets/js/fluent';
import { apolloProvider } from './server';

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

store.dispatch('setLoading');
// eslint-disable-next-line

Promise.all([
  store.dispatch('features/fetch'),
  store.dispatch('fetchUser'),
  Fluent.init(),
]).then(async ([features, , fluent]) => {
  let router = new DPRouter(features, fluent);
  if (features.accessGroupsToggle) {
    await router.runFetches(store);
  } else {
    store.dispatch('completeLoading');
  }

  Vue.mixin({
    computed: {
      ...mapGetters({
        getFeature: 'features/get',
      }),
      scope() {
        return this.$store.state.scope;
      },
      groupTypes() {
        return ACCESS_GROUP_TYPES.filter(type => type !== 'Open');
      },
    },
    methods: {
      fluent(...args) {
        return fluent.get(...args);
      },
    },
  });
  new Vue({
    router: router.vueRouter,
    apolloProvider,
    render: h => h(App),
    store,
  }).$mount('#app');
});
