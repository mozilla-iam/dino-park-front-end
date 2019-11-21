import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupInvitationsEdit from './AccessGroupInvitationsEdit.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupInvitationsEdit', () => {
  const Constructor = Vue.extend(AccessGroupInvitationsEdit);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
