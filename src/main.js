import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router, {
  ACCESS_GROUP_TOS_PAGE,
  ACCESS_GROUP_EDIT_PAGE,
} from './router';

import { apolloProvider } from './server';
import store from './store';

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

router.beforeEach((to, from, next) => {
  const promises = [];
  const resolvers = [];
  if (to.meta.key === 'access-group') {
    // eslint-disable-next-line
    promises.push(() =>
      store.dispatch('fetchAccessGroup', to.params.groupname)
    );
    resolvers.push(data => {
      console.log('Fetched group: ', data);
    });
  }
  if (to.meta.key === 'access-group' && to.name !== ACCESS_GROUP_TOS_PAGE) {
    // eslint-disable-next-line
    promises.push(() =>
      store.dispatch('fetchAllAccessGroupMembers', to.params.groupname)
    );

    resolvers.push(data => {
      console.log('Fetched group members: ', data);
    });
  }
  if (to.name === ACCESS_GROUP_TOS_PAGE || to.name === ACCESS_GROUP_EDIT_PAGE) {
    promises.push(() => store.dispatch('fetchAccessGroupTOS'));
    resolvers.push(data => {
      console.log('Fetched terms: ', data);
    });
  }
  if (to.name === ACCESS_GROUP_EDIT_PAGE) {
    promises.push(() => store.dispatch('fetchAccessGroupInvitations'));
    resolvers.push(data => {
      console.log('Fetched invitations: ', data);
    });
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
