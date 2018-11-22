<template>
  <div :class="'show-more' + ( transition ? ' show-more--transition' : '')">
    <slot name="base">
    </slot>
    <transition v-if="overflowBefore" name="show-more__overflow-">
      <div class="show-more__overflow" v-if="expanded" tabindex="-1" ref="overflowContentElement">
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
     <transition v-if="overflowBefore === false" name="show-more__overflow-">
        <div class="show-more__overflow" v-if="expanded" tabindex="-1">
          <slot name="overflow">
          </slot>
        </div>
      </transition>
     </div>
</template>

<script>
export default {
  name: 'ShowMore',
  props: {
    buttonText: String,
    alternateButtonText: String,
    buttonClass: String,
    transition: Boolean,
    trace: String,
    prefix: String,
    closeWhenClickedOutside: {
      type: Boolean,
      default: false,
    },
    moveFocus: {
      type: Boolean,
      default: true,
    },
    overflowBefore: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toggleOverflow() {
      this.expanded = !this.expanded;
    },
    handleDocumentClick(event) {
      const expandedEl = this.$refs.overflowContentElement.firstElementChild;

      // closes overflow content if clicked anywhere, except the
      // overflowing content itself
      if (event.target !== expandedEl && expandedEl.contains(event.target) === false) {
        this.expanded = false;
      }
    },
  },
  watch: {
    trace() {
      if (this.trace || this.prefix) {
        this.expanded = this.trace.startsWith(`${this.prefix}-`) || this.expanded;
      }
      return this.expanded;
    },
  },
  updated() {
    const overflowContent = this.$refs.overflowContentElement;

    if (this.expanded && this.moveFocus) {
      overflowContent.focus();

      if (this.closeWhenClickedOutside) {
        document.addEventListener('click', this.handleDocumentClick);
      }
    } else if (this.closeWhenClickedOutside) {
      document.removeEventListener('click', this.handleDocumentClick);
    }
  },
  data() {
    const state = (this.trace && this.trace.startsWith(`${this.prefix}-`));
    return {
      expanded: state || (this.prefix && !this.prefix.includes('-')),
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
    .show-more__button {
      font: inherit;
    }
    .show-more__button > svg,
    .show-more__button > img {
      margin-right: 1.5em;
    }
    .show-more__button-text {
      font-size: .9em;
    }
    .show-more__button-text.contact-me__button {
      font-size: 1em;
    }
</style>

