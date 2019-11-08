import Vue from 'vue';
import AccessGroupMemberItem from './AccessGroupMemberItem.vue';

describe('AccessGroupMemberItem', () => {
  const Constructor = Vue.extend(AccessGroupMemberItem);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
