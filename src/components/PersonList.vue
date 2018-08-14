<template>
  <ul class="person-list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'Personlist',
};
</script>

<style>
  .person-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2em;
  }
</style>
