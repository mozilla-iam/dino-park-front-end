import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupListItem from './AccessGroupListItem.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupListItem', () => {
  const Constructor = Vue.extend(AccessGroupListItem);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
