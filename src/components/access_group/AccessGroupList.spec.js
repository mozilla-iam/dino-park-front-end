import Vue from 'vue';
import AccessGroupList from './AccessGroupList.vue';
import getMountedComponentWithStore from '../../../tests/utils/getMountedComponentWithStore';

describe('AccessGroupList', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupList);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
