<template>
  <EditMutationWrapper
    :editVariables="{
      primaryEmail,
      phoneNumbers,
    }"
    :initialValues="initialValues"
    formName="Edit contact information"
  >
    <header class="profile__section-header">
      <h2>Contact</h2>
    </header>
    <div class="edit-contact">
      <h3>Email</h3>
      <div class="edit-contact__item">
        <Select
          class="options--chevron"
          label="Email adddress 1 type"
          id="field-email-1-type"
          v-model="foo"
          :options="[
            { label: 'Primary', value: 'Primary' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Work', value: 'Work' },
            { label: 'Home', value: 'Home' },
          ]"
        />
        <input type="text" />
        <PrivacySetting
          label="Email address 1 privacy settings"
          id="field-email-1-privacy"
          profileField="email"
          v-model="foo2"
        />
        <label class="edit-contact__set-as-contact"
          ><input type="checkbox" /> Show in Contact Me button</label
        >
        <hr role="presentation" />
      </div>
      <div class="edit-contact__item">
        <Select
          class="options--chevron"
          label="Email adddress 2 type"
          id="field-email-2-type"
          v-model="foo3"
          :options="[
            { label: 'Primary', value: 'Primary' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Work', value: 'Work' },
            { label: 'Home', value: 'Home' },
          ]"
        />
        <input type="text" />
        <PrivacySetting
          label="Email address 1 privacy settings"
          id="field-email-1-privacy"
          profileField="email"
          v-model="foo2"
        />
        <label class="edit-contact__set-as-contact"
          ><input type="checkbox" /> Show in Contact Me button</label
        >
        <hr role="presentation" />
      </div>
      <div class="edit-contact__info">Add / Remove Email via Identities</div>
      <h3>Phone</h3>
      <div class="edit-contact__item">
        <Select
          class="options--chevron"
          label="Phone number 1 type"
          id="field-phone-1-type"
          v-model="foo4"
          :options="[
            { label: 'Primary', value: 'Primary' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Work', value: 'Work' },
            { label: 'Home', value: 'Home' },
          ]"
        />
        <input type="text" />
        <PrivacySetting
          label="Email address 1 privacy settings"
          id="field-email-1-privacy"
          profileField="email"
          v-model="foo2"
        />
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
          v-model="foo5"
          :options="[
            { label: 'Primary', value: 'Primary' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Work', value: 'Work' },
            { label: 'Home', value: 'Home' },
          ]"
        />
        <input type="text" />
        <PrivacySetting
          label="Email address 1 privacy settings"
          id="field-email-1-privacy"
          profileField="email"
          v-model="foo2"
        />
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
import { displayLevelsFor } from '@/assets/js/display-levels';

export default {
  name: 'EditContact',
  props: {
    primaryEmail: Object,
    phoneNumbers: Object,
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
  methods: {
    displayLevelsFor,
  },
  data() {
    return {
      privacySettings: {
        collapsedShowIcon: true,
        collapsedShowLabel: false,
        expandedShowIcon: true,
        expandedShowLabel: true,
        class: 'options--zebra',
      },
      foo: '',
      foo2: '',
      foo3: '',
      foo4: '',
      foo5: '',
      foo6: '',
    };
  },
};
</script>

<style>
.edit-contact__item {
  display: grid;
  grid-template-columns: 3em auto 1fr auto;
  grid-gap: 1em;
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
  grid-column-start: 2;
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
  grid-column: 4 / 5;
}
</style>
