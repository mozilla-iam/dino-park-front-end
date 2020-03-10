import Vue from 'vue';
import AccessGroupCurators from './AccessGroupCurators.vue';
import getMountedComponentWithStore from '../../../tests/utils/getMountedComponentWithStore';

describe('AccessGroupCurators', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupCurators);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });

  describe('computed:curators', () => {
    it('should return empty list of curators', () => {
      const wrapper = getMountedComponentWithStore(AccessGroupCurators);
      expect(wrapper.vm.curators).toBeInstanceOf(Array);
      expect(wrapper.vm.curators.length).toEqual(0);
    });
  });
});
