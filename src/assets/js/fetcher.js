class Fetcher {
  constructor({
    failoverOn = [],
    defaultRes = {},
    failoverFn = window.location.reload,
  }) {
    this.failoverOn = failoverOn;
    this.failoverFn = failoverFn;
    this.defaultRes = defaultRes;
  }

  failover() {
    this.failoverFn();
  }

  async fetch(resource, init) {
    try {
      const res = await fetch(resource, init);
      if (this.failoverOn.includes(res.status)) {
        console.log(`got status ${res.status} → failing over`);
        this.failover();
      }
      return res;
    } catch (e) {
      console.log(`error requesting ${resource}: ${e}`);
      throw e;
    }
  }
}

export { Fetcher as default };
