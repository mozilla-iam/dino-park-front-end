<template>
  <nav class="dots">
    <span
      v-for="i in dots"
      :key="i"
      :class="['dots__dot', { 'dot--full': i == progress }]"
    >
    </span>
  </nav>
</template>

<script>
export default {
  name: 'ProgressDots',
  props: {
    dots: Number,
    progress: Number,
  },
};
</script>

<style>
.dots {
  width: fit-content;
  display: flex;
  min-height: 1.8em;
}
.dots__dot {
  height: 0.8em;
  width: 0.8em;
  border-radius: 50%;
  border-color: var(--blue-60);
  border-width: 0.1em;
  border-style: solid;
  display: inline-block;
  margin: auto 0.8em;
}

.dot--full {
  background-color: var(--blue-60);
}
</style>
