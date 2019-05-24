class Fetcher {
  constructor({
    failoverOn = [],
    defaultRes = {},
    failoverOnError = false,
    failoverFn = () => window.location.reload(),
  }) {
    this.failoverOn = failoverOn;
    this.failoverFn = failoverFn;
    this.failoverOnError = failoverOnError;
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
      if (this.failoverOnError) {
        console.log(`got error → failing over`);
        this.failover();
      }
      console.error(e);
      console.log(`error requesting ${resource}: ${e}`);
      throw e;
    }
  }
}

export { Fetcher as default };
