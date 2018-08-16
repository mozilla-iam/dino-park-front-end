<template>
  <div class="show-more">
    <slot name="base">
    </slot>
    <div class="show-more__overflow" v-if="expanded" tabindex="-1">
      <slot name="overflow">
      </slot>
    </div>
    <button class="button button--secondary" type="button" :aria-expanded="expanded ? 'true' : 'false'" v-on:click="toggleOverflow">{{ expanded ? alternateButtonText : buttonText }}</button>
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
  updated() {
    const overflowContent = this.$el.querySelector('.show-more__overflow');

    if (this.expanded) {
      overflowContent.focus();
    }
  },
  data() {
    return {
      expanded: '',
    };
  },
};
</script>

