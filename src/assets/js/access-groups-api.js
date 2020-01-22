import Fetcher from '@/assets/js/fetcher';

const API_PREFIX = '/groups/api/v1/';
class Api {
  constructor() {
    this.fetcher = new Fetcher({ failoverOn: [302] });
  }
}
export class GroupsApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}groups`;
  }

  async get(groupName) {
    try {
      const result = await this.fetcher.fetch(
        `${this.endpoint}/${groupName}/details`
      );
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async put(groupName, data) {
    try {
      return await this.fetcher.put(`${this.endpoint}/${groupName}`, data);
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async delete(groupName) {
    try {
      return await this.fetcher.delete(`${this.endpoint}/${groupName}`);
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  static getUpdateObject(data) {
    return {
      typ: 'type' in data ? data.type : '',
      description: 'description' in data ? data.description : '',
      group_expiration: 'expiration' in data ? data.expiration : 0,
    };
  }
  async create(data) {
    try {
      return await this.fetcher.post(this.endpoint, data);
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}

export class GroupInvitationsApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}invitations`;
  }

  async get(groupName) {
    try {
      const result = await this.fetcher.fetch(`${this.endpoint}/${groupName}`);
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
  async post(groupName, uuid, invitationExpiration, groupExpiration) {
    try {
      return await this.fetcher.post(`${this.endpoint}/${groupName}`, {
        user_uuid: uuid,
        invitation_expiration: invitationExpiration,
        group_expiration: groupExpiration,
      });
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
  async delete(groupName, uuid) {
    try {
      return await this.fetcher.delete(`${this.endpoint}/${groupName}/${uuid}`);
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}

export class MembersApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}members`;
  }

  async get(groupName) {
    try {
      const result = await this.fetcher.fetch(`${this.endpoint}/${groupName}`);
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async post(groupName, memberUuid, groupExpiration) {
    try {
      const result = await this.fetcher.post(
        `${this.endpoint}/${groupName}/${memberUuid}`,
        {
          group_expiration: groupExpiration,
        }
      );
      if (Number.isInteger(result)) {
        throw new Error('Member post error: ' + result);
      }
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async renew(groupName, memberUuid, groupExpiration) {
    try {
      const result = await this.fetcher.post(
        `${this.endpoint}/${groupName}/${memberUuid}/renew`,
        {
          group_expiration: groupExpiration,
        }
      );
      if (Number.isInteger(result)) {
        throw new Error('Member post error: ' + result);
      }
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async delete(groupName, memberUuid) {
    try {
      const result = await this.fetcher.delete(
        `${this.endpoint}/${groupName}/${memberUuid}`
      );
      return await result.status;
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}

export class CuratorsApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}curators`;
  }

  async post(groupName, member_uuid) {
    try {
      return await this.fetcher.post(`${this.endpoint}/${groupName}`, {
        member_uuid,
      });
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}

export class TermsApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}terms`;
  }

  async get(groupName) {
    try {
      const result = await this.fetcher.fetch(`${this.endpoint}/${groupName}`);
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async put(groupName, data) {
    try {
      return await this.fetcher.put(`${this.endpoint}/${groupName}`, {
        text: data,
      });
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async post(groupName, data) {
    try {
      return await this.fetcher.post(`${this.endpoint}/${groupName}`, {
        text: data,
      });
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }

  async delete(groupName) {
    try {
      return await this.fetcher.delete(`${this.endpoint}/${groupName}`);
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}

export class SelfApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}self`;
  }

  async delete(groupName) {
    try {
      const result = await this.fetcher.delete(`${this.endpoint}/${groupName}`);
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}

export class SelfInvitationsApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}self/invitations`;
  }

  async get() {
    try {
      const result = await this.fetcher.fetch(this.endpoint);
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
  async post(groupName) {
    try {
      return await this.fetcher.post(`${this.endpoint}/${groupName}`, {
        text: data,
      });
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}

export class SelfJoinApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}self/join`;
  }

  async post(groupName) {
    try {
      return await this.fetcher.post(`${this.endpoint}/${groupName}`);
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}

export class UsersApi extends Api {
  constructor() {
    super();
    this.endpoint = `${API_PREFIX}users`;
  }

  async get(q, scope) {
    try {
      const result = await this.fetcher.fetch(
        `${this.endpoint}?q=${q}&t=${scope}`
      );
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}
