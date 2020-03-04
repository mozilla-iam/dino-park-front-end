import Vue from 'vue';
import Router from 'vue-router';
import AccessGroupMembersTable from './AccessGroupMembersTable.vue';
import getMountedComponentWithStore from '../../../tests/utils/getMountedComponentWithStore';

Vue.use(Router);

describe('AccessGroupMembersTable', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupMembersTable);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
