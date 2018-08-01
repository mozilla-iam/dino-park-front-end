<template>
  <li class="relation">
    <h4 class="relation__type">{{ type }}</h4>
    <div class="relation__label">{{ label }}</div>
    <div class="relation__content"><slot></slot></div>
  </li>
</template>

<script>
export default {
  name: 'Relation',
  props: {
    type: String,
    label: String
  },
};
</script>


<style>
  .relation-list {
    padding: 0;
    margin: 0;
  }

  .relation {
    list-style: none;
    border: 1px solid var( --midGrey );
    padding: 1em;
  }
  .relation + .relation {
    margin-top: 1em;
  }
    .relation__type,
    .relation__label {
      display: inline;
      margin: 0;
    }
    .relation__type {
      margin-right: .5em;
    }
</style>
