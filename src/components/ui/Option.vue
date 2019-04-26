<template>
  <li class="options__option">
    <input
      type="radio"
      :name="groupId"
      :value="value"
      :id="id"
      :checked="checked"
      @input="select"
    />
    <label :for="id" @click="wasClicked = true">
      <Icon
        :id="icon"
        :width="17"
        :height="17"
        v-if="icon && expandedShowIcon"
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
  data() {
    return { wasClicked: false };
  },
  methods: {
    select($event) {
      if (!$event.target.checked) return;
      this.$emit('input', $event.target.value);

      if (this.wasClicked) {
        this.$emit('close-list');
        this.wasClicked = false;
      }
    },
  },
};
</script>
