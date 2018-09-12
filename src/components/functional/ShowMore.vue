<template>
  <div :class="'show-more' + ( transition ? ' show-more--transition' : '')">
    <slot name="base">
    </slot>
    <transition name="show-more__overflow-">
      <div class="show-more__overflow" v-if="expanded" tabindex="-1">
        <slot name="overflow">
        </slot>
      </div>
    </transition>
    <button
      :class="'show-more__button ' + ( buttonClass ? ' ' + buttonClass : '')"
      type="button"
      :aria-expanded="expanded ? 'true' : 'false'"
      v-on:click="toggleOverflow">
        <template v-if="expanded">
          <slot name="icon-expanded"></slot>
          <span class="show-more__button-text">{{ alternateButtonText }}</span>
        </template>
        <template v-else>
          <slot name="icon-collapsed"></slot>
          <span class="show-more__button-text">{{ buttonText }}</span>
        </template>
        <slot name="button-content"></slot>
      </button>
  </div>
</template>

<script>
export default {
  name: 'ShowMore',
  props: {
    buttonText: String,
    alternateButtonText: String,
    buttonClass: String,
    transition: String,
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

<style>
  .show-more {
    position: relative;
  }
  .show-more--transition .show-more__overflow--enter-active,
  .show-more--transition  .show-more__overflow--leave-active {
    transition: opacity .5s;
  }
  .show-more--transition .show-more__overflow--enter,
  .show-more--transition .show-more__overflow--leave-to {
    opacity: 0;
    z-index: 1;
  }
</style>

