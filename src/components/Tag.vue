<template>
  <a :href="'/search?tag=' + tag " class="tag">{{ tag }}</a>
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
        white-space: nowrap;
        padding: .5em 1em;
        background-color: var( --midGrey );
        border-radius: 2em;
        text-align: center;
        text-decoration: none;
    }
</style>
