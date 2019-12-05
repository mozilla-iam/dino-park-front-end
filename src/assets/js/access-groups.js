import Fetcher from '@/assets/js/fetcher';
import accessGroupData from '@/accessgroupdata.json';
import accessGroupMembers from '@/accessgroupmembers.json';
import accessGroupCurators from '@/accessgroupcurators.json';
import accessGroupMemberInvitations from '@/accessgroupmemberinvitations.json';

export default class AccessGroups {
  constructor() {
    this.fetcher = new Fetcher({ failoverOn: [302] });
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

  async leaveGroup(groupName) {
    return new Promise((res, rej) => {
      res('Left group');
    }); //this.fetcher.fetch('');
  }

  async getAccessGroup(groupName) {
    return new Promise((res, rej) => {
      res(accessGroupData);
    }); //this.fetcher.fetch('');
  }

  async getAllMembers(groupName) {
    return new Promise((res, rej) => {
      const { members } = accessGroupMembers;
      const { curators } = accessGroupCurators;
      res({ members, curators });
    }); //this.fetcher.fetch('');
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

  async getAccessGroupMemberInvitations(groupName) {
    return new Promise((res, rej) => {
      const members = accessGroupMemberInvitations;
      res(members);
    }); //this.fetcher.fetch('');
  }

  async updateAccessGroupDetails(groupName, details) {
    return new Promise((res, rej) => {
      res('access group updated');
    }); //this.fetcher.fetch('');
  }
  async updateAccessGroupTOS(groupName, tos) {
    return new Promise((res, rej) => {
      res('terms of service updated');
    }); //this.fetcher.fetch('');
  }
  async createAccessGroup(form) {
    return new Promise((res, rej) => {
      res('access group created');
    }); //this.fetcher.fetch('');
  }
  async closeAccessGroup(groupName) {
    return new Promise((res, rej) => {
      res('access group closed');
    }); //this.fetcher.fetch('');
  }
  async deleteAccessGroupTOS(groupName) {
    return new Promise((res, rej) => {
      res('access group tos removed');
    }); //this.fetcher.fetch('');
  }

  async addAccessGroupCurators(groupName, curators) {
    // TODO: Since we don't add curators in a batch, this will have to be several requests
    return new Promise((res, rej) => {
      res('curators have been added');
    }); //this.fetcher.fetch('');
  }

  async removeAccessGroupCurators(groupName, curators) {
    // TODO: Since we don't add curators in a batch, this will have to be several requests
    return new Promise((res, rej) => {
      res('curators have been removed');
    }); //this.fetcher.fetch('');
  }

  async addAccessGroupMembers(groupName, curators) {
    // TODO: Since we don't add curators in a batch, this will have to be several requests
    return new Promise((res, rej) => {
      res('members have been added');
    }); //this.fetcher.fetch('');
  }

  async removeAccessGroupMembers(groupName, curators) {
    // TODO: Since we don't add curators in a batch, this will have to be several requests
    return new Promise((res, rej) => {
      res('members have been removed');
    }); //this.fetcher.fetch('');
  }
}
