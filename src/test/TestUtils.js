import { shallowMount, createLocalVue } from '@vue/test-utils';
import MockStore from './MockStore';
const localVue = createLocalVue();

export function getMountedComponentWithStore(component, extra = {}) {
  return shallowMount(component, {
    ...MockStore,
    ...extra,
    localVue,
  });
}
