<template>
  <section class="panel__section">
    <slot name="meta"></slot>
    <header class="panel__section-header">
      <h2>{{ title }}</h2>
      <slot name="header"></slot>
    </header>
    <div :class="{ 'panel__section-content': true, full: fullContent }">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PanelSection',
  props: {
    fullContent: {
      type: Boolean,
      default: false,
    },
    title: String,
  },
};
</script>

<style>
.panel__section {
  border: 4px solid var(--gray-50);
  background: var(--white);
  margin: 0 0 2em;
  grid-column: 2 / -1;
  overflow: visible;
  border-radius: var(--cardRadius);
  position: relative;
}

.panel__section.first {
  padding: 0;
}

.panel__section.first .panel__section-header {
  margin: 0 0 1.5em 0;
}
@supports (--key: value) {
  .panel__section {
    border: none;
    box-shadow: var(--shadowCard);
  }
}
.panel__section:first-child {
  grid-column: 1 / -1;
}

.panel__section .reporting-structure h3 {
  margin-top: 0;
}

.panel__section-header {
  padding: 1.5em;
  border-bottom: 1px solid var(--gray-30);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.panel__section-content.full {
  padding: 1.5em;
}

.panel__section-header h2 {
  margin: 0 0 0.75em 0;
  width: 100%;
}
@media (min-width: 35em) {
  .panel__section-header h2 {
    margin: 0;
    width: auto;
  }
}
</style>
