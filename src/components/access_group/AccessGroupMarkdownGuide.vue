<template>
  <aside class="markdown-guide-container">
    <h4
      :class="{ 'markdown-guide__header': true, collapsed }"
      @click="toggleCollapsed"
    >
      <span class="markdown-arrow"></span>
      {{ fluent('access-group_markdown') }}
    </h4>
    <div class="markdown-guide__content" v-if="!collapsed">
      <div class="markdown-guide__row">
        <p class="explanation">
          **{{ fluent('access-group_markdown', 'bold') }}**
        </p>
        <p class="bold-example">
          {{ fluent('access-group_markdown', 'bold') }}
        </p>
      </div>
      <div class="markdown-guide__row">
        <p class="explanation">
          __{{ fluent('access-group_markdown', 'italic') }}__
        </p>
        <p class="italicized-example">
          {{ fluent('access-group_markdown', 'italic') }}
        </p>
      </div>
      <div class="markdown-guide__row">
        <p class="explanation">
          [{{
            fluent('access-group_markdown', 'web-link')
          }}](https://www.mozilla.org/)
        </p>
        <p class="link-example">
          <a href="#">{{ fluent('access-group_markdown', 'web-link') }}</a>
        </p>
      </div>
      <div class="markdown-guide__row">
        <p class="explanation list">
          <span>- {{ fluent('access-group_markdown', 'list-first') }}</span>
          <span>- {{ fluent('access-group_markdown', 'list-second') }}</span>
          <span>- {{ fluent('access-group_markdown', 'list-third') }}</span>
        </p>
        <ul class="list-example">
          <li>{{ fluent('access-group_markdown', 'list-first') }}</li>
          <li>{{ fluent('access-group_markdown', 'list-second') }}</li>
          <li>{{ fluent('access-group_markdown', 'list-third') }}</li>
        </ul>
      </div>
    </div>
    <footer class="markdown-guide__footer">
      <ExternalLink href="/#test">
        {{ fluent('access-group_markdown', 'footer-link') }}
      </ExternalLink>
    </footer>
  </aside>
</template>

<script>
import ExternalLink from '@/components/ui/ExternalLink.vue';

export default {
  name: 'AccessGroupMarkdownGuide',
  components: { ExternalLink },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.$emit('collapse-toggled', this.collapsed);
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

.markdown-guide-container .markdown-guide__footer {
  margin: 0 1em 1em;
  border-top: 1px solid #ddedfd;
  padding-top: 1em;
}

@media (min-width: 35em) {
}
</style>
