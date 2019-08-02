<template>
  <span class="dino-type">
    <template v-if="size === 'small'">
      <Icon id="staff" :width="10" :height="10"></Icon>
      <span class="visually-hidden">Staff</span>
    </template>
    <template v-else
      >Staff</template
    >
  </span>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'DinoType',
  components: { Icon },
  props: {
    size: String,
  },
};
</script>

<style>
.dino-type {
  background-color: var(--black);
  color: var(--white);
}
</style>
