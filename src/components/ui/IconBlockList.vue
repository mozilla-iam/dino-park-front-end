<template>
  <ul class="icon-block-list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'IconBlockList',
};
</script>

<style>
.icon-block-list {
  padding-left: 0em;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 2em;
  grid-row-gap: 1em;
}
@media (min-width: 50em) {
  .icon-block-list {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
