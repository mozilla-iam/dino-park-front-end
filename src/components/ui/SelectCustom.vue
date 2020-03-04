<template>
  <div class="select-custom">
    <Select
      class="options--chevron select-custom__primary"
      :options="selectOptions"
      v-model="selectedValue"
    />
    <NumberScrollerInput
      v-if="customEnabled"
      class="select-custom__secondary"
      v-model="inputValue"
    />
    <p v-if="customEnabled" class="select-custom__secondary-units">
      {{ customUnits }}
    </p>
  </div>
</template>

<script>
import Select from '@/components/ui/Select.vue';
import NumberScrollerInput from '@/components/ui/NumberScrollerInput.vue';

export default {
  name: 'SelectCustom',
  components: { Select, NumberScrollerInput },
  props: {
    options: Array,
    value: Number,
    isCustom: Function,
    customUnits: String,
  },
  watch: {
    selectedValue(value) {
      if (this.isCustom(value)) {
        this.customEnabled = true;
      } else {
        this.customEnabled = false;
        if (typeof value === 'string') {
          this.$emit('input', parseInt(value));
        } else {
          this.$emit('input', value);
        }
      }
    },
    inputValue(value) {
      this.$emit('input', value);
    },
  },
  computed: {
    selectOptions() {
      return this.options.map((option, idx) => ({
        ...option,
        value:
          typeof option.value !== 'string'
            ? option.value.toString()
            : option.value,
      }));
    },
  },
  data() {
    return {
      customEnabled: false,
      selectedValue:
        typeof this.value !== 'string' ? this.value.toString() : this.value,
      inputValue: this.value,
    };
  },
};
</script>

<style>
.select-custom {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.select-custom .select-custom__primary {
  margin-right: 1em;
}

.select-custom .select-custom__secondary {
  margin-right: 1em;
}

.select-custom .options {
  align-self: initial;
}

.select-custom .options button.options__toggle {
  height: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  box-sizing: content-box;
  border: none;
}

.select-custom__secondary-units {
  color: var(--gray-40);
  margin: 0;
}
</style>
