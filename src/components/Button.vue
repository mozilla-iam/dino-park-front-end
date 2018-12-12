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
  padding: 1em 2em;
  display: block;
  font-family: inherit;
  font-size: .9em;
  letter-spacing: 0.05em;
  border-radius: 2.5em;
  background-color: var(--blue-60);
  color: var(--white);
  border: 1px solid transparent;
  transition: background-color .1s ease-in-out;
  -webkit-appearance: none;
  appearance: none;
}
.button:hover {
  background-color: var(--white);
  border: 1px solid var(--blue-60);
  color: var(--blue-60);
  text-decoration: none;
}
  .button img,
  .button svg {
    vertical-align: middle;
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
  color: var(--black);
}

.button--text-only {
  background-color: transparent;
  border-color: transparent;
  color: var(--black);
}

.button--text-only:hover {
  background-color: transparent;
  border-color: transparent;
  color: var(--blue-60);
}

.button--small {
  padding: .5em 1.5em;
  font-size: .9em;
}

.button--full-width {
  width: 100%;
}

.button--less-padding {
  padding: .5em 1em;
}

.button--icon-only {
  padding: .5em;
  border-color: var(--gray-30);
  border-radius: var(--cardRadius);
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
