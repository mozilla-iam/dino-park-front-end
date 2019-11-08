import Vue from 'vue';
import AccessGroupMembers from './AccessGroupMembers.vue';

describe('AccessGroupMembers', () => {
  const Constructor = Vue.extend(AccessGroupMembers);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
