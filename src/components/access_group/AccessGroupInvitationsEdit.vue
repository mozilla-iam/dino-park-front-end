<template lang="html">
  <section class="edit-invitations-container">
    <article class="edit-invitations-section">
      <h3 class="edit-invitations-section__header">Invitations</h3>
    </article>
  </section>
</template>

<script>
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'AccessGroupInvitationsEdit',
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
.edit-invitations {
  padding: 1em;
}

.edit-invitations-section .edit-invitations-section__header {
  font-size: 2em;
  font-weight: normal;
}
</style>
