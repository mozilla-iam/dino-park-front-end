<template>
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
      <footer class="edit-information-section__footer">
        <Button
          disabled="disabled"
          class="button--secondary button--action row-primary-action"
          >Update details</Button
        >
      </footer>
    </article>
    <article class="edit-information-section">
      <h3 class="edit-information-section__header">Group type</h3>
      <div class="edit-information-section__content content-area">
        <div class="content-area__row">
          <div class="radio-control">
            <input type="radio" checked="true" /> Reviewed
          </div>
          <div class="radio-control"><input type="radio" /> Closed</div>
        </div>
        <div class="content-area__row radio-control__description">
          <label class="description-label">Reviewed</label>
          <p class="description-content">
            When a group is set to "Reviewed", Mozillians are presented with a
            "Request to Join" button on the group page. Once clicked, Group
            Curators will receive a pending rquest notification, prompting them
            to review and accept or deny the membership. Group Curators can
            invite and/or remove people from the group if needed.
          </p>
        </div>
        <div class="content-area__row radio-control__description">
          <label class="description-label">Closed</label>
          <p class="description-content">
            "Closed" groups provide more tight control over a group. Mozillians
            cannot request membership, and can only be invited to join the group
            by Group Curators. Group Curators can, of course, remove people from
            the group if needed. Avoid using this group type unless you are
            absolutely sure it is necessary.
          </p>
        </div>
      </div>
      <footer class="edit-information-section__footer">
        <Button
          disabled="disabled"
          class="button--secondary button--action row-primary-action"
          >Update type</Button
        >
      </footer>
    </article>
    <article class="edit-information-section">
      <h3 class="edit-information-section__header">Membership terms</h3>
      <div class="edit-information-section__content content-area">
        <div class="content-area__row">
          <div class="radio-control">
            <input type="checkbox" checked="true" /> New members should accept
            terms
          </div>
        </div>
        <div class="content-area__row multi-line">
          <label class="content-area__label">Terms and conditions text</label>
          <TextArea
            :rows="5"
            :maxlength="5000"
            v-model="groupTermsData"
            class="content-area__value"
          ></TextArea>
          <p class="content-area__value-description">
            Use <a href="#">Markdown</a> for bold, italics, lists, and links.
          </p>
        </div>
      </div>
      <footer class="edit-information-section__footer">
        <Button
          disabled="disabled"
          class="button--secondary button--action row-primary-action"
          >Update terms</Button
        >
      </footer>
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
.edit-information {
  padding: 1em;
}

.edit-information-section {
  padding: 3em 0 1em 2em;
}

.edit-information-section .edit-information-section__header,
.edit-information-section .edit-information-section__content,
.edit-information-section .edit-information-section__footer {
  width: 70%;
}

.edit-information-section .edit-information-section__header {
  font-size: 2em;
  font-weight: normal;
}

.content-area__row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 2em 0;
  align-items: center;
}

.content-area__row .radio-control {
  margin: 0 1em 0 0;
  color: var(--gray-40);
}

.content-area__row .radio-control > input {
  margin: 0 0.5em 0 0;
}

.content-area__row.action-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.content-area__row.radio-control__description {
  flex-direction: column;
  align-items: flex-start;
}

.radio-control__description .description-label {
  font-weight: bold;
  margin-bottom: 0.5em;
}

.radio-control__description .description-content {
  margin: 0;
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

.edit-information-section .edit-information-section__footer {
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid var(--gray-40);
}

.edit-information-section .edit-information-section__footer .button {
  margin-top: 2em;
}
</style>
