import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupMembersEdit from './AccessGroupMembersEdit.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupMembersEdit', () => {
  const Constructor = Vue.extend(AccessGroupMembersEdit);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
