<template>
  <div class="banner">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
};
</script>

<style>
.banner {
  background-color: var(--gray-60);
  color: var(--white);
  text-align: center;
}
@media (min-width: 57.5em) {
  .banner {
    padding: 0.5em;
  }
}
.banner a {
  color: var(--gray-10);
}
.banner a:hover {
  color: inherit;
}
.focus-styles .banner a:focus {
  box-shadow: 0px 0 0 1px var(--white), 0 0 0 3px var(--transparentWhite);
}
</style>
