import Vue from 'vue';
import CompanyMixin from './CompanyMixin.vue';

describe('CompanyMixin', () => {
  const MixinConstructor = Vue.extend(CompanyMixin);
  const component = new MixinConstructor();
  it('should exist', () => {
    expect(component).toBeTruthy();
  });
  describe('company()', () => {
    it('should return null when bad params are passed', () => {
      const test = component.company(null, '');
      expect(test).toBeNull();
    });

    it('should return "Mozilla Foundation" when primary email ends in "mozillafoundation.org" from valid stafff', () => {
      const test = component.company(
        { staff: { value: true } },
        'test@mozillafoundation.org',
      );
      expect(test).toEqual('Mozilla Foundation');
    });

    it('should return "Mozilla Corporation" when primary email is anything other than "mozillafoundation.org" from valid stafff', () => {
      const test = component.company(
        { staff: { value: true } },
        'test@test.org',
      );
      expect(test).toEqual('Mozilla Corporation');
    });
  });
});
