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
  margin: 1em 0;
  padding: 1em 0;
  border-top: 1px solid var(--gray-30);
  border-bottom: 1px solid var(--gray-30);
  overflow: hidden;
  display: flex;
  justify-content: space-between;
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
