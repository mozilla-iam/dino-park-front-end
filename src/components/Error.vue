<template>
  <div class="error">
    <div class="error__image">
      <slot name="image"></slot>
    </div>
    <div class="error__message">
      <slot name="message"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
};
</script>

<style>
@media (min-width: 57.5em) {
  .error {
    display: flex;
    margin: 4em;
  }
    .error__image,
    .error__message {
      flex: 1;
    }
    .error__message > .button {
      margin: 4em 0;
      display: inline-block;
    }
}
</style>
