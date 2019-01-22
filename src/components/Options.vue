<template>
  <div class="select">
    <button @click="toggleOptions" type="button">
      <span class="visually-hidden">{{ label }}</span>
      {{ this.currentLabel }}
    </button>
    <fieldset>
      <legend class="visually-hidden">{{ label }}</legend>
      <ul v-if="this.open">
        <Option v-for="(option, index) in options" :key="index" :groupId="label" :label="option.label" :value="option.value" :id="`option-${option.value}-${index}`" @option-picked="honourChoice" />
      </ul>
    </fieldset>
  </div>
</template>

<script>
import Option from '@/components/Option.vue';

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
  components: {
    Option,
  },
  methods: {
    toggleOptions() {
      this.open = !this.open;
    },
    honourChoice(data) {
      this.currentValue = data.value;
      this.currentLabel = data.label;
    },
  },
  data() {
    return {
      currentValue: '',
      currentLabel: '',
      open: false,
    };
  },
  created() {
    if (this.defaultToFirst) {
      this.currentLabel = this.options[0].label;
    }
  },
};
</script>

<style></style>
