import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupMemberItem from './AccessGroupMemberItem.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupMemberItem', () => {
  const Constructor = Vue.extend(AccessGroupMemberItem);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
