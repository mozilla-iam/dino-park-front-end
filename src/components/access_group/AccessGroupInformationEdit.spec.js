import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupInformationEdit from './AccessGroupInformationEdit.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupInformationEdit', () => {
  const Constructor = Vue.extend(AccessGroupInformationEdit);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
    1;
  });
});
