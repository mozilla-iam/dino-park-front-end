/* eslint-disable max-classes-per-file */
import reload from '@/assets/js/reload';

class ApiError extends Error {}

function isJson(res) {
  const contentType = res.headers.get('content-type');
  return contentType && contentType.includes('application/json');
}

async function handleResponse(res) {
  if (isJson(res)) {
    const json = await res.json();
    if (!res.ok) {
      const { error } = json;
      if (error !== undefined) {
        throw new ApiError(error);
      }
      throw ApiError(res.status);
    }
    return json;
  }
  return res.status;
}

class Fetcher {
  constructor({ failOnError = true, isError = () => true } = {}) {
    this.failOnError = failOnError;
    this.isError = isError;
  }

  async fetch(resource, _init) {
    try {
      const init = _init || {};
      init.credentials = 'same-origin';
      return handleResponse(await fetch(resource, init));
    } catch (e) {
      if (e instanceof ApiError) {
        throw e;
      }
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
      return handleResponse(res);
    } catch (e) {
      if (e instanceof ApiError) {
        throw e;
      }
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
      return handleResponse(res);
    } catch (e) {
      if (e instanceof ApiError) {
        throw e;
      }
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
      return handleResponse(res);
    } catch (e) {
      if (e instanceof ApiError) {
        throw e;
      }
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
