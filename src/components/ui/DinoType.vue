<template>
  <span class="dino-type">
    <template v-if="size === 'small'">
      <span aria-hidden="true">S</span>
      <span class="visually-hidden">Staff</span>
    </template>
    <template v-else
      >Staff</template
    >
  </span>
</template>

<script>
export default {
  name: 'DinoType',
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
