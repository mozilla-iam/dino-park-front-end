<template>
  <div class="loading">
    <svg aria-labelledby="loading__spinner__title" class="loading__spinner" width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#000">
      <title id="loading__spinner__title">Loading...</title>
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
          <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
          </path>
        </g>
      </g>
    </svg>
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
