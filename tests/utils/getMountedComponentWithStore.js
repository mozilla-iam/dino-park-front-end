import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import MockStore from '../mocks/mockStore';
const localVue = createLocalVue();

localVue.use(Vuex);
module.exports = function getMountedComponentWithStore(component, extra = {}) {
  return shallowMount(component, {
    ...MockStore,
    ...extra,
    localVue,
  });
};
