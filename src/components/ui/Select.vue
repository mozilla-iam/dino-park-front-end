<template>
  <div :class="'options' + (position && ` options--${position}`)" ref="options">
    <button
      @click="toggleOptions"
      @keydown.up.down.prevent="toggleOptions"
      type="button"
      ref="button"
      :title="selectedLabel"
      class="options__toggle"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-controls="`option-list-${id}`"
      :disabled="disabled"
    >
      <span class="visually-hidden">Open {{ label }}</span>
      <template v-if="collapsedShowLabel">{{ selectedLabel }}</template>
      <span v-else class="visually-hidden">{{ selectedLabel }}</span>
      <Icon
        v-if="collapsedShowIcon && selectedOption && selectedOption.icon"
        :id="selectedOption && selectedOption.icon"
        :width="17"
        :height="17"
      ></Icon>
    </button>
    <Popover v-if="open">
      <fieldset
        @keydown.enter.prevent="closeList"
        @keydown.esc="closeList"
        :id="`option-list-${id}`"
        :ref="`optionList-${id}`"
        class="options__list"
      >
        <legend class="visually-hidden">{{ label }}</legend>
        <ul>
          <Option
            v-for="(option, index) in options"
            :key="index"
            :groupId="id"
            :label="option.label"
            :value="option.value"
            :checked="option.value === value"
            :icon="option.icon"
            :id="`option-${id}-${index}`"
            :bind="{ expandedShowIcon, expandedShowLabel }"
            @input="$emit('input', $event)"
            @close-list="closeList"
          />
        </ul>
        <slot name="extra-content"></slot>
      </fieldset>
    </Popover>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import Option from './Option.vue';
import Popover from '@/components/ui/Popover.vue';

export default {
  name: 'Select',
  props: {
    label: String,
    id: String,
    value: String,
    options: Array,
    disabled: Boolean,
    collapsedShowIcon: {
      type: Boolean,
      default: false,
    },
    collapsedShowLabel: {
      type: Boolean,
      default: true,
    },
    expandedShowIcon: {
      type: Boolean,
      default: false,
    },
    expandedShowLabel: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Icon,
    Option,
    Popover,
  },
  methods: {
    toggleOptions() {
      if (this.open) {
        this.open = false;
      } else {
        this.open = true;

        this.$nextTick(() => {
          const list = this.$refs[`optionList-${this.id}`];
          const optionToFocus =
            list.querySelector('input:checked') || list.querySelector('input');

          if (optionToFocus) {
            optionToFocus.focus();
          }
        });
      }
    },
    closeList() {
      this.open = false;
    },
    handleDocumentClick(event) {
      const expandedEl = this.$refs.options;

      // closes overflow content if clicked anywhere, except the
      // overflowing content itself
      if (
        expandedEl &&
        event.target !== expandedEl &&
        expandedEl.contains(event.target) === false &&
        this.open === true
      ) {
        this.toggleOptions();
      }
    },
  },
  watch: {
    open() {
      if (this.open) {
        document.addEventListener('click', this.handleDocumentClick);
        document.addEventListener('touchstart', this.handleDocumentClick);
      } else {
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('touchstart', this.handleDocumentClick);
      }
    },
  },
  data() {
    return {
      open: false,
      position: '',
    };
  },
  computed: {
    selectedOption() {
      const { options, value } = this.$props;
      return options.find((o) => o.value === value) || options[0];
    },
    selectedLabel() {
      return this.selectedOption ? this.selectedOption.label : null;
    },
  },
};
</script>

<style>
.options {
  position: relative;
  display: inline-block;
  align-self: start;
}
.options__toggle {
  font-size: inherit;
  border: 0;
  padding: 0.5em 0.9em;
  border-radius: var(--imageRadius);
  border: 1px solid transparent; /* so that it doesn't grow when it gets a color on expanded */
  background-color: var(--gray-20);
}
.options__toggle:hover,
.options__toggle:focus {
  border-color: var(--blue-60);
}
.options--chevron .options__toggle {
  background-image: url('../../assets/images/chevron-down.svg');
  background-repeat: no-repeat;
  background-position: center right 0.75em;
  background-size: 1.25em;
  padding-right: 3em;
}
.options .options__toggle[disabled] {
  background-image: none;
  cursor: not-allowed;
  color: var(--black);
}
.options--chevron .options__toggle[disabled] {
  padding-right: 0.9em;
}
.options__toggle[aria-expanded='true'] {
  border: 1px solid var(--blue-60);
}
.options .options__list {
  padding: 0;
  margin: 0;
}
.options__list ul {
  margin: 0;
  padding-left: 0;
  max-height: 25em;
  overflow: auto;
}
.options__list > a {
  padding: 1em;
  display: block;
  color: var(--gray-50);
  position: relative;
  z-index: var(--layerTwo);
}
.options__option {
  list-style: none;
  background-color: var(--white);
  position: relative;
  text-decoration: none;
  color: inherit;
}
.options__option-icon {
  width: 2em;
  margin-right: 0.75em;
}
.options__option-checked {
  margin-left: auto;
  color: var(--blue-60);
}
.options input {
  position: absolute;
  opacity: 0;
}
.options li > label {
  padding: 0.75em 0.5em 0.75em 1em;
  margin: 0;
  display: flex;
  align-items: center;
}
.options li > label:hover {
  background-color: var(--lightBlue);
}
.focus-styles .options input:focus + label {
  position: relative;
  z-index: var(--layerTwo);
  box-shadow: var(--focusOutlineShadow);
}
.privacy-select {
  position: relative;
}
.privacy-select .options__toggle {
  padding: 0.5em;
  display: flex;
  align-content: center;
}
.privacy-select .options__toggle[disabled] {
  background-image: none;
  cursor: not-allowed;
  color: var(--gray-40);
  background-color: transparent;
  border-color: var(--gray-40);
  border-style: solid;
}
.privacy-select--large .options__toggle {
  background-color: white;
  border-color: var(--gray-50);
  padding: 1em 3em 1em 2em;
  color: var(--black);
  border-radius: 2.5em;
  background-image: url('../../assets/images/chevron-down.svg');
  background-repeat: no-repeat;
  background-position: center right 1em;
  background-size: 1.25em;
}
.privacy-select--blue .options__toggle {
  background-color: var(--blue-60);
  color: var(--white);
  border-color: transparent;
  background-image: url('../../assets/images/chevron-down-white.svg');
}
.privacy-select--large .options__toggle:not([disabled]):hover {
  background-color: var(--black);
  color: var(--white);
  border-color: transparent;
  background-image: url('../../assets/images/chevron-down-white.svg');
}
.privacy-select--blue .options__toggle:not([disabled]):hover {
  background-color: var(--white);
  border-color: var(--blue-60);
  color: var(--blue-60);
  background-image: url('../../assets/images/chevron-down-blue-60.svg');
}
.privacy-select--large .options__toggle svg {
  order: -1;
  margin: 0 0.5em 0 0;
}
.privacy-select a:hover {
  color: var(--blue-60);
  background-color: var(--lightBlue);
}
</style>
