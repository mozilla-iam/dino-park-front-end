<template>
  <dl class="key">
    <dt class="key__title">
      <Toast
        ref="toast"
        :content="toastContent"
        :time="1000"
        @reset-toast="toastContent = ''"
      ></Toast>
      <strong>{{ type }}</strong
      >: {{ title }}
      <button
        v-if="copyable"
        type="button"
        class="button button--secondary button--small"
        @click="copyKey"
      >
        <Icon id="copy" :width="16" :height="16" />
        Copy <span class="visually-hidden">key {{ title }}</span>
      </button>
    </dt>
    <dd class="key__content" ref="keyContent">{{ content }}</dd>
  </dl>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Toast from '@/components/ui/Toast.vue';

export default {
  name: 'Key',
  props: {
    type: String,
    title: String,
    content: String,
    copyable: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Icon,
    Toast,
  },
  methods: {
    copyKey() {
      const selection = window.getSelection();
      const range = document.createRange();

      range.selectNodeContents(this.$refs.keyContent);
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        document.execCommand('copy');
        selection.removeAllRanges();
        this.toastContent = 'Copied!';
      } catch (e) {
        this.toastContent = 'An error occured';
      }
    },
  },
  data() {
    return {
      toastContent: '',
    };
  },
};
</script>

<style>
.key {
  border: 1px solid var(--gray-30);
  border-radius: var(--keyRadius);
}

.key + .key,
.key + .visually-hidden + .key /* there could be a visually hidden heading between keys, in that case also add space */ {
  margin: 1.5em 0 0;
}

.key__title {
  color: var(--gray-50);
  letter-spacing: 0.05em;
  font-weight: 400;
  padding: 0.5em 1.25em;
  display: flex;
  align-items: center;
}
.key__title strong {
  text-transform: uppercase;
  font-weight: 400;
}
.key__title button {
  margin-left: auto;
  margin-bottom: 0;
}

.key__content {
  width: 100%;
  border: 0;
  margin: 0;
  padding: 0.75em 1.25em;
  background-color: var(--gray-20);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
