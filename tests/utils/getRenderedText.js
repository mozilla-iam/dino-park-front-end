import Vue from 'vue';
import Fluent from '@/assets/js/fluent';
import USStrings from 'non-mock_en-US_strings.ftl';

const fluent = new Fluent('en_US', [USStrings]);
Vue.mixin({
  methods: {
    fluent(...args) {
      return fluent.get(...args);
    },
  },
});

module.exports = function getRenderedText(Component, propsData, selector) {
  const Constructor = Vue.extend(Component);
  const vm = new Constructor({ propsData: propsData }).$mount();
  if (typeof selector === 'string' && selector.length > 0) {
    const selected = vm.$el.querySelector(selector);
    if (!selected) {
      return '';
    }
    return selected.textContent;
  } else {
    return vm.$el.textContent;
  }
};
