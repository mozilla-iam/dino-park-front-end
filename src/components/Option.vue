<template>
  <li class="contact-me__item">
    <input type="radio" :name="groupId" :value="value" :id="id" v-model="currentValue" @change="emitChoice" @keydown.enter="emitCloseRequest">
    <label :for="id">
      <span v-if="expandedShowIcon" aria-hidden="true" role="presentation">{{ icon }}</span>
      <span v-if="expandedShowLabel">{{ label }}</span></label>
  </li>
</template>

<script>
export default {
  name: 'Option',
  props: {
    icon: String,
    label: String,
    groupId: String,
    value: String,
    id: String,
    expandedShowIcon: {
      type: Boolean,
      default: true,
    },
    expandedShowLabel: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    emitChoice() {
      this.$emit('option-picked', {
        label: this.label,
        value: this.currentValue,
        icon: this.icon,
      });
    },
    emitCloseRequest() {
      this.$emit('close-list');
    },
  },
  data() {
    return {
      currentValue: '',
    };
  },
};
</script>
