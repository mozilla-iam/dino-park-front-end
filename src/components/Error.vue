<template>
  <div class="error">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Error',
};
</script>

<style>
  .error {
    border: 1px solid red;
    padding: 1em;
    margin-bottom: 1em;
  }
    .error p {
      margin: 0;
    }
    .error p + p {
      margin-top: 1em;
    }
</style>
