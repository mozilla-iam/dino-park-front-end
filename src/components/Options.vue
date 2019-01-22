<template>
  <div class="select">
    <button @click="toggleOptions" type="button">
      <span class="visually-hidden">{{ label }}</span>
      <span aria-hidden="true">{{ this.currentLabel }}</span>
    </button>
    <fieldset>
      <legend class="visually-hidden">{{ label }}</legend>
      <ul v-if="this.open">
        <li v-for="(option, index) in options" :key="index" :bind="label">
          <input type="radio" :name="label" :value="option.value" :id="`option-${option.value}-${index}`" v-model="currentValue" @change="updateCurrentLabel">
          <label :for="`option-${option.name}-${index}`">{{ option.label }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'Options',
  props: {
    label: String,
    options: Array,
    defaultToFirst: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleOptions() {
      this.open = !this.open;
    },
    updateCurrentLabel(foo) {
      console.log(foo);
    },
  },
  watch: {
    currentValue() {
      this.currentValue = this.currentLabel;
    }
  },
  data() {
    return {
      currentValue: '',
      open: false,
    };
  },
  created() {
    if (this.defaultToFirst) {
      this.currentValue = this.options[0].value;
    }
  },
};
</script>

<style></style>
