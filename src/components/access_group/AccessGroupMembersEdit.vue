<template lang="html">
  <section class="edit-members-container">
    <article class="edit-members-section">
      <h3 class="edit-members-section__header">Members</h3>
    </article>
  </section>
</template>

<script>
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'AccessGroupInformationEdit',
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
.edit-members {
  padding: 1em;
}

.edit-members-section .edit-members-section__header {
  font-size: 2em;
  font-weight: normal;
}
</style>
