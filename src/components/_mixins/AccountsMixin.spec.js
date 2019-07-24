import Vue from 'vue';
import AccountsMixin from './AccountsMixin.vue';

describe('AccountsMixin', () => {
  const MixinConstructor = Vue.extend(AccountsMixin);
  const component = new MixinConstructor();
  it('should exist', () => {
    expect(component.availableAccounts.length).toBeGreaterThan(0);
    expect(typeof component.EXTERNAL_ACCOUNTS).toEqual('object');
  });

  it('should have availableAccounts that are all in EXTERNAL_ACCOUNTS', () => {
    const missing = false;
    for (let i = 0, len = component.availableAccounts.length; i < len; i++) {
      if (!(component.availableAccounts[i] in component.EXTERNAL_ACCOUNTS)) {
        missing = true;
      }
    }
    expect(missing).toEqual(false);
  });
});
