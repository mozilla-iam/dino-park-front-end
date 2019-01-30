<template>
  <li class="options__option">
    <input type="radio" :name="groupId" :value="value" :id="id" v-model="currentValue" @change="emitChoice">
    <label :for="id" @click="$emit('close-list')">
      <Icon :id="icon" :width="24" :height="24" v-if="expandedShowIcon" aria-hidden="true" role="presentation"></Icon>
      <span v-if="expandedShowLabel">{{ label }}</span></label>
  </li>
</template>

<script>
import Icon from '@/components/Icon.vue';

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
  },
  components: {
    Icon,
  },
  },
  data() {
    return {
      currentValue: '',
    };
  },
};
</script>
