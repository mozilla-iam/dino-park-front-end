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
  background-color: var(--blue-60);
  color: var(--white);
  border: 1px solid transparent;
  transition: background-color .1s ease-in-out;
  appearance: none;
}
.button:hover {
  background-color: var(--white);
  border: 1px solid var(--blue-60);
  color: var(--blue-60);
  text-decoration: none;
}
.button:focus {
  outline: none;
  outline: 0;
  background-color: var(--gray-20);
  border-color: var(--gray-20);
  color: var(--blue-60);
}
  .button img {
    vertical-align: middle;
    margin-right: .5em;
  }

.button--secondary {
  border-color: var(--gray-50);
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
  color: var(--black);
}

.button--text-only:hover {
  background-color: transparent;
  border-color: var(--gray-30);
  color: inherit;
}

.button--text-only:focus {
  outline: none;
  outline: 0;
  background-color: var(--gray-20);
  border-color: var(--gray-20);
  color: var(--blue-60);
}

.button--full-width {
  width: 100%;
}

.button--less-padding {
  padding: .5em 1em;
}

.button--icon-only {
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 100%;
  border-color: var(--gray-30);
}
.button--icon-only:hover {
  background-color: var(--gray-20);
}
  .button--icon-only img {
    vertical-align: middle;
    margin-right: 0;
  }

.button--icon-end {
  display: flex;
}
  .button--icon-end img,
  .button--icon-end svg {
    order: 10;
    margin-left: .75em;
    margin-right: 0;
  }

</style>
