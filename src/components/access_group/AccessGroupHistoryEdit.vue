<template lang="html">
  <section class="edit-history-container">
    <article class="edit-history-section">
      <h3 class="edit-history-section__header">History</h3>
    </article>
  </section>
</template>

<script>
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'AccessGroupHistoryEdit',
  components: { TextInput, TextArea, Button, Icon },
  props: [],
  mounted() {},
  data() {
    return {
      groupData: '',
      groupDescriptionData: '',
      groupTermsData: '',
    };
  },
  methods: {},
  computed: {},
};
</script>

<style>
.edit-history {
  padding: 1em;
}

.edit-history-section .edit-history-section__header {
  font-size: 2em;
  font-weight: normal;
}
</style>
