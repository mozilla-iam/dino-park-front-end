import Vue from 'vue';
import Fluent from '@/assets/js/fluent';
import USStrings from 'non-mock_en-US_strings.ftl';
import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import getMountedComponentWithStore from './getMountedComponentWithStore';

const fluent = new Fluent('en_US', [USStrings]);
Vue.mixin({
  methods: {
    fluent(...args) {
      return fluent.get(...args);
    },
  },
});
const localVue = createLocalVue();

localVue.use(Vuex);
module.exports = function getRenderedText(Component, propsData, selector) {
  // const Constructor = Vue.extend(Component);
  // const vm = new Constructor({ propsData: propsData }).$mount();
  const wrapper = getMountedComponentWithStore(Component, {
    propsData: propsData,
  });
  if (typeof selector === 'string' && selector.length > 0) {
    const selected = wrapper.vm.$el.querySelector(selector);
    if (!selected) {
      return '';
    }
    return selected.textContent;
  } else {
    return wrapper.vm.$el.textContent;
  }
};
