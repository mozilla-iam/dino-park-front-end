import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupInvitationNotification from './AccessGroupInvitationNotification.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupInvitationNotification', () => {
  const Constructor = Vue.extend(AccessGroupInvitationNotification);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
