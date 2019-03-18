import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import Vuex from 'vuex';
import AsyncComputed from 'vue-async-computed';
import App from './App.vue';
import router from './router';
import { USER_MENU_PROFILE } from './queries/profile';

const client = new ApolloClient({
  uri: '/api/v4/graphql',
});

const mutationClient = new ApolloClient({
  uri: '/api/v4/graphql',
});

const apolloProvider = new VueApollo({
  clients: {
    default: client,
    mutationClient,
  },
  defaultClient: client,
  errorHandler(error) {
    const { networkError } = error;
    if (
      networkError instanceof TypeError &&
      networkError.message.startsWith('NetworkError')
    ) {
      window.location.reload();
    }
  },
});

Vue.use(VueApollo);
Vue.use(AsyncComputed);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
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
  },
});

store.dispatch('fetchUser');

new Vue({
  router,
  provide: apolloProvider.provide(),
  render: (h) => h(App),
  store,
}).$mount('#app');
