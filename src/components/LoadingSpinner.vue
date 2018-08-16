<template>
  <div class="loading">
    <img src="@/assets/images/loading.svg" alt="Loading…"  class="loading__spinner" />
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
};
</script>

<style>
  .loading__spinner {
    display: block;
    margin: 3em auto;
    width: 2em;
    animation: rotateSpinner 1.2s linear infinite;
    transform-origin: center;
  }

  @keyframes rotateSpinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(359deg);
    }
  }
</style>
