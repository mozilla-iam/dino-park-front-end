import Fetcher from '@/assets/js/fetcher';

const fetcher = new Fetcher();

class Related {
  constructor() {
    this.manager = null;
    this.directs = [];
    this.peers = [];
    this.show = false;
  }

  async update(username) {
    try {
      const res = await fetcher.fetch(
        `/api/v4/orgchart/related/${encodeURIComponent(username)}`,
      );
      const { manager, directs, peers } = await res.json();
      this.manager = manager || null;
      this.directs = directs || [];
      this.peers = peers || [];
    } catch (e) {
      this.manager = null;
      this.directs = [];
      this.peers = [];
    }
    this.show =
      this.manager != null || this.directs.length > 0 || this.peers.length > 0;
  }
}

export default Related;
