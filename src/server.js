import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

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
  dataIdFromObject: object => {
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

export const client = new ApolloClient({
  uri: '/api/v4/graphql',
  cache,
  onError: errorHandler,
});

export const mutationClient = new ApolloClient({
  uri: '/api/v4/graphql',
  cache,
  onError: errorHandler,
});

export const apolloProvider = new VueApollo({
  clients: {
    default: client,
    mutationClient,
  },
  defaultClient: client,
  errorHandler,
});
