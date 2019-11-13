import Vue from 'vue';
import Router from 'vue-router';
import AccessGroupMembershipManagement from './AccessGroupMembershipManagement.vue';
import { getMountedComponentWithStore } from '../../test/TestUtils';

Vue.use(Router);

describe('AccessGroupMembershipManagement', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupMembershipManagement);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
