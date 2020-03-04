const API_PREFIX = '/groups/api/v1/';
const SORT_KEYS = {
  'role-asc': 'RoleAsc',
  'role-desc': 'RoleDesc',
  'expiration-asc': 'ExpirationAsc',
  'expiration-desc': 'ExpirationDesc',
};
export default {
  groups: {
    endpoint: `${API_PREFIX}groups`,
    get: (endpoint, groupName) => `${endpoint}/${groupName}/details`,
    put: [
      true,
      ({ type, description, expiration }) => ({
        type: type.toLowerCase(),
        description,
        group_expiration: expiration,
      }),
    ],
    delete: true,
    // Clean this up
    post: [endpoint => endpoint, data => data],
  },
  groupInvitations: {
    endpoint: `${API_PREFIX}invitations`,
    get: true,
    post: [
      true,
      ({ uuid, invitationExpiration, groupExpiration }) => ({
        user_uuid: uuid,
        invitation_expiration: invitationExpiration,
        group_expiration: groupExpiration,
      }),
    ],
    delete: (endpoint, groupName, uuid) => `${endpoint}/${groupName}/${uuid}`,
  },
  members: {
    endpoint: `${API_PREFIX}members`,
    get: (endpoint, groupName, options = {}) => {
      const qsArray = [];
      if (options.hasOwnProperty('search') && options.search) {
        qsArray.push(`q=${options.search}`);
      }
      if (options.hasOwnProperty('numResults') && options.numResults) {
        qsArray.push(`s=${options.numResults}`);
      }
      if (
        options.hasOwnProperty('sort') &&
        options.sort &&
        SORT_KEYS.hasOwnProperty(options.sort)
      ) {
        qsArray.push(`by=${SORT_KEYS[options.sort]}`);
      }
      if (!qsArray.length) {
        return `${endpoint}/${groupName}`;
      }
      return `${endpoint}/${groupName}?${qsArray.join('&')}`;
    },
    delete: (endpoint, groupName, uuid) => `${endpoint}/${groupName}/${uuid}`,
    renew: [
      (endpoint, groupName, uuid) => `${endpoint}/${groupName}/${uuid}/renew`,
      ({ groupExpiration }) => ({ group_expiration: groupExpiration }),
      'post',
    ],
  },
  curators: {
    endpoint: `${API_PREFIX}curators`,
    post: [
      (endpoint, groupName) => `${endpoint}/${groupName}`,
      ({ uuid }) => ({ member_uuid: uuid }),
    ],
    downgrade: [
      (endpoint, groupName, uuid) =>
        `${endpoint}/${groupName}/${uuid}/downgrade`,
      ({ groupExpiration }) => ({ group_expiration: groupExpiration }),
      'post',
    ],
  },
  terms: {
    endpoint: `${API_PREFIX}terms`,
    get: true,
    post: [true, text => ({ text })],
    delete: true,
    put: [true, text => ({ text })],
  },
  self: {
    endpoint: `${API_PREFIX}self`,
    delete: true,
  },
  selfInvitations: {
    endpoint: `${API_PREFIX}self/invitations`,
    get: endpoint => endpoint,
    post: [true],
    delete: true,
  },
  users: {
    endpoint: `${API_PREFIX}users`,
    get: (endpoint, q, groupName) => `${endpoint}?q=${q}&g=${groupName}&c=true`,
  },
};
