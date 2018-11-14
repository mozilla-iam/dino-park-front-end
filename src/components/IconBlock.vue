<template>
  <li class="icon-block">
    <div v-if="heading" class="icon-block__heading">
      {{ heading }} <span v-if="subHeading">{{ subHeading }}</span>
    </div>
    <div v-if="icon" :class="`icon-block__icon icon-block__icon--${icon}`"></div>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'IconBlock',
  props: {
    heading: String,
    subHeading: String,
    icon: String,
  },
};
</script>

<style>
.icon-block {
  border: 1px solid var(--gray-30);
  padding: .5em;
  list-style: none;
  display: flex; /* avoid breaking between columns */
  flex-direction: column;
  margin-bottom: 1em;
  padding-left: 1.5em;
  position: relative;
}
  .icon-block__heading {
    font-size: .9em;
  }
  .icon-block__heading span {
    color: var(--gray-50);
    margin-left: .5em;
  }
  .icon-block__icon {
    width: 1.75em;
    height: 1.75em;
    background-color: var(--gray-30);
    position: absolute;
    left: -1em;
    top: 1em;
    border-radius: 100%;
  }
</style>
