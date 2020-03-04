import Vue from 'vue';
import Router from 'vue-router';
import AccessGroupMembersTableRow from './AccessGroupMembersTableRow.vue';
import getMountedComponentWithStore from '../../../tests/utils/getMountedComponentWithStore';

Vue.use(Router);

describe('AccessGroupMembersTableRow', () => {
  it('should exist', () => {
    const wrapper = getMountedComponentWithStore(AccessGroupMembersTableRow);
    expect(wrapper.vm).toBeInstanceOf(Vue);
  });
});
