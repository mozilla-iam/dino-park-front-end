import Vue from 'vue';
import AccessGroupMembers from './AccessGroupMembers.vue';
import getMountedComponentWithStore from '../../../tests/utils/getMountedComponentWithStore';

describe('AccessGroupMembers', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupMembers);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
