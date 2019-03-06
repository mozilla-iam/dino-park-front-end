<template>
  <div class="options">
    <button
      @click="toggleOptions"
      @keydown.up.down.prevent="toggleOptions"
      type="button"
      :ref="`optionToggle-${id}`"
      :title="selectedLabel"
      class="options__toggle"
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
    <fieldset @keydown.enter.prevent="closeList">
      <legend class="visually-hidden">{{ label }}</legend>
      <ul class="options__list" v-show="open" :ref="`optionList-${id}`">
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
    </fieldset>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import Option from '@/components/Option.vue';

export default {
  name: 'Select',
  props: {
    label: String,
    id: String,
    value: String,
    options: Array,
    collapsedShowIcon: {
      type: Boolean,
      default: true,
    },
    collapsedShowLabel: {
      type: Boolean,
      default: true,
    },
    expandedShowIcon: {
      type: Boolean,
      default: true,
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
    },
    focusToggle() {
      const optionToggle = this.$refs[`optionToggle-${this.id}`];

      if (optionToggle) {
        this.$nextTick(() => {
          optionToggle.focus();
        });
      }
    },
  },
  data() {
    return {
      open: false,
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
}
.options--chevron .options__toggle {
  background-image: url('../assets/images/chevron-down.svg');
  background-repeat: no-repeat;
  background-position: center right 0.75em;
  background-size: 1.25em;
  padding-right: 3em;
}
.options__toggle {
  font-size: inherit;
  border: 0;
  padding: 0.5em 0.9em;
}
.options__list {
  padding-left: 0;
  max-height: 25em;
  background-color: var(--white);
  box-shadow: 0 0.125em 0.25em 0.125em rgba(210, 210, 210, 0.5);
  text-align: left;
  z-index: calc(var(--layerModal) - 1);
  position: absolute;
  top: 3.5em;
  left: 0;
  width: calc(100% + 4.5em);
  margin: 0 -2.25em;
  color: var(--gray-60);
}
@media (min-width: 57.5em) {
  .options__list {
    left: 50%;
    width: 24em;
    margin: 0 0.5em 0 -12em;
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
}
.options__option {
  list-style: none;
  background-color: var(--white);
  position: relative;
  text-decoration: none;
  color: inherit;
  min-width: 20em;
}
.options__option svg {
  width: 2em;
  margin-right: 0.75em;
}
.options fieldset {
  padding: 0;
  border: 0;
}
.options input {
  position: absolute;
  opacity: 0;
}
.options label {
  padding: 0.5em 1em;
  margin: 0;
  display: flex;
  align-items: center;
  padding-right: 3em;
}
.options input:checked + label {
  background-image: url('../assets/images/check.svg');
  background-repeat: no-repeat;
  background-position: center right 0.75em;
  background-size: 1.5em;
}
.options input:focus + label {
  position: relative;
  z-index: calc(var(--layerModal) - 1);
  box-shadow: 0px 0 0 1px var(--blue-60), 0 0 0 3px var(--transparentBlue);
}
</style>
