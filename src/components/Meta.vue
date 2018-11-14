<template>
  <dl class="meta-list__item">
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
  .meta-list__item {
    width: 50%;
    float: left;
    margin: 0 0 1em;
  }

  .meta-list__item dt {
    text-transform: uppercase;
    color: var(--gray-50);
    font-weight: 700;
    letter-spacing: 0.025em;
    font-size: .9em;
  }

  .meta-list__item dd {
    margin-left: 0;
  }

  @supports(display: grid) {
    .meta__list--item {
      width: auto;
    }
  }
</style>
