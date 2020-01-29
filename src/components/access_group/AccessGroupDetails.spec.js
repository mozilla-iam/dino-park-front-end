import Vue from 'vue';
import AccessGroupDetails from './AccessGroupDetails.vue';
import getMountedComponentWithStore from '../../../tests/utils/getMountedComponentWithStore';

describe('AccessGroupDetails', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupDetails);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
