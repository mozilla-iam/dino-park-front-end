import Vue from 'vue';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';
import AsyncComputed from 'vue-async-computed';
import App from './App.vue';
import router from './router';
import store from './store';

const client = new ApolloClient({
  uri: '/api/v3/graphql/',
});

const apolloProvider = new VueApollo({
  defaultClient: client,
  errorHandler(error) {
    const { networkError } = error;
    if (networkError && networkError.statusCode === 302) {
      console.log('Got 302 → relaoding…');
      window.location.reload();
    }
  },
});

Vue.use(VueApollo);
Vue.use(AsyncComputed);

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: h => h(App),
}).$mount('#app');
