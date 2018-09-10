<template>
  <button type="button" :class="'button' + ( modifier ? ' ' + modifier : '')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    modifier: String,
  },
};
</script>

<style>
.button {
  text-align: center;
  text-decoration: none;
  padding: .875em 3.5em;
  display: block;
  font-weight: 700;
  font-size: .75em;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 1.25em;
  background-color: var(--turqoise);
  color: var(--white);
  border: 1px solid transparent;
  transition: background-color .1s ease-in-out;
  appearance: none;
}

.button:hover {
  background-color: var(--white);
  color: var(--black);
  border-color: currentColor;
  text-decoration: none;
}

.button:focus {
  outline: none;
  outline: 0;
  background-color: var(--lightGrey);
  border-color: var(--lightGrey);
  color: var(--blue);
}

.button--secondary {
  border-color: var(--darkGrey);
  background-color: transparent;
  color: var(--black);
}

.button--secondary:hover {
  background-color: var(--black);
  color: var(--white);
  border-color: transparent;
}

.button--secondary:hover svg > path {
  fill: var(--white);
}

.button--secondary:active {
  background-color: transparent;
  border-color: var(--black);
  color: var(--black);
}

.button--text-only {
  background-color: transparent;
  border: 1px solid transparent;
  padding: .5em 1em;
}

.button--text-only:hover {
  background-color: transparent;
  color: var(--darkerGrey);
  border-color: transparent;
  text-decoration: underline;
  text-decoration-skip: ink;
}

.button--text-only:focus {
  outline: none;
  outline: 0;
  background-color: var(--lightGrey);
  border-color: var(--lightGrey);
  color: var(--blue);
}

.button--text-only:active {
  background-color: var(--black);
  color: var(--white);
  border-color: var(--black);
}

.button--full-width {
  width: 100%;
}

.button--icon-only {
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 100%;
  border-color: var(--midGrey);
}
.button--icon-only:hover {
  background-color: var(--lightGrey);
}
  .button--icon-only img {
    vertical-align: middle;
  }

.button img {
  vertical-align: middle;
}
</style>
