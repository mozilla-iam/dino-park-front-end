/* eslint-disable max-classes-per-file */
import Fetcher from '@/assets/js/fetcher';
import apiConfig from './access-groups-api.config';

const API_PREFIX = '/groups/api/v1/';
const getEndpoint = (endpoint, groupName) => `${endpoint}/${groupName}`;
export class Api {
  constructor() {
    this.fetcher = new Fetcher({ failoverOn: [302] });
  }

  async handleGet(endpointGetter, endpointArguments) {
    try {
      const endpoint =
        endpointGetter === true
          ? getEndpoint(...endpointArguments)
          : endpointGetter(...endpointArguments);

      return await this.fetcher.fetch(endpoint);
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async handleDelete(endpointGetter, endpointArguments) {
    try {
      const endpoint =
        endpointGetter === true
          ? getEndpoint(...endpointArguments)
          : endpointGetter(...endpointArguments);
      return await this.fetcher.delete(endpoint);
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async handlePost(
    endpointGetter,
    endpointArguments,
    postDataGetter,
    dataArguments,
  ) {
    try {
      const endpoint =
        endpointGetter === true
          ? getEndpoint(...endpointArguments)
          : endpointGetter(...endpointArguments);
      if (typeof postDataGetter === 'function') {
        return await this.fetcher.post(endpoint, postDataGetter(dataArguments));
      }
      return await this.fetcher.post(endpoint);
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async handlePut(
    endpointGetter,
    endpointArguments,
    putDataGetter,
    dataArguments,
  ) {
    try {
      const endpoint =
        endpointGetter === true
          ? getEndpoint(...endpointArguments)
          : endpointGetter(...endpointArguments);
      return await this.fetcher.put(endpoint, putDataGetter(dataArguments));
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async execute({ path, endpointArguments = [], dataArguments = {} }) {
    try {
      let [scope, restMethod] = path.split('/');
      if (!(restMethod in apiConfig[scope])) {
        throw new Error('unmapped path executed');
      }
      // Hold onto the original method for mapping use
      let mappedMethod = restMethod;

      // If the map method is not named as a REST method, the optional method 3rd argument in the REST getter will contain a REST method
      if (!['get', 'post', 'delete', 'put'].includes(mappedMethod)) {
        restMethod = apiConfig[scope][mappedMethod][2];
      }

      endpointArguments = [apiConfig[scope].endpoint, ...endpointArguments];
      switch (restMethod) {
        case 'get':
          return await this.handleGet(
            apiConfig[scope][restMethod],
            endpointArguments,
          );
        case 'post':
          const [postEndpointGetter, postDataGetter] = apiConfig[scope][
            mappedMethod
          ];
          return await this.handlePost(
            postEndpointGetter,
            endpointArguments,
            postDataGetter,
            dataArguments,
          );

        case 'put':
          const [putEndpointGetter, putDataGetter] = apiConfig[scope][
            mappedMethod
          ];
          return await this.handlePut(
            putEndpointGetter,
            endpointArguments,
            putDataGetter,
            dataArguments,
          );
        case 'delete':
          return await this.handleDelete(
            apiConfig[scope][restMethod],
            endpointArguments,
          );
        default:
          throw new Error(`Invalid method: ${restMethod}`);
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export class MembersApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}members`;
  }

  async renew(groupName, memberUuid, groupExpiration) {
    try {
      return await this.fetcher.post(
        `${this.endpoint}/${groupName}/${memberUuid}/renew`,
        {
          group_expiration: groupExpiration,
        },
      );
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}
