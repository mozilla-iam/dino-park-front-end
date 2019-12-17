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
}
