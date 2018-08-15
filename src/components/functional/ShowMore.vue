<template>
  <div>
    <slot name="base">
    </slot>
    <button type="button" :aria-expanded="expanded ? 'true' : 'false'" v-on:click="toggleOverflow">{{ expanded ? alternateButtonText : buttonText }}</button>
    <slot name="more" v-if="expanded"></slot>
  </div>
</template>

<script>
export default {
  name: 'ShowMore',
  props: {
    initial: Number,
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

