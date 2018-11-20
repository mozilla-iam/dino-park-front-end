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
    position: relative;
  }
  .card--centered-content {
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: transparent;
    border: 1px solid var(--gray-30);
    box-shadow: none;
  }
    .card h2 {
      font-weight: 700;
      font-size: 1.25em;
    }
    .card h2 > a {
      color: inherit;
      text-decoration: none;
      display: inline;
      border-bottom: 2px solid transparent;
      transition: border-bottom-color .1s ease-in-out;
    }
    .card h2 > a::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: box-shadow  .1s ease-in-out;
    }
    .card h2 > a:hover,
    .card h2 > a:focus {
      border-bottom: 2px solid var(--black);
    }
    .card h2 > a:hover::after,
    .card h2 > a:focus::after {
      box-shadow: 0 0 0 4px var(--gray-30);
    }
    .card__icon {
      padding: 4em;
      background-color: var(--lightBlue);
      display: flex;
      align-content: center;
      justify-content: center;
      margin: -1em -1em 1em;
    }
    .card h2 + p {
      margin-top: 0;
    }
    .card img + h2 {
      margin-top: 1em;
    }
</style>
