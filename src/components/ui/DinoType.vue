<template>
  <img src="@/assets/images/mozilla-m.svg" class="dino-type" alt="Staff" />
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
