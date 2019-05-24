<template>
  <div
    :class="
      'show-more' +
        (transition ? ' show-more--transition' : '') +
        (isExpanded ? ' show-more--expanded' : '')
    "
  >
    <slot name="base"> </slot>
    <transition v-if="overflowBefore" name="show-more__overflow-">
      <div
        class="show-more__overflow"
        v-if="isExpanded"
        tabindex="-1"
        ref="overflowContentElement"
      >
        <slot name="overflow"> </slot>
      </div>
    </transition>
    <button
      :class="'show-more__button ' + (buttonClass ? ' ' + buttonClass : '')"
      type="button"
      :aria-expanded="isExpanded ? 'true' : 'false'"
      v-on:click="toggleOverflow"
      ref="button"
    >
      <template v-if="isExpanded">
        <slot name="icon-expanded"></slot>
        <span :class="`show-more__button-text${buttonTextClass}`">{{
          alternateButtonText || buttonText
        }}</span>
      </template>
      <template v-else>
        <slot name="icon-collapsed"></slot>
        <span :class="`show-more__button-text${buttonTextClass}`">{{
          buttonText
        }}</span>
      </template>
      <slot name="button-content"></slot>
    </button>
    <transition v-if="overflowBefore === false" name="show-more__overflow-">
      <div
        class="show-more__overflow"
        v-if="isExpanded"
        tabindex="-1"
        ref="overflowContentElement"
        @keyup.esc="toggleOverflow"
      >
        <slot name="overflow"> </slot>
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
    closeWhenClickedOutside: {
      type: Boolean,
      default: false,
    },
    closeOnUpdate: {
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
    buttonTextVisuallyHidden: {
      type: Boolean,
      default: false,
    },
    updateIndicator: String,
  },
  methods: {
    toggleOverflow() {
      this.isExpanded = !this.isExpanded;
    },
    handleDocumentClick(event) {
      if (this.$refs.button && this.$refs.button.contains(event.target)) {
        event.stopPropagation();
        return;
      }
      const expandedEl = this.$refs.overflowContentElement
        ? this.$refs.overflowContentElement.firstElementChild
        : null;

      // closes overflow content if clicked anywhere, except the
      // overflowing content itself or elements in the overflow content
      if (event.target !== expandedEl && !expandedEl.contains(event.target)) {
        this.isExpanded = false;
      }

      // if clicked on a link or button anywhere, close the overflow content
      // a delay is needed since otherwise links aren't followed
      if (event.target.tagName === 'A' || event.target.tagName === 'BUTTON') {
        setTimeout(() => {
          this.isExpanded = false;
        }, 100);
      }
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  watch: {
    updateIndicator(val, old) {
      if (this.closeOnUpdate && old && old !== val) {
        this.isExpanded = false;
      }
    },
  },
  computed: {
    buttonTextClass() {
      let buttonClass = '';

      if (this.buttonTextVisuallyHidden) {
        buttonClass = ' visually-hidden';
      }

      return buttonClass;
    },
  },
  updated() {
    const overflowContent = this.$refs.overflowContentElement;

    if (this.isExpanded && this.moveFocus) {
      overflowContent.focus();
    }

    if (this.isExpanded && this.closeWhenClickedOutside) {
      document.addEventListener('click', this.handleDocumentClick);
      document.addEventListener('touchstart', this.handleDocumentClick);
    } else if (this.closeWhenClickedOutside) {
      document.removeEventListener('click', this.handleDocumentClick);
      document.removeEventListener('touchstart', this.handleDocumentClick);
    }
  },
};
</script>

<style>
.show-more {
  position: relative;
}
.show-more--transition .show-more__overflow--enter-active,
.show-more--transition .show-more__overflow--leave-active {
  transition: opacity 0.5s;
}
.show-more--transition .show-more__overflow--enter,
.show-more--transition .show-more__overflow--leave-to {
  opacity: 0;
  z-index: var(--layerOne);
}
.show-more__button {
  font: inherit;
}
.show-more__button > svg,
.show-more__button > img {
  margin-right: 1.5em;
}
.show-more__button-text {
  font-size: 0.9em;
}
.show-more__button-text.contact-me__button {
  font-size: 1em;
}
.show-more a > *,
.show-more button > * {
  pointer-events: none;
}
</style>
