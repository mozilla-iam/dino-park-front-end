import Vue from 'vue';
import AccessGroupDescription from './AccessGroupDescription.vue';
import getMountedComponentWithStore from '../../../tests/utils/getMountedComponentWithStore';

describe('AccessGroupDescription', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupDescription);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
