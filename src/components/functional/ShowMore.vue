<template>
  <div>
    <slot></slot>
    <button v-if="items > initial" type="button" v-on:click="toggleOverflow">
      <template v-if="collapsed ">{{ buttonText }}</template>
      <template v-else>{{ alternateButtonText }}</template>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ShowMore',
  props: {
    initial: Number,
    buttonText: String,
    alternateButtonText: String,
    items: Number,
  },
  computed: {
    overflowingItems() {
      return this.$children.slice(this.initial);
    },
  },
  methods: {
    toggleOverflow() {
      // eslint-disable-next-line
      this.collapsed ? this.collapsed = false : this.collapsed = true;
    },
  },
  watch: {
    collapsed() {
      if (this.collapsed) {
        this.overflowingItems.forEach((item) => {
          item.$el.setAttribute('hidden', 'true');
        });
      } else {
        this.overflowingItems.forEach((item) => {
          item.$el.removeAttribute('hidden');
        });
      }
    },
  },
  data() {
    return {
      collapsed: null,
    };
  },
  mounted() {
    // this.rerender();
  },
};
</script>

