<template>
  <div>
    <div class="expiration-select">
      <div
        class="expiration-select__option"
        v-for="(radio, idx) in options"
        :key="idx"
        @click="(e) => handleRadioClicked(e, radio)"
      >
        <input
          type="radio"
          :name="radio.value"
          v-model="selectedRadio"
          :value="radio.value"
          class="input--w-error expiration-select__value"
        />
        <TextInput
          @focus="handleCustomInputFocus"
          class="custom-value"
          v-if="optionIsCustom(radio)"
          v-model="customValue"
          type="number"
          :min="customSelected(radio) ? minCustom : null"
          :max="customSelected(radio) ? maxCustom : null"
          :infoMsg="infoMsg"
          :required="customSelected(radio)"
          :highlightError="highlightError"
        />
        <label :for="radio.value">{{ radio.label }}</label>
      </div>
    </div>
    <span class="expiration-select__info">{{
      fluent('access-group_expiration', 'custom-expiration-info')
    }}</span>
  </div>
</template>

<script>
import TextInput from '@/components/ui/TextInput.vue';
import {
  MEMBER_EXPIRATION_ONE_YEAR,
  MEMBER_EXPIRATION_TWO_YEARS,
} from '@/view_models/AccessGroupViewModel';

export default {
  name: 'ExpirationSelect',
  props: {
    value: [String, Number],
    infoMsg: {
      type: String,
      default: '',
    },
    highlightError: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitChange(event) {
      this.$emit('input', event.target.checked);
    },
    handleRadioClicked(event, radioOption) {
      this.selectedRadio = radioOption.value;
      if (this.optionIsCustom(radioOption)) {
        this.$emit('input', Number(this.customValue));
      } else {
        this.$emit('input', radioOption.value);
      }
      event.stopPropagation();
    },
    handleCustomInputFocus() {
      this.selectedRadio = 'custom';
      this.$emit(
        'input',
        this.customValue === '' ? 'custom' : Number(this.customValue),
      );
    },
    optionIsCustom(option) {
      return option.value === 'custom';
    },
    customSelected(radioOption) {
      return this.selectedRadio === radioOption.value;
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
    const options = [
      {
        label: this.fluent('access-group_expiration', 'one-year'),
        value: MEMBER_EXPIRATION_ONE_YEAR,
      },
      {
        label: this.fluent('access-group_expiration', 'two-years'),
        value: MEMBER_EXPIRATION_TWO_YEARS,
      },
      {
        label: this.fluent('access-group_expiration', 'custom'),
        value: 'custom',
      },
    ];
    for (let i = 0, len = options.length; i < len; i += 1) {
      if (this.value === options[i].value) {
        customValue = this.value;
      }
    }
    return {
      customValue: customValue === null ? this.value : '',
      selectedRadio: customValue === null ? 'custom' : this.value,
      minCustom: 1,
      maxCustom: 730,
      options,
    };
  },
  components: {
    TextInput,
  },
};
</script>

<style>
.expiration-select {
  display: flex;
  flex-direction: column;
  padding-left: 2.5em;
}
@media (min-width: 35em) {
  .expiration-select {
    flex-direction: row;
    padding-left: 0;
  }
}

.expiration-select .expiration-select__value {
  display: inline-block;
  margin-right: 1em;
}

.expiration-select .expiration-select__option {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1em;
}

.expiration-select .expiration-select__option svg {
  margin-right: 0.5em;
  color: var(--blue-60);
}

.expiration-select .expiration-select__option .custom-value {
  width: 5em;
  margin-right: 0.5em;
}

.expiration-select__info {
  color: var(--gray-50);
  padding: 0em 1em;
  font-size: small;
  display: inline-block;
}
</style>
