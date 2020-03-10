import Fetcher from '@/assets/js/fetcher';
export default class Features {
  constructor() {
    this.fetcher = new Fetcher({ failoverOn: [302] });
  }
  async get() {
    try {
      const result = await this.fetcher.fetch('/config/features.json');
      return await result.json();
    } catch (e) {
      console.error(e.message);
      throw new Error(e.message);
    }
  }
}
