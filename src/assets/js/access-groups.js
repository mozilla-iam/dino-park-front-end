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

  async getAccessGroupMemberInvitations(groupName) {
    return new Promise((res, rej) => {
      const members = accessGroupMemberInvitations;
      res(members);
    }); //this.fetcher.fetch('');
  }
}
