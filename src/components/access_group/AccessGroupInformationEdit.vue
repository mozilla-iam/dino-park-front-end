<template lang="html">
  <section class="edit-information-container">
    <article class="edit-information-section">
      <h3 class="edit-information-section__header">Group details</h3>
      <div class="edit-information-section__content content-area">
        <div class="content-area__row">
          <label class="content-area__label">Group name</label>
          <TextInput
            type="text"
            v-model="groupData"
            :maxlength="50"
            class="content-area__value"
          />
        </div>
        <div class="content-area__row multi-line">
          <label class="content-area__label">Group description</label>
          <TextArea
            :rows="5"
            :maxlength="5000"
            v-model="groupDescriptionData"
            class="content-area__value"
          ></TextArea>
          <p class="content-area__value-description">
            Use <a href="#">Markdown</a> for bold, italics, lists, and links.
          </p>
        </div>
      </div>
    </article>
    <article class="edit-information-section">
      <h3 class="edit-information-section__header">Group links</h3>
      <div class="edit-information-section__content content-area">
        <div class="content-area__row">
          <label class="content-area__label">Website URL</label>
          <TextInput
            placeholder="https://www"
            type="text"
            v-model="groupData"
            class="content-area__value"
          />
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';

export default {
  name: 'AccessGroupInformationEdit',
  components: { TextInput, TextArea },
  props: [],
  mounted() {},
  data() {
    return {
      groupData: '',
      groupDescriptionData: '',
    };
  },
  methods: {},
  computed: {},
};
</script>

<style>
.edit-information {
  padding: 1em;
}

.edit-information-section {
  padding: 3em 0 1em 2em;
}

.edit-information-section .edit-information-section__header {
  font-size: 2em;
  font-weight: normal;
}

.edit-information-section .edit-information-section__content {
  width: 70%;
}

.content-area__row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 2em 0;
  align-items: center;
}

.content-area__row.multi-line {
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
}

.content-area .content-area__label {
  flex: 1;
  color: var(--gray-40);
  height: 1.5em;
}

.content-area .content-area__value {
  width: 70%;
}

.content-area .content-area__row.multi-line .content-area__value {
  width: 100%;
  margin-top: 1em;
}

.content-area .content-area__value-description {
  color: var(--gray-40);
}
</style>
