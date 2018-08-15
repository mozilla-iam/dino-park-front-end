<template>
  <div class="show-more">
    <slot name="base">
    </slot>
    <div class="show-more__overflow" v-if="expanded" tabindex="0">
      <slot name="overflow">
      </slot>
    </div>
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
  computed: {
    overflowContent() {
      return this.$el.querySelector('.show-more__overflow');
    },
  },
  updated() {
    if (this.expanded) {
      this.overflowContent.focus();
    }
  },
  data() {
    return {
      expanded: '',
    };
  },
};
</script>

