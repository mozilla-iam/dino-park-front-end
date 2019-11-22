import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import AccessGroupTOSAcceptanceNotification from './AccessGroupTOSAcceptanceNotification.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('AccessGroupTOSAcceptanceNotification', () => {
  const Constructor = Vue.extend(AccessGroupTOSAcceptanceNotification);

  it('should exist', () => {
    const component = new Constructor();
    expect(component).toBeInstanceOf(Vue);
  });
});
