<template>
  <li class="relation">
    <h3 class="relation__category">{{ category }}</h3>
    <div class="relation__label">{{ label }}</div>
    <div class="relation__content"><slot></slot></div>
  </li>
</template>

<script>
export default {
  name: 'Relation',
  props: {
    category: String,
    label: String,
  },
};
</script>


<style>
  .relation-list {
    padding: 0;
    margin: 0 0 2em 0;
  }

  .relation {
    list-style: none;
    border: 1px solid var(--gray-30);
    padding: 1em;
  }
  .relation + .relation {
    margin-top: 1em;
  }
    .relation__category,
    .relation__label {
      display: inline;
      margin: 0;
    }
    .relation__category {
      margin-right: .5em;
      font-size: 1em;
      font-weight: 400;
    }
    .relation__label {
      color: var(--gray-50);
    }
    .relation__content {
      color: var(--gray-50);
    }
</style>
