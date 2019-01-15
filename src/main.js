import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import AsyncComputed from 'vue-async-computed';
import App from './App.vue';
import router from './router';

const client = new ApolloClient({
  uri: '/api/v3/graphql/',
});

const mutationClient = new ApolloClient({
  uri: '/api/v3/graphqlMut',
});

const apolloProvider = new VueApollo({
  clients: {
    default: client,
    mutationClient,
  },
  defaultClient: client,
  errorHandler(error) {
    const { networkError } = error;
    if (networkError instanceof TypeError && networkError.message.startsWith('NetworkError')) {
      window.location.reload();
    }
  },
});

Vue.use(VueApollo);
Vue.use(AsyncComputed);

new Vue({
  router,
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');
