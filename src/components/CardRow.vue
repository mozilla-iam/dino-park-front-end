<template>
  <div class="card-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CardRow',
};
</script>


<style>
  .card-row {
    overflow-x: auto;
    max-width: 100%;
    max-width: calc(100vw - 2em);
    white-space: nowrap;
    display: flex;
    padding-top: .25em; /* allow for box shadow */
    padding-left: .25em;
    margin-top: -.25em;
    margin-left: -.25em;
  }
    .card-row .card {
      display: inline-flex;
      flex-direction: column;
      margin-right: 2em;
      margin-bottom: 1em;
      width: 75vw;
      flex: none;
      white-space: normal;
    }
    @media (min-width: 50em) {
      .card-row .card {
        width: 22.666em;
      }
    }
</style>
