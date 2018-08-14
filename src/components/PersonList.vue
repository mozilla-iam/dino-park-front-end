<template>
  <div class="person-list">
    <slot></slot>
  </div>
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
