<template>
  <span class="tag">
    <Button
      class="button--icon-only button--text-only"
      v-if="removable"
      @click="$emit('removeTag')"
    >
      <Icon id="x" :width="16" :height="16"></Icon
      ><span class="visually-hidden">Remove {{ tag }}</span></Button
    >{{ tag }}</span
  >
</template>

<script>
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'Tag',
  props: {
    tag: String,
    removable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Button,
    Icon,
  },
};
</script>

<style>
.tag {
  display: inline-block;
  vertical-align: top;
  margin: 0 0.5em 0.5em 0;
  white-space: nowrap;
  padding: 1.1em;
  background-color: var(--gray-10);
  border-radius: 2em;
  text-align: center;
  text-decoration: none;
  color: inherit;
}
.tag button {
  border-color: transparent;
  background-color: transparent;
  display: inline-block;
  vertical-align: baseline;
  margin-right: 0.5em;
  color: var(--blue-60);
  padding: 0;
}
.tag button:hover {
  color: var(--black);
  background-color: transparent;
}
</style>
