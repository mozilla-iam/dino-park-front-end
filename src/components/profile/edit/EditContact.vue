<template>
  <EditMutationWrapper
    :editVariables="{
      primaryEmail,
      phoneNumbers,
    }"
    :initialValues="initialValues"
    formName="Edit contact information"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Contact</h2>
    </header>
    <div class="edit-contact">
      <div class="edit-contact__header">
        <h3>Email</h3>
      </div>
      <div class="edit-contact__item">
        <Select
          class="options--chevron"
          label="Email adddress 1 type"
          id="field-email-1-type"
          :options="[{ label: 'Primary', value: 'Primary' }]"
        />
        <input type="text" disabled />
        <PrivacySetting
          label="Email address 1 privacy settings"
          id="field-email-1-privacy"
          profileFieldName="primaryEmail"
          :profileFieldObject="primaryEmail"
        />
        <label class="edit-contact__set-as-contact"
          ><input type="checkbox" /> Show in Contact Me button</label
        >
        <hr role="presentation" />
      </div>
      <div class="edit-contact__info">Add / Remove Email via Identities</div>
      <div class="edit-contact__header">
        <h3>Phone</h3>
        <PrivacySetting
          class="privacy-setting--large"
          label="Phone number 1 privacy settings"
          id="field-phone-number-1-privacy"
          profileFieldName="phoneNumbers"
          :profileFieldObject="phoneNumbers"
          :collapsedShowLabel="true"
        />
      </div>
      <div class="edit-contact__item">
        <Select
          class="options--chevron"
          label="Phone number 1 type"
          id="field-phone-1-type"
          :options="[
            { label: 'Primary', value: 'Primary' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Work', value: 'Work' },
            { label: 'Home', value: 'Home' },
          ]"
        />
        <input type="text" />
        <label class="edit-contact__set-as-contact"
          ><input type="checkbox" /> Show in Contact Me button</label
        >
        <hr role="presentation" />
      </div>
      <div class="edit-contact__item">
        <Button class="button--icon-only">
          <Icon id="x" :width="17" :height="17"></Icon>
          <span class="visually-hidden">Remove phone number</span>
        </Button>
        <Select
          class="options--chevron"
          label="Phone number 2 type"
          id="field-phone-2-type"
          :options="[
            { label: 'Primary', value: 'Primary' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Work', value: 'Work' },
            { label: 'Home', value: 'Home' },
          ]"
        />
        <input type="text" />
        <label class="edit-contact__set-as-contact"
          ><input type="checkbox" /> Show in Contact Me button</label
        >
        <hr role="presentation" />
        <Button class="edit-contact__add-more button--secondary button--action"
          ><Icon id="plus" :width="16" :height="16" />Add Phone</Button
        >
      </div>
    </div>
  </EditMutationWrapper>
</template>

<script>
import Button from '@/components/ui/Button.vue';
import EditMutationWrapper from './EditMutationWrapper.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Icon from '@/components/ui/Icon.vue';
import Select from '@/components/ui/Select.vue';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';

export default {
  name: 'EditContact',
  props: {
    initialValues: Object,
    editVariables: Object,
  },
  components: {
    Button,
    EditMutationWrapper,
    Icon,
    PrivacySetting,
    Select,
  },
  mounted() {
    this.$refs.header.focus();
  },
  data() {
    return {
      ...Object.entries(this.initialValues).reduce(
        (
          obj,
          [
            key,
            {
              value,
              metadata: { display },
            },
          ],
        ) => {
          obj[key] = {
            value,
            display: display || DISPLAY_LEVELS.public.value,
          };
          return obj;
        },
        {},
      ),
    };
  },
};
</script>

<style>
.edit-contact__item {
  display: grid;
  grid-template-columns: auto 1fr 3fr auto;
  grid-gap: 1em;
}
@media (min-width: 57.5em) {
  .edit-contact__item {
    grid-template-columns: 3em 1fr 3fr auto;
  }
}
.edit-contact__item .button--icon-only {
  border-color: transparent;
  background-color: transparent;
  display: inline-block;
  vertical-align: baseline;
  margin-right: 0.5em;
  color: var(--blue-60);
  padding: 0;
}
.edit-contact__item .button--icon-only:hover {
  color: var(--black);
  background-color: transparent;
}
.edit-contact__item .options:first-child {
  grid-column: 2 / 3;
}
.edit-contact__item .options button {
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.edit-contact__item input[type='text'] {
  border: 0;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
  padding: 0.5em 0.9em;
  grid-column: 2 / 4;
}
@media (min-width: 57.5em) {
  .edit-contact__item input[type='text'] {
    grid-column: 3 / 4;
  }
}
.edit-contact__item input[type='text'][disabled] {
  color: inherit;
  background-color: var(--white);
  border: 2px solid var(--gray-20);
  cursor: not-allowed;
}
.edit-contact__set-as-contact,
.edit-contact__item hr {
  grid-column: 2 / 5;
}
.edit-contact__item hr {
  margin: 1em 0;
}
.edit-contact__info {
  text-align: right;
  color: var(--gray-50);
}
.edit-contact__set-as-contact input {
  display: inline-block;
  vertical-align: baseline;
  margin-right: 1em;
}
.edit-contact__add-more {
  grid-column: 1 / 5;
  justify-self: end;
}
.edit-contact__header {
  display: flex;
}
.edit-contact__header .privacy-setting {
  margin-left: auto;
}
.edit-contact__header ~ .edit-contact__header {
  margin: 3em 0 1em;
}
</style>
