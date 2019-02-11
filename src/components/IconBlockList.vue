<template>
  <ul :class="'icon-block-list ' + (modifier ? ' ' + modifier : '')">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'IconBlockList',
  props: {
    modifier: String,
  },
};
</script>

<style>
.icon-block-list {
  padding-left: 1em;
}
@media (min-width: 50em) {
  .icon-block-list--multi-col {
    columns: 2;
    column-gap: 2em;
  }
}
</style>
