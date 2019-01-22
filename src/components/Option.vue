<template>
  <li>
    <input type="radio" :name="groupId" :value="value" :id="id" v-model="currentValue" @change="emitChoice">
    <label :for="id">{{ label }}</label>
  </li>
</template>

<script>
export default {
  name: 'Option',
  props: {
    label: String,
    groupId: String,
    value: String,
    id: String,
  },
  methods: {
    emitChoice() {
      this.$emit('option-picked', {
        label: this.label,
        value: this.currentValue,
      });
    },
  },
  data() {
    return {
      currentValue: '',
    }
  },
};
</script>
