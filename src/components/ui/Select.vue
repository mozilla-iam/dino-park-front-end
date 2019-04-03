<template>
  <div
    :class="'options' + (position ? ' ' + `options--${position}` : '')"
    ref="options"
  >
    <button
      @click="toggleOptions"
      @keydown.up.down.prevent="toggleOptions"
      type="button"
      :ref="`optionToggle-${id}`"
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
    <fieldset
      @keydown.enter.prevent="closeList"
      v-show="open"
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
  </div>
</template>

<script>
import Icon from './Icon.vue';
import Option from './Option.vue';

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
  },
  methods: {
    toggleOptions() {
      if (this.open) {
        this.open = false;
      } else {
        const list = this.$refs[`optionList-${this.id}`];
        const optionToFocus =
          list.querySelector('input:checked') || list.querySelector('input');

        this.open = true;

        if (optionToFocus) {
          this.$nextTick(() => {
            optionToFocus.focus();
          });
        }
      }
    },
    closeList() {
      this.open = false;
      this.focusToggle();

      // document.removeEventListener('click', this.handleDocumentClick);
      // document.removeEventListener('touchstart', this.handleDocumentClick);
    },
    focusToggle() {
      const optionToggle = this.$refs[`optionToggle-${this.id}`];

      if (optionToggle) {
        this.$nextTick(() => {
          optionToggle.focus();
        });
      }
    },
    handleDocumentClick(event) {
      const expandedEl = this.$refs.options;

      // closes overflow content if clicked anywhere, except the
      // overflowing content itself
      if (
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
  mounted() {
    const optionToggle = this.$refs[`optionToggle-${this.id}`];
    const { left: spaceOnLeft, right } = optionToggle.getBoundingClientRect();
    const spaceOnRight =
      document.scrollingElement.getBoundingClientRect().width - right;

    if (spaceOnRight > 300) {
      this.position = 'right';
    } else if (spaceOnLeft > 300) {
      this.position = 'left';
    } else {
      this.position = '';
    }
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
}
.options__toggle {
  font-size: inherit;
  border: 0;
  padding: 0.5em 0.9em;
  border-radius: var(--imageRadius);
  border: 1px solid transparent; /* so that it doesn't grow when it gets a color on expanded */
  background-color: var(--gray-20);
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
  background-color: var(--white);
  box-shadow: 0 0.125em 0.25em 0.125em rgba(210, 210, 210, 0.5);
  text-align: left;
  z-index: calc(var(--layerModal) - 1);
  position: absolute;
  top: 3em;
  left: 0;
  width: calc(100% + 4.5em);
  margin: 0 -2.25em;
  color: var(--gray-60);
  border-radius: var(--imageRadius);
  border: 2px solid var(--gray-30);
}
@media (min-width: 57.5em) {
  .options .options__list {
    min-width: 18em;
    margin: 0 0.5em;
    transform: translateX(calc(-50% + 0.5em));
  }
}
.options__list::before {
  content: '';
  width: 1em;
  height: 1em;
  background-color: var(--white);
  position: absolute;
  left: 50%;
  margin-left: -0.5em;
  margin-top: -0.5em;
  transform: rotate(-45deg);
  box-shadow: 0 0 0.25em 0 var(--gray-30);
  border: inherit;
  border-radius: inherit;
}
.options--left .options__list {
  transform: translateX(calc(-100% + 5em));
}
.options--left .options__list::before {
  left: auto;
  right: 1em;
}
.options--right .options__list {
  transform: translateX(calc(-1.5em));
}
.options--right .options__list::before {
  left: 2em;
}
@media (min-width: 57.5em) {
  .options--left .options__list {
    transform: translateX(calc(-100% + 2.5em));
  }
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
  z-index: var(--layerTopbar);
}
.options__option {
  list-style: none;
  background-color: var(--white);
  position: relative;
  text-decoration: none;
  color: inherit;
}
.options__option svg {
  width: 2em;
  margin-right: 0.75em;
}
.options input {
  position: absolute;
  opacity: 0;
}
.options label {
  padding: 0.75em 1em;
  margin: 0;
  display: flex;
  align-items: center;
  padding-right: 3em;
}
.options label:hover {
  background-color: var(--lightBlue);
}
.options input:checked + label {
  background-image: url('../../assets/images/check-blue.svg');
  background-repeat: no-repeat;
  background-position: center right 0.75em;
  background-size: 1.5em;
}
.focus-styles .options input:focus + label {
  position: relative;
  z-index: calc(var(--layerModal) - 1);
  box-shadow: 0px 0 0 1px var(--blue-60), 0 0 0 3px var(--transparentBlue);
}
</style>
