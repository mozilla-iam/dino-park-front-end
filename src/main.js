import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router, { ACCESS_GROUP_PAGES, ACCESS_GROUP_TOS_PAGE } from './router';

import { apolloProvider } from './server';
import store from './store';

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

Vue.mixin({
  computed: {
    scope() {
      return this.$store.state.scope;
    },
  });
  new Vue({
    router,
    apolloProvider,
    render: h => h(App),
    store,
  }).$mount('#app');
});

// eslint-disable-next-line
store.dispatch('fetchGroupInvitations').then(function(data) {
  console.log('Found invitations: ', data);
});

router.beforeEach((to, from, next) => {
  if (ACCESS_GROUP_PAGES.includes(to.name)) {
    // eslint-disable-next-line
    store
      .dispatch('fetchAccessGroup')
      .then(data => {
        console.log('Fetched group: ', data);
      })
      .catch(error => {
        console.error('Caught dispatch error: ', error);
        next(`/error?message=${error}`);
      });
  }
  if (to.name === ACCESS_GROUP_TOS_PAGE) {
    store
      .dispatch('fetchAccessGroupTOS')
      .then(data => {
        console.log('Fetched terms: ', data);
      })
      .catch(error => {
        console.error('Caught dispatch error: ', error);
        next(`/error?message=${error}`);
      });
  }
  next();
});
