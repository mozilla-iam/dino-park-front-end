<template>
  <div class="show-more">
    <slot name="base">
    </slot>
    <transition name="show-more__overflow-">
      <div class="show-more__overflow" v-if="expanded" tabindex="-1">
        <slot name="overflow">
        </slot>
      </div>
    </transition>
    <button 
      :class="'button button--secondary' + ( buttonModifier ? ' ' + buttonModifier : '')" 
      type="button" 
      :aria-expanded="expanded ? 'true' : 'false'" 
      v-on:click="toggleOverflow">
        <template v-if="expanded">
          <slot name="icon-expanded"></slot>
          {{ alternateButtonText }}
        </template>
        <template v-else>
          <slot name="icon-collapsed"></slot>
          {{ buttonText }}
        </template>
      </button>
  </div>
</template>

<script>
export default {
  name: 'ShowMore',
  props: {
    buttonText: String,
    alternateButtonText: String,
    buttonModifier: String,
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
  .show-more__overflow--enter-active,
  .show-more__overflow--leave-active {
    transition: opacity .5s;
  }
  .show-more__overflow--enter,
  .show-more__overflow--leave-to {
    opacity: 0;
  }
</style>

