import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupCreate from './AccessGroupCreate.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupCreate', () => {
  const Constructor = Vue.extend(AccessGroupCreate);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
