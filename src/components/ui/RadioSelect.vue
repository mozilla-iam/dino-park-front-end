<template>
  <div class="radio-select">
    <div
      class="radio-select__option"
      v-for="(radio, idx) in options"
      :key="idx"
      @click="(e) => handleRadioClicked(e, radio)"
    >
      <input
        type="radio"
        :name="radio.value"
        v-model="selectedRadio"
        :value="radio.value"
        class="radio-select__value"
      />
      <TextInput
        @focus="handleCustomInputFocus"
        @keypress="handleTextInputKeyPress"
        class="custom-value"
        v-if="optionIsCustom(radio)"
        v-model="customValue"
        type="number"
        :min="minCustom"
      />
      <label :for="radio.value">{{ radio.label }}</label>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import TextInput from '@/components/ui/TextInput.vue';

export default {
  name: 'RadioSelect',
  props: {
    options: Array,
    value: [String, Number],
    isCustom: Function,
    // TODO: update this if we ever want to put something here other than a number
    minCustom: {
      type: Number,
      default: null,
    },
  },
  methods: {
    emitChange(event) {
      this.$emit('input', event.target.checked);
    },
    handleRadioClicked(event, radioOption) {
      this.selectedRadio = radioOption.value;
      this.$emit('input', radioOption.value);
      event.stopPropagation();
    },
    handleCustomInputFocus() {
      this.selectedRadio = 'custom';
      this.$emit(
        'input',
        this.customValue === '' ? 'custom' : Number(this.customValue),
      );
    },
    handleTextInputKeyPress(event) {},
    optionIsCustom(option) {
      if (!this.isCustom) {
        return false;
      }
      return this.isCustom(option.value);
    },
  },
  watch: {
    selectedRadio(value) {
      if (value !== this.selectedRadio) {
        this.$emit('input', value);
      }
    },
    customValue(value) {
      this.$emit('input', Number(value));
    },
  },
  data() {
    let customValue = null;
    for (let i = 0, len = this.options.length; i < len; i += 1) {
      if (this.value === this.options[i].value) {
        customValue = this.value;
      }
    }
    return {
      customValue: customValue === null ? this.value : '',
      selectedRadio: customValue === null ? 'custom' : this.value,
    };
  },
  components: {
    Icon,
    TextInput,
  },
};
</script>

<style>
.radio-select {
  display: flex;
  flex-direction: row;
}

.radio-select .radio-select__value {
  display: inline-block;
  margin-right: 1em;
}

.radio-select .radio-select__option {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.radio-select .radio-select__option svg {
  margin-right: 0.5em;
  color: var(--blue-60);
}

.radio-select .radio-select__option .custom-value {
  width: 5em;
  margin-right: 0.5em;
}
</style>
