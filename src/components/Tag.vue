<template>
  <span class="tag">{{ tag }}</span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    tag: String,
  },
};
</script>

<style>
  .tag {
    display: inline-block;
    vertical-align: top;
    margin-right: .5em;
    white-space: nowrap;
    padding: .5em 1em;
    background-color: var(--gray-10);
    border-radius: 2em;
    text-align: center;
    text-decoration: none;
    color: inherit;
  }
</style>
