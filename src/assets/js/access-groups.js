import {
  GroupsApi,
  MembersApi,
  GroupInvitationsApi,
  TermsApi,
  SelfInvitationsApi,
  CuratorsApi,
  UsersApi,
} from './access-groups-api.js';
import accessGroupMembers from '@/accessgroupmembers.json';
import accessGroupCurators from '@/accessgroupcurators.json';

export default class AccessGroups {
  constructor() {
    this.groupsApi = new GroupsApi();
    this.membersApi = new MembersApi();
    this.groupInvitationsApi = new GroupInvitationsApi();
    this.termsApi = new TermsApi();
    this.selfInvitationsApi = new SelfInvitationsApi();
    this.curatorsApi = new CuratorsApi();
    this.usersApi = new UsersApi();
  }

  /**
   * Access Group Methods
   */
  async getAccessGroup(groupName) {
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

  async updatesGroupDetails(groupName, updateData) {
    try {
      return await this.groupsApi.put(groupName, updateData);
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async updateAccessGroupExpiration(groupName, expiration) {
    return new Promise((res, rej) => {
      res('Expiration has been updated');
    }); //this.fetcher.fetch('');
  }

  async leaveGroup(groupName) {
    return new Promise((res, rej) => {
      res('Left group');
    }); //this.fetcher.fetch('');
  }

  async createAccessGroup(form) {
    return new Promise((res, rej) => {
      res('access group created');
    }); //this.fetcher.fetch('');
  }

  async closeAccessGroup(groupName) {
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

  async addMembers(groupName, members, expiration) {
    try {
      for (const member of members) {
        await this.membersApi.post(groupName, member.uuid, expiration);
      }
      return 200;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }

  async renewMember(groupName, memberUuid, expiration) {
    try {
      return await this.membersApi.renew(groupName, memberUuid, expiration);
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
    return new Promise((res, rej) => {
      res('Accepted invitation');
    }); //this.fetcher.fetch('');
  }

  async rejectInvitation(groupName, uuid) {
    return new Promise((res, rej) => {
      res('Rejected invitation');
    }); //this.fetcher.fetch('');
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
