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
  background-color: rgb(186, 240, 231);
  text-decoration: none;
}
.button:focus {
  outline: none;
  outline: 0;
  background-color: var(--lightGrey);
  border-color: var(--lightGrey);
  color: var(--blue);
}
  .button img {
    vertical-align: middle;
    margin-right: .5em;
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
  color: var(--black);
}

.button--text-only:hover {
  background-color: transparent;
  border-color: var(--midGrey);
  color: inherit;
}

.button--text-only:focus {
  outline: none;
  outline: 0;
  background-color: var(--lightGrey);
  border-color: var(--lightGrey);
  color: var(--blue);
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
    margin-right: 0;
  }

.button--icon-end {
  display: flex;
}
  .button--icon-end img {
    order: 10;
    margin-left: .5em;
    margin-right: 0;
  }

.button img {
  vertical-align: middle;
  margin-right: .5em;
}
</style>
