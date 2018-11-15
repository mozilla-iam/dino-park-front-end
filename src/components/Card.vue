<template>
  <div :class="'card' + ( modifier ? ' ' + modifier : '')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    modifier: String,
  },
};
</script>


<style>
  .card {
    background-color: var(--white);
    box-shadow: var(--shadowCard);
    padding: 1em;
  }
  .card--centered-content {
    align-items: center;
    justify-content: center;
    text-align: center;
  }
    .card > a {
      color: inherit;
      text-decoration: none;
    }
</style>
