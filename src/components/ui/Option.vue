<template>
  <li class="options__option">
    <input
      type="radio"
      :name="groupId"
      :value="value"
      :id="id"
      :checked="checked"
      @input="$event.target.checked && $emit('input', $event.target.value)"
    />
    <label :for="id" @click="$emit('close-list')">
      <Icon
        :id="icon"
        :width="17"
        :height="17"
        v-if="expandedShowIcon"
        aria-hidden="true"
        role="presentation"
      ></Icon>
      <span v-if="expandedShowLabel">{{ label }}</span></label
    >
  </li>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'Option',
  props: {
    icon: String,
    label: String,
    groupId: String,
    value: String,
    checked: Boolean,
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
  components: {
    Icon,
  },
};
</script>
