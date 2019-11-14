import reload from '@/assets/js/reload';

class Fetcher {
  constructor({ failOnError = true, isError = () => true } = {}) {
    this.failOnError = failOnError;
    this.isError = isError;
  }

  async fetch(resource, _init) {
    try {
      const init = _init || {};
      init.credentials = 'same-origin';
      const res = await fetch(resource, init);
      return res;
    } catch (e) {
      if (this.failOnError && this.isError(e)) {
        console.log(`got error → failing over`);
        reload();
      }
      throw e;
    }
  }
}

export { Fetcher as default };
