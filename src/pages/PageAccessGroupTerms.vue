<template>
  <main class="group-terms">
    <a class="button group-terms__back-action" :href="backUrl" @click="handleBackClicked">
      <Icon id="chevron-left" :width="17" :height="17" />Back to group
    </a>
    <section class="primary-area">
      <h1 class="group-terms__header">Terms and Conditions</h1>
      <p>{{ termsContent }}</p>
    </section>
  </main>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'AccessGroup',
  components: {
    Icon,
    Button,
  },
  props: {
    groupid: String,
  },
  methods: {
    handleBackClicked() {
      console.log('Back clicked');
    },
  },
  computed: {
    termsContent() {
      return this.$store.state.groupTOS;
    },
    backUrl() {
      return this.$route.path.substr(0, this.$route.path.lastIndexOf('/'));
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.group-terms {
  margin-top: 2em;
}
.group-terms .group-terms__back-action {
  background-color: var(--gray-30);
  color: var(--black);
  display: inline-block;
}

.group-terms .primary-area {
  background: var(--white);
  box-shadow: var(--shadowCard);
  padding: 2em;
  margin-top: 2em;
}

.group-terms .group-terms__header {
  margin-top: 0.25em;
  font-size: 3em;
}
</style>
