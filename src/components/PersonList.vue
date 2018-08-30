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
    max-width: 30em;
    margin: 0 auto;
  }
</style>
