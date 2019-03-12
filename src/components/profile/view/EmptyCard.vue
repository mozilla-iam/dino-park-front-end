<template>
  <section class="profile__section profile__section--disabled">
    <header class="profile__section-header">
      <h2>{{ title }}</h2>
    </header>
    <slot></slot>
    <p>{{ message }}</p>
  </section>
</template>

<script>
export default {
  name: 'EmptyCard',
  props: {
    title: String,
    message: String,
  },
};
</script>

<style>
.profile__section--disabled {
  background-color: var(--gray-20);
  color: var(--gray-50);
  border: 2px solid var(--gray-30);
}
</style>
