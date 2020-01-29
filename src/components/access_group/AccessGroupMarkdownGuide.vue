<template>
  <aside class="markdown-guide-container">
    <h4
      :class="{ 'markdown-guide__header': true, collapsed }"
      @click="toggleCollapsed"
    >
      <span class="markdown-arrow"></span>Markdown Quick Guide
    </h4>
    <div class="markdown-guide__content" v-if="!collapsed">
      <div class="markdown-guide__row">
        <p class="explanation">**Bold text**</p>
        <p class="bold-example">Bold text</p>
      </div>
      <div class="markdown-guide__row">
        <p class="explanation">__Italicized text__</p>
        <p class="italicized-example">Italicized text</p>
      </div>
      <div class="markdown-guide__row">
        <p class="explanation">[Web link](https://www.mozilla.org/)</p>
        <p class="link-example">
          <a href="#">Web link</a>
        </p>
      </div>
      <div class="markdown-guide__row">
        <p class="explanation list">
          <span>- First item</span>
          <span>- Second item</span>
          <span>- Third item</span>
        </p>
        <ul class="list-example">
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AccessGroupMarkdownGuide',
  components: {},
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
  data() {
    return {
      collapsed: this.isCollapsed,
    };
  },
};
</script>

<style>
.markdown-guide-container {
  background: #f2fcfd;
  border: 1px solid #ddedfd;
  border-radius: var(--formElementRadius);
}

.markdown-guide-container .markdown-guide__header {
  padding: 1em;
  border-bottom: 1px solid #ddedfd;
  font-weight: normal;
  display: flex;
  align-items: center;
  margin-bottom: 0;
  cursor: pointer;
}

.markdown-guide__header .markdown-arrow {
  border-left: 0.5em solid transparent;
  border-right: 0.5em solid transparent;
  border-top: 0.7em solid var(--black);
  margin-right: 1.2em;
}

.markdown-guide__header.collapsed {
  border-bottom: none;
}

.markdown-guide__header.collapsed .markdown-arrow {
  border-top: 0.5em solid transparent;
  border-bottom: 0.5em solid transparent;
  border-left: 0.7em solid var(--black);
  margin-right: 1em;
}

.markdown-guide__content p {
  margin: 0;
  color: var(--gray-40);
}

.markdown-guide__content .markdown-guide__row {
  margin-bottom: 1em;
}

.markdown-guide__row .bold-example {
  font-weight: bold;
  color: var(--black);
}

.markdown-guide__row .italicized-example {
  font-style: italic;
  color: var(--black);
}

.markdown-guide__row .explanation.list {
  margin-bottom: 0.5em;
}

.markdown-guide__row .explanation.list > span {
  display: block;
}
.markdown-guide__row .list-example {
  margin: 0;
  padding-left: 1em;
  color: var(--black);
}

.markdown-guide-container .markdown-guide__content {
  padding: 1em;
}

@media (min-width: 35em) {
}
</style>
