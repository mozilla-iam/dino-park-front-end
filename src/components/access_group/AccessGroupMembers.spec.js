import Vue from 'vue';
import AccessGroupMembers from './AccessGroupMembers.vue';
import { getMountedComponentWithStore } from '../../test/TestUtils';

describe('AccessGroupMembers', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupMembers);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
