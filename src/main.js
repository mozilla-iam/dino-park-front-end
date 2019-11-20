import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
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
  },
});
// eslint-disable-next-line
store.dispatch('fetchUser').then(function() {
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
