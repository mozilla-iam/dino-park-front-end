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
      return await fetch(resource, init);
    } catch (e) {
      if (this.failOnError && this.isError(e)) {
        console.log(`got error → failing over`);
        reload();
      }
      throw e;
    }
  }
  async put(resource, data, _init) {
    try {
      const init = _init || {};
      init.credentials = 'same-origin';
      const res = await fetch(resource, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return res.status;
    } catch (e) {
      console.log('error: ', e);
      if (this.failOnError && this.isError(e)) {
        console.log(`got error → failing over`);
        // reload();
      }
      throw e;
    }
  }

  async post(resource, data, _init) {
    try {
      const init = _init || {};
      init.credentials = 'same-origin';
      const res = await fetch(resource, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return res.status;
    } catch (e) {
      console.log('error: ', e);
      if (this.failOnError && this.isError(e)) {
        console.log(`got error → failing over`);
        // reload();
      }
      throw e;
    }
  }

  async delete(resource, data, _init) {
    try {
      const init = _init || {};
      init.credentials = 'same-origin';
      const res = await fetch(resource, {
        method: 'DELETE',
      });
      return res.status;
    } catch (e) {
      console.log('error: ', e);
      if (this.failOnError && this.isError(e)) {
        console.log(`got error → failing over`);
        // reload();
      }
      throw e;
    }
  }
}

export { Fetcher as default };
