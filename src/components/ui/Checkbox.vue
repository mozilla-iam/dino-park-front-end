<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="emitChange"
      class="visually-hidden"
    />
    <Icon v-if="checked" id="successSquare" :width="14" :height="14" />
    <Icon v-else id="square" :width="14" :height="14" />
    {{ label }}
  </label>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'Checkbox',
  props: {
    label: String,
    name: String,
    value: String,
    checked: Boolean,
    disabled: Boolean,
  },
  methods: {
    emitChange(event) {
      this.$emit('input', event.target.checked);
    },
  },
  components: {
    Icon,
  },
};
</script>

<style>
.checkbox {
  padding-left: 1.75em;
  position: relative;
}
.checkbox input + svg {
  color: var(--gray-50);
  position: absolute;
  top: 0.25em;
  left: 0;
}
.focus-styles .checkbox input:focus + svg {
  box-shadow: var(--focusOutlineShadow);
}
.checkbox input:checked + svg {
  color: var(--blue-60);
}
.checkbox input[disabled] + svg {
  color: var(--gray-30);
  cursor: not-allowed;
}
</style>
