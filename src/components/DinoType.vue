<template>
  <span class="dino-type">
    <template v-if="size === 'small'">
      <span aria-hidden="true">{{ type[0] }}</span>
      <span class="visually-hidden">{{ type }}</span>
    </template>
    <template v-else>{{ type }}</template>
  </span>
</template>

<script>
export default {
  name: 'DinoType',
  props: {
    type: String,
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
