import Vue from 'vue';
import PhoneNumbersMixin from './PhoneNumbersMixin.vue';

describe('PhoneNumbersMixin', () => {
  const MixinConstructor = Vue.extend(PhoneNumbersMixin);
  const component = new MixinConstructor();
  it('should exist', () => {
    expect(component).toBeTruthy();
  });
  describe('destructPhoneKey()', () => {
    it('should return destructed phone object', () => {
      const destructed = component.destructPhoneKey('Web#1231231234#y', 2);
      expect(destructed.view).toEqual('Web');
      expect(destructed.num).toEqual('1231231234');
      expect(destructed.contact).toEqual(true);
    });

    it('should return destructed phone object with defaulted contact', () => {
      const destructed = component.destructPhoneKey('Web#1231231234', 2);
      expect(destructed.view).toEqual('Web');
      expect(destructed.num).toEqual('1231231234');
      expect(destructed.contact).toEqual(false);
    });
    it('should return destructed phone object with defaulted contact and number', () => {
      const destructed = component.destructPhoneKey('Web', 2);
      expect(destructed.view).toEqual('Web');
      expect(destructed.num).toEqual(2);
      expect(destructed.contact).toEqual(false);
    });
    it('should return destructed phone object with defaulted contact and number and view', () => {
      const destructed = component.destructPhoneKey('', 2);
      // TODO: this case is wrong and probably should be addressed
      expect(destructed.view).toEqual('');
      expect(destructed.num).toEqual(2);
      expect(destructed.contact).toEqual(false);
    });
  });

  describe('constructPhoneKey()', () => {
    it('should return constructed phone object', () => {
      const constructed = component.constructPhoneKey({
        view: 'Web',
        num: '1231231234',
        contact: true,
      });
      expect(constructed).toEqual('Web#1231231234#y');
    });

    it('should return constructed phone object with defaulted contact', () => {
      const constructed = component.constructPhoneKey({
        view: 'Web',
        num: '1231231234',
      });
      expect(constructed).toEqual('Web#1231231234#n');
    });
  });
});
