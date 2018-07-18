import { shallowMount } from '@vue/test-utils';
import Tag from '@/components/Tag.vue';

describe('Tag.vue', () => {
  it('renders props.name when passed', () => {
    const name = 'Italian';
    const wrapper = shallowMount(Tag, {
      propsData: { name },
    });
    expect(wrapper.text()).toMatch(name);
  });
});
