<template>
  <div>
    <slot name="base">
    </slot>
    <slot name="more" v-if="expanded"></slot>
    <button type="button" :aria-expanded="expanded ? 'true' : 'false'" v-on:click="toggleOverflow">{{ expanded ? alternateButtonText : buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: 'ShowMore',
  props: {
    buttonText: String,
    alternateButtonText: String,
  },
  methods: {
    toggleOverflow() {
      this.expanded = !this.expanded;
    },
  },
  watch: {
    expanded() {
      // manage focus
    },
  },
  data() {
    return {
      expanded: '',
    };
  },
};
</script>

