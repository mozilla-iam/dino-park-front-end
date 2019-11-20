import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vue from 'vue';
import EditButton from './EditButton.vue';
// import MockRouter from '../../test/MockRouter';
// import router from '../../router.js';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
// const router = MockRouter.mock();
let mounted;
describe('EditButton', () => {
  it('should exist', () => {
    mounted = shallowMount(EditButton, {
      stubs: ['router-link', 'router-view'],
      propsData: {
        sendTo: {
          name: '',
          query: {
            section: '',
          },
        },
        section: '',
        sectionId: '',
      },

      localVue,
      router,
    });
    expect(mounted.vm).toBeInstanceOf(Vue);
  });
  describe('noEditCardOpen', () => {
    it('should return true if route name is not "Edit Profile"', () => {
      mounted = shallowMount(EditButton, {
        stubs: ['router-link', 'router-view'],
        propsData: {
          sendTo: {
            name: 'Edit Access Group',
            query: {
              section: 'edit',
            },
          },
          section: '',
          sectionId: '',
        },
        localVue,
        router,
      });
      expect(mounted.vm.noEditCardOpen()).toEqual(true);
    });
  });
});
