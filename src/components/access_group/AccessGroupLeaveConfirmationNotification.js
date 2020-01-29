import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupLeaveConfirmationNotification from './AccessGroupLeaveConfirmationNotification.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupLeaveConfirmationNotification', () => {
  const Constructor = Vue.extend(AccessGroupLeaveConfirmationNotification);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
