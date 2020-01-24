import {
  GroupsApi,
  MembersApi,
  GroupInvitationsApi,
  TermsApi,
  SelfInvitationsApi,
  CuratorsApi,
  UsersApi,
  SelfApi,
} from './access-groups-api.js';
import accessGroupMembers from '@/accessgroupmembers.json';
import accessGroupCurators from '@/accessgroupcurators.json';

const defaultGroupInvitationExpiration = 5;

export default class AccessGroups {
  constructor() {
    this.groupsApi = new GroupsApi();
    this.membersApi = new MembersApi();
    this.groupInvitationsApi = new GroupInvitationsApi();
    this.termsApi = new TermsApi();
    this.selfInvitationsApi = new SelfInvitationsApi();
    this.curatorsApi = new CuratorsApi();
    this.usersApi = new UsersApi();
    this.selfApi = new SelfApi();
  }

  /**
   * Access Group Methods
   */
  async getGroup(groupName) {
    return new Promise((res, rej) => {
      this.groupsApi
        .get(groupName)
        .then(result => {
          console.log('getAccessGroup result: ', result);
          res(result);
        })
        .catch(error => {
          console.log('found error: ', error);
          rej(error);
        });
    });
  }

  async updateGroupDetails(groupName, updateData) {
    try {
      return await this.groupsApi.put(groupName, updateData);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async leaveGroup(groupName) {
    try {
      return await this.selfApi.delete(groupName);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async createGroup(form) {
    try {
      return await this.groupsApi.create(form);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async closeGroup(groupName) {
    try {
      return await this.groupsApi.delete(groupName);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  /**
   * Members Methods
   */

  async getAllMembers(groupName) {
    try {
      return await this.membersApi.get(groupName);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async deleteMember(groupName, uuid) {
    try {
      return await this.membersApi.delete(groupName, uuid);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async deleteCurator(groupName, uuid) {
    return new Promise((res, rej) => {
      const { members } = accessGroupMembers;
      const { curators } = accessGroupCurators;
      res('curator deleted');
    }); //this.fetcher.fetch('');
  }

  async addCurators(groupName, curators) {
    try {
      for (const curator of curators) {
        await this.curatorsApi.post(groupName, curator.uuid);
      }
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async removeCurators(groupName, curators) {
    return new Promise((res, rej) => {
      res('curators have been removed');
    }); //this.fetcher.fetch('');
  }

  async renewMember(groupName, memberUuid, expiration) {
    try {
      return await this.membersApi.renew(groupName, memberUuid, expiration);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async sendInvitations(groupName, members, expiration) {
    try {
      let results = [];
      for (const member of members) {
        results.push(
          await this.groupInvitationsApi.post(
            groupName,
            member.uuid,
            defaultGroupInvitationExpiration,
            expiration
          )
        );
      }
      const errors = results.filter(code => code !== 200);
      if (errors.length) {
        throw new Error('Send invitation errors');
      }
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async deleteInvitation(groupName, uuid) {
    try {
      await this.groupInvitationsApi.delete(groupName, uuid);
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async getUserInvitations() {
    try {
      return await this.selfInvitationsApi.get();
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async acceptInvitation(groupName) {
    try {
      return await this.selfInvitationsApi.post(groupName);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async rejectInvitation(groupName) {
    try {
      return await this.selfInvitationsApi.delete(groupName);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async getAccessGroupMemberInvitations(groupName) {
    try {
      return await this.groupInvitationsApi.get(groupName);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async updateAccessGroupTOS(groupName, tos) {
    try {
      return await this.termsApi.put(groupName, tos);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async addAccessGroupTOS(groupName, tos) {
    try {
      return await this.termsApi.post(groupName, tos);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async deleteAccessGroupTOS(groupName) {
    try {
      return await this.termsApi.delete(groupName);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async getAccessGroupTOS(groupName) {
    try {
      return await this.termsApi.get(groupName);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async updateInviteText(text) {
    return new Promise((res, rej) => {
      res('text updated');
    }); //this.fetcher.fetch('');
  }

  async resendInvitation(text) {
    return new Promise((res, rej) => {
      res('invitation resent');
    }); //this.fetcher.fetch('');
  }

  async getUsers(q, scope) {
    try {
      let users = await this.usersApi.get(q, scope);
      // TODO: Replace this with: users = users.filter(({ email }) => email !== null);
      users = users.filter(({ first_name }) => first_name !== null);
      return users;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }
}
