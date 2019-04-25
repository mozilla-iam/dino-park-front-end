<template>
  <div class="banner">
    <p>
      This is a beta version,
      <a
        href="https://github.com/mozilla-iam/dino-park-issues/issues"
        target="_blank"
        rel="noopener noreferrer"
        >let us know what you think</a
      >.
    </p>
    <button @click="$emit('close')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Banner',
};
</script>

<style>
.banner {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  background-color: var(--blue-60);
  color: var(--white);
  text-align: center;
}
.banner a {
  color: var(--gray-10);
}
.banner a:hover {
  color: inherit;
}
.banner button {
  border: none;
  background: none;
}
.focus-styles .banner a:focus {
  box-shadow: 0px 0 0 1px var(--white), 0 0 0 3px var(--transparentWhite);
}
</style>
