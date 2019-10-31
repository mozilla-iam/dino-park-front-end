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
.error__image {
  margin: 2em 0;
  text-align: center;
}
.error__image img {
  max-width: 80%;
}
.error__message > .button {
  margin: 4em 0;
  display: inline-flex;
}
@media (min-width: 57.5em) {
  .error {
    display: flex;
    margin: 4em;
  }
  .error__image {
    margin: 0;
  }
  .error__image img {
    max-width: none;
  }
  .error__image,
  .error__message {
    flex: 1;
  }
}
</style>
