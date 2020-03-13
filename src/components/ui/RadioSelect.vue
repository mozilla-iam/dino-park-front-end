<template>
  <div class="radio-select">
    <div
      class="radio-select__option"
      v-for="(radio, idx) in options"
      :key="idx"
    >
      <input
        type="checkbox"
        :name="radio.value"
        v-model="selectedRadio"
        :value="radio.value"
        class="visually-hidden"
      />
      <Icon
        v-if="radio.value !== selectedRadio"
        id="circle"
        :width="20"
        :height="20"
        @click="() => handleRadioClicked(radio)"
      />
      <Icon v-else id="circle-fill" :width="20" :height="20" />
      <TextInput
        @focus="handleCustomInputFocus"
        class="custom-value"
        v-if="optionIsCustom(radio)"
        v-model="customValue"
      />
      <label :for="radio.value">{{ radio.label }}</label>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import TextInput from '@/components/ui/TextInput.vue';

export default {
  name: 'Checkbox',
  props: {
    options: Array,
    value: [String, Number],
    isCustom: Function,
  },
  methods: {
    emitChange(event) {
      this.$emit('input', event.target.checked);
    },
    handleRadioClicked(radioOption) {
      this.selectedRadio = radioOption.value;
      this.$emit('input', radioOption.value);
    },
    handleCustomInputFocus() {
      this.selectedRadio = 'custom';
      this.$emit(
        'input',
        this.customValue === '' ? 'custom' : this.customValue
      );
    },
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
      this.$emit('input', value);
    },
  },
  data() {
    return {
      selectedRadio: this.value,
      customValue: '',
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
