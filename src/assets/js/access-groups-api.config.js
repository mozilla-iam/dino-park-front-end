const API_PREFIX = '/groups/api/v1/';
const GROUPS_SORT_KEYS = {
  'name-asc': 'NameAsc',
  'name-desc': 'NameDesc',
  'member-count-asc': 'MemberCountAsc',
  'member-count-desc': 'MemberCountDesc',
};
const MEMBERS_SORT_KEYS = {
  'role-asc': 'RoleAsc',
  'role-desc': 'RoleDesc',
  'expiration-asc': 'ExpirationAsc',
  'expiration-desc': 'ExpirationDesc',
};
const ROLE_KEYS = {
  all: 'Any',
  curators: 'Curator',
  members: 'Member',
};
export default {
  group: {
    endpoint: `${API_PREFIX}groups`,
    get: (endpoint, groupName) => `${endpoint}/${groupName}/details`,
    put: [
      true,
      ({ type, description, expiration }) => ({
        type,
        description,
        group_expiration: expiration,
      }),
    ],
    delete: true,
    // Clean this up
    post: [(endpoint) => endpoint, (data) => data],
  },
  groups: {
    endpoint: `${API_PREFIX}groups`,
    get: (endpoint, options = {}) => {
      const qsArray = [];
      if (options.hasOwnProperty('numResults') && options.numResults) {
        qsArray.push(`s=${options.numResults}`);
      } else {
        qsArray.push(`s=20`);
      }
      if (options.hasOwnProperty('next') && options.next) {
        qsArray.push(`n=${options.next}`);
      }
      if (options.hasOwnProperty('search') && options.search) {
        qsArray.push(`f=${options.search}`);
      }
      if (
        options.hasOwnProperty('sort') &&
        options.sort &&
        GROUPS_SORT_KEYS.hasOwnProperty(options.sort)
      ) {
        qsArray.push(`by=${GROUPS_SORT_KEYS[options.sort]}`);
      }
      return `${endpoint}?${qsArray.join('&')}`;
    },
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
  groupInvitationEmail: {
    endpoint: `${API_PREFIX}invitations`,
    get: (endpoint, groupName) => `${endpoint}/${groupName}/email`,
    post: [
      (endpoint, groupName) => `${endpoint}/${groupName}/email`,
      (body) => ({ body }),
    ],
  },
  groupRequests: {
    endpoint: `${API_PREFIX}requests`,
    get: true,
    delete: (endpoint, groupName, uuid) => `${endpoint}/${groupName}/${uuid}`,
  },
  members: {
    endpoint: `${API_PREFIX}members`,
    get: (endpoint, groupName, options = {}) => {
      const qsArray = [];
      if (options.hasOwnProperty('next') && options.next) {
        qsArray.push(`n=${options.next}`);
      }
      if (options.hasOwnProperty('search') && options.search) {
        qsArray.push(`q=${options.search}`);
      }
      if (options.hasOwnProperty('numResults') && options.numResults) {
        qsArray.push(`s=${options.numResults}`);
      }
      if (
        options.hasOwnProperty('sort') &&
        options.sort &&
        MEMBERS_SORT_KEYS.hasOwnProperty(options.sort)
      ) {
        qsArray.push(`by=${MEMBERS_SORT_KEYS[options.sort]}`);
      }
      if (
        options.hasOwnProperty('role') &&
        options.role &&
        ROLE_KEYS.hasOwnProperty(options.role)
      ) {
        qsArray.push(`r=${ROLE_KEYS[options.role]}`);
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
    post: [true, (text) => ({ text })],
    delete: true,
    put: [true, (text) => ({ text })],
  },
  self: {
    endpoint: `${API_PREFIX}self`,
    delete: true,
  },
  selfInvitations: {
    endpoint: `${API_PREFIX}self/invitations`,
    get: (endpoint) => endpoint,
    post: [true],
    delete: true,
  },
  selfRequests: {
    endpoint: `${API_PREFIX}self/requests`,
    get: (endpoint) => endpoint,
    post: [true],
    delete: true,
  },
  users: {
    endpoint: `${API_PREFIX}users`,
    get: (
      endpoint,
      q,
      groupName,
      includeCurators = false,
      showExisting = false,
    ) =>
      `${endpoint}?q=${q}&g=${groupName}&c=${includeCurators}&a=${showExisting}`,
  },
};
