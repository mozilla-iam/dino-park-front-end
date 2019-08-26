<template>
  <span v-bind:class="{ 'dino-type': true, small: size === 'small' }">
    <template v-if="size === 'small'">
      <Icon id="staff" :width="15" :height="15"></Icon>
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

.dino-type.small {
  background-color: var(--white);
  padding: 0;
  width: 15px;
  height: 15px;
}
</style>
