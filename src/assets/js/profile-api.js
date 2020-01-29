import Fetcher from '@/assets/js/fetcher';

export default class ProfileApi {
  constructor() {
    this.fetcher = new Fetcher({ failoverOn: [302] });
  }

  async searchProfiles(search) {
    return new Promise(async (res, rej) => {
      const data = await this.fetcher.fetch(
        `/api/v4/search/simple/?q=${search}&w=all`
      );
      const results = await data.json();
      if (!results.error) {
        res(results.dinos);
      } else {
        rej(results.error);
      }
    });
  }
}
