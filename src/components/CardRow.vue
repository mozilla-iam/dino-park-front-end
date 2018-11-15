<template>
  <div class="card-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CardRow',
};
</script>


<style>
  .card-row {
    overflow-x: auto;
    max-width: 100%;
    white-space: nowrap;
    display: flex;
  }
    .card-row .card {
      display: inline-flex;
      flex-direction: column;
      margin-right: 2em;
      margin-bottom: 1em;
      width: 22.666em;
      flex: none;
      white-space: normal;
    }
</style>
