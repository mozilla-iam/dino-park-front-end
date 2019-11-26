<template>
  <div class="meta-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MetaList',
};
</script>

<style>
.meta-list {
  margin: 2em 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7.5em, 1fr));
  grid-gap: 1em;
}
</style>
