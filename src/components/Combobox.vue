<template>
  <div class="combobox">
    <input
      type="text"
      :id="id"
      class="combobox__input"
      ref="comboboxInput"
      :value="value"
      :placeholder="placeholder"
      @keydown="checkInput"
      @input="$emit('input', $event.target.value)"
      autocomplete="off"
    />
    <ul v-if="source" class="combobox__options" ref="comboboxList">
      <li
        v-for="(option, index) in source"
        :key="index"
        class="combobox__option"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
import Combobo from 'combobo';

export default {
  name: 'Combobox',
  props: {
    id: String,
    source: Array,
    value: String,
    allowCustomInput: {
      type: Boolean,
      default: true,
    },
    placeholder: String,
  },
  methods: {
    init() {
      const { comboboxInput, comboboxList } = this.$refs;

      this.combobo = new Combobo({
        input: comboboxInput,
        list: comboboxList,
        options: this.optionEls,
        activeClass: 'combobox__option--selected',
      });

      this.combobo.addEventListener('selection', () => {
        this.$nextTick(() => {
          this.$emit('input', this.$refs.comboboxInput.value);
        });
      });
    },
    checkInput(e) {
      const alwaysAllowed = ['Tab', 'Enter', 'Escape', 'Shift', 'Backspace'];

      if (alwaysAllowed.includes(e.key)) {
        return;
      }

      if (!this.allowCustomInput) {
        e.preventDefault();
      }
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      combobo: null,
    };
  },
  computed: {
    optionEls() {
      return Array.from(
        this.$refs.comboboxList.querySelectorAll('.combobox__option'),
      );
    },
  },
};
</script>

<style>
.combobox__input[aria-expanded='false'] + .combobox__options {
  display: none;
}
.combobox__input[aria-expanded='true'] + .combobox__options {
  display: block;
}
.combobox {
  position: relative;
}
.combobox__options {
  padding-left: 0;
  width: 100%;
  position: absolute;
  top: 3em;
  margin: 0;
  background-color: var(--white);
  box-shadow: 0 0 0.25em 0 var(--gray-30);
}
.combobox__option {
  list-style: none;
  padding: 0.5em 1em;
}
.combobox__option--selected {
  background-color: var(--blue-60);
  color: var(--white);
}
</style>
