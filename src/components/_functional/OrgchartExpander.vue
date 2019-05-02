<template>
  <div
    :class="
      'orgchart-expander' + (isExpanded ? ' orgchart-expander--expanded' : '')
    "
  >
    <button
      :class="
        'orgchart-expander__button ' + (buttonClass ? ' ' + buttonClass : '')
      "
      type="button"
      :aria-expanded="isExpanded ? 'true' : 'false'"
      :aria-label="isExpanded ? alternateButtonText || buttonText : buttonText"
      v-on:click="toggleOverflow"
      ref="button"
    >
      <template v-if="isExpanded">
        <slot name="icon-expanded"></slot>
      </template>
      <template v-else>
        <slot name="icon-collapsed"></slot>
      </template>
      <slot name="button-content"></slot>
    </button>
    <transition name="orgchart-expander__overflow-">
      <div
        :class="
          'orgchart-expander__overflow' +
            (isExpanded ? '' : ' orgchart-expander__overflow-hidden')
        "
        tabindex="-1"
        ref="overflowContentElement"
      >
        <slot name="overflow"> </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'OrgchartExpander',
  props: {
    buttonText: String,
    alternateButtonText: String,
    buttonClass: String,
    transition: Boolean,
    expanded: Boolean,
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
    buttonTextVisuallyHidden: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleOverflow() {
      this.isExpanded = !this.isExpanded;
    },
    handleDocumentClick(event) {
      if (this.$refs.button.contains(event.target)) {
        event.stopPropagation();
        return;
      }
      const expandedEl = this.$refs.overflowContentElement.firstElementChild;

      // closes overflow content if clicked anywhere, except the
      // overflowing content itself
      if (
        event.target !== expandedEl &&
        expandedEl.contains(event.target) === false &&
        this.isExpanded === true
      ) {
        this.isExpanded = false;
      }
    },
  },
  data() {
    return {
      isExpanded: this.expanded,
    };
  },
  watch: {
    expanded() {
      this.isExpanded = this.expanded;
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
};
</script>

<style>
.orgchart-expander {
  position: relative;
}
.orgchart-expander__button {
  font: inherit;
}
.orgchart-expander__button > svg,
.orgchart-expander__button > img {
  margin-right: 1.5em;
}
.orgchart-expander__button-text {
  font-size: 0.9em;
}
.orgchart-expander__overflow-hidden {
  display: none;
}
</style>
