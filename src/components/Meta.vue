<template>
  <dl class="meta__item">
    <dt>{{ metaKey }}</dt>
    <dd>{{ metaValue }}</dd>
  </dl>
</template>

<script>
export default {
  name: 'Meta',
  props: {
    metaKey: String,
    metaValue: String,
  },
};
</script>


<style>
.meta {
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat( 3, 1fr );
}
  .meta__item {
    width: 50%;
    float: left;
    margin: 0 0 1em;
  }

  .meta dt {
    text-transform: uppercase;
    color: var( --darkGrey );
    font-weight: 700;
    font-size: 90%;
    letter-spacing: 0.0 25em;
  }

  .meta dd {
    margin-left: 0;
  }
</style>
