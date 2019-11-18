<template>
  <div class="meta-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'MetaList',
};
</script>

<style>
.meta-list {
  margin: 2em 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7.5em, 1fr));
  grid-gap: 1em;
}
.edit-personal-info__meta .meta-list {
  grid-template-columns: auto;
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--gray-50);
}
.edit-personal-info__meta .meta-list dt {
  margin: 0.125em 0;
}
</style>
