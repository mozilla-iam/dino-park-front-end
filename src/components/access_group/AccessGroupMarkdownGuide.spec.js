import Vue from 'vue';
import AccessGroupMarkdownGuide from './AccessGroupMarkdownGuide.vue';
import getMountedComponentWithStore from '../../../tests/utils/getMountedComponentWithStore';

describe('AccessGroupMarkdownGuide', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupMarkdownGuide);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
