import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import Vuex from 'vuex';
import AsyncComputed from 'vue-async-computed';
import App from './App.vue';
import router from './router';
import { USER_MENU_PROFILE } from './queries/profile';

// polyfill/fallback adapted from MDN (https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API#Falling_back_to_setTimeout)
window.requestIdleCallback =
  window.requestIdleCallback ||
  ((handler) => {
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

function errorHandler(error) {
  const failoverOn = [302];
  const { networkError } = error;
  if (
    networkError &&
    ((networkError instanceof TypeError &&
      networkError.message.startsWith('NetworkError')) ||
      failoverOn.includes(networkError.statusCode))
  ) {
    window.location.reload();
  }
}

const cache = new InMemoryCache({
  dataIdFromObject: (object) => {
    // eslint-disable-next-line no-underscore-dangle
    switch (object.__typename) {
      case 'Profile':
        return object.uuid.value;
      default:
        // TODO: do we neet to pass here?
        return defaultDataIdFromObject(object);
    }
  },
});

const client = new ApolloClient({
  uri: '/api/v4/graphql',
  cache,
  onError: errorHandler,
});

const mutationClient = new ApolloClient({
  uri: '/api/v4/graphql',
  cache,
  onError: errorHandler,
});

const apolloProvider = new VueApollo({
  clients: {
    default: client,
    mutationClient,
  },
  defaultClient: client,
  errorHandler,
});

Vue.use(VueApollo);
Vue.use(AsyncComputed);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    org: null,
    personViewPreference: 'grid',
  },
  actions: {
    async fetchUser({ commit }) {
      const { data } = await client.query({ query: USER_MENU_PROFILE });
      commit('setUser', data.profile);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setOrg(state, org) {
      state.org = org;
    },
    setPersonViewPreference(state, preference) {
      state.personViewPreference = preference;
    },
  },
});

store.dispatch('fetchUser').then(() => {
  new Vue({
    router,
    apolloProvider,
    render: (h) => h(App),
    store,
  }).$mount('#app');
});
