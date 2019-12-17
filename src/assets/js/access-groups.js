import {
  GroupsApi,
  MembersApi,
  GroupInvitationsApi,
  TermsApi,
  SelfInvitationsApi,
} from './access-groups-api.js';
import accessGroupMembers from '@/accessgroupmembers.json';
import accessGroupCurators from '@/accessgroupcurators.json';
import accessGroupMemberInvitations from '@/accessgroupmemberinvitations.json';
import accessGroupTermsOfService from '@/accessgrouptermsofservice.json';

export default class AccessGroups {
  constructor() {
    this.groupsApi = new GroupsApi();
    this.membersApi = new MembersApi();
    this.groupInvitationsApi = new GroupInvitationsApi();
    this.termsApi = new TermsApi();
    this.selfInvitationsApi = new SelfInvitationsApi();
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

  async updateAccessGroupDetails(groupName, updateData) {
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
    return new Promise((res, rej) => {
      const { members } = accessGroupMembers;
      const { curators } = accessGroupCurators;
      res('member deleted');
    }); //this.fetcher.fetch('');
  }
  async deleteCurator(groupName, uuid) {
    return new Promise((res, rej) => {
      const { members } = accessGroupMembers;
      const { curators } = accessGroupCurators;
      res('curator deleted');
    }); //this.fetcher.fetch('');
  }

  async addAccessGroupCurators(groupName, curators) {
    // TODO: Since we don't add curators in a batch, this will have to be several requests
    return new Promise((res, rej) => {
      res('curators have been added');
    }); //this.fetcher.fetch('');
  }

  async removeAccessGroupCurators(groupName, curators) {
    return new Promise((res, rej) => {
      res('curators have been removed');
    }); //this.fetcher.fetch('');
  }

  async addAccessGroupMembers(groupName, curators) {
    return new Promise((res, rej) => {
      res('members have been added');
    }); //this.fetcher.fetch('');
  }

  async removeAccessGroupMembers(groupName, curators) {
    return new Promise((res, rej) => {
      res('members have been removed');
    }); //this.fetcher.fetch('');
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
}
