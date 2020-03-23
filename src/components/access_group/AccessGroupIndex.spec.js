import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupIndex from './AccessGroupIndex.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupIndex', () => {
  const Constructor = Vue.extend(AccessGroupIndex);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
