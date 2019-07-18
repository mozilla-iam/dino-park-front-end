import Vue from 'vue';
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
