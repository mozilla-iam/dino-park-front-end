import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupHistoryEdit from './AccessGroupHistoryEdit.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupHistoryEdit', () => {
  const Constructor = Vue.extend(AccessGroupHistoryEdit);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
