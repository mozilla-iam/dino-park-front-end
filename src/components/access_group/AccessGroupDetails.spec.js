import Vue from 'vue';
import AccessGroupDetails from './AccessGroupDetails.vue';
import { getMountedComponentWithStore } from '../../test/TestUtils';

describe('AccessGroupDetails', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupDetails);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
