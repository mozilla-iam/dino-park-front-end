<template>
  <article :class="{ 'edit-panel-container': true, full: full }">
    <h3 class="edit-panel__header">{{ title }}</h3>
    <div class="edit-panel__content content-area">
      <slot name="content"></slot>
    </div>

    <footer class="edit-panel__footer" v-if="hasFooterSlot">
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'AccessGroupEditPanel',
  props: {
    title: String,
    full: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    hasFooterSlot() {
      return 'footer' in this.$slots;
    },
  },
};
</script>

<style>
.edit-panel-container {
  padding: 3em 2em 1em;
}

.edit-panel-container.full {
  padding: 3em 0 1em;
}

@media (min-width: 57.5em) {
  .edit-panel-container {
    width: 70%;
  }

  .edit-panel-container.full {
    width: 100%;
    padding: 3em 2em 1em;
  }
}

.edit-panel-container .edit-panel__header {
  font-size: 2em;
  font-weight: normal;
  text-transform: capitalize;
}

.edit-panel-container.full .edit-panel__header {
  margin-left: 1em;
}

@media (min-width: 57.5em) {
  .edit-panel-container.full .edit-panel__header {
    margin-left: 0;
  }
}

.edit-panel__content .content-area__row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 2em 0;
  align-items: center;
  position: relative;
}

.content-area__row.multi-line {
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
}

.edit-panel__footer {
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid var(--gray-40);
  margin-top: 2em;
}

.edit-panel__footer .row-primary-action {
  margin-top: 2em;
}

.edit-panel__footer .button--action[disabled='disabled'] {
  border: 1px solid var(--gray-40);
  color: var(--black);
  background: var(--white);
}

.content-area__row .content-area__label {
  color: var(--gray-40);
  height: 1.5em;
}

.content-area__row .radio-control {
  margin: 0 1em 0 0;
  color: var(--gray-40);
}
</style>
