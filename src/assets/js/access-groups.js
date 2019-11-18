import Fetcher from '@/assets/js/fetcher';

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
}
