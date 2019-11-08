import Vue from 'vue';
import AccessGroupDescription from './AccessGroupDescription.vue';

describe('AccessGroupDescription', () => {
  const Constructor = Vue.extend(AccessGroupDescription);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
