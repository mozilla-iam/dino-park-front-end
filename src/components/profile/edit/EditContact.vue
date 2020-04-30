<template>
  <EditMutationWrapper
    :editVariables="editVariables"
    :novalidate="true"
    :formName="fluent('profile_contact', 'edit')"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>{{ fluent('profile_contact') }}</h2>
    </header>
    <div class="edit-contact">
      <div class="edit-contact__header">
        <h3>{{ fluent('profile_email') }}</h3>
      </div>
      <div class="edit-contact__item">
        <div class="edit-contact__label">
          <label for="field-email-primary-value">{{
            fluent('profile_email_primary')
          }}</label>
          <Tooltip
            :buttonText="fluent('profile_email_primary', 'tooltip-open')"
            :alternateButtonText="
              fluent('profile_email_primary', 'tooltip-close')
            "
          >
            <Fluent
              v-if="scope.isStaff"
              id="profile_email_primary"
              attr="tooltip-staff"
              :tags="{
                email: { tag: 'a', href: globalLinks.hrEmail },
              }"
            />
            <Fluent v-else id="profile_email_primary" attr="tooltip" />
          </Tooltip>
        </div>
        <input
          type="email"
          id="field-email-primary-value"
          :value="primaryEmail.value"
          :placeholder="fluent('profile_email', 'placeholder')"
          disabled
        />
        <PrivacySetting
          :label="fluent('profile_email_primary', 'privacy')"
          id="field-email-primary-privacy"
          profileFieldName="primaryEmail"
          :profileFieldObject="primaryEmail"
        />
        <Checkbox
          :checked="true"
          :label="fluent('profile_contact-me', 'show-in')"
          class="edit-contact__set-as-contact"
          :disabled="true"
        />
        <hr role="presentation" />
      </div>
      <div v-if="hasSecondaryEmail" class="edit-contact__item">
        <Button
          class="button--icon-only button--x"
          v-on:click="removeSecondaryEmail"
        >
          <Icon id="x" :width="17" :height="17"></Icon>
          <span class="visually-hidden">{{
            fluent('profile_email_secondary', 'remove')
          }}</span>
        </Button>
        <div class="edit-contact__label">
          <label for="field-email-secondary-value">{{
            fluent('profile_email_secondary')
          }}</label>
          <Tooltip
            :buttonText="fluent('profile_email_secondary', 'tooltip-open')"
            :alternateButtonText="
              fluent('profile_email_secondary', 'tooltip-close')
            "
            >{{ fluent('profile_email_secondary', 'tooltip') }}
          </Tooltip>
        </div>
        <input
          type="email"
          id="field-email-secondary-value"
          class="edit-contact__input-w-error"
          v-model="editSecondaryEmail.value"
          :placeholder="fluent('profile_email', 'placeholder')"
        />
        <span class="edit-contact__error-msg">{{
          fluent('profile_email', 'error-invalid')
        }}</span>
        <PrivacySetting
          :label="fluent('profile_email_secondary', 'privacy')"
          id="field-email-secondary-privacy"
          profileFieldName="editSecondaryEmail"
          :profileFieldObject="editSecondaryEmail"
        />
        <Checkbox
          :label="fluent('profile_contact-me', 'show-in')"
          class="edit-contact__set-as-contact"
          @input="(newValue) => toggleSecondaryEmailContactMe(newValue)"
          :checked="secondaryEmailContactMe"
        />
        <hr role="presentation" />
      </div>
      <hr role="presentation" />
      <Button
        class="edit-contact__add-more button--secondary button--action"
        v-if="!hasSecondaryEmail"
        v-on:click="addSecondaryEmail"
        ><Icon id="plus" :width="16" :height="16" />{{
          fluent('profile_email_secondary', 'add')
        }}</Button
      >
      <div class="edit-contact__header">
        <h3>{{ fluent('profile_phone') }}</h3>
        <PrivacySetting
          class="privacy-select--large"
          :label="fluent('profile_phone', 'privacy')"
          id="field-phone-number-1-privacy"
          profileFieldName="phoneNumbers"
          :profileFieldObject="phoneNumbers"
          :collapsedShowLabel="true"
        />
      </div>
      <div
        v-for="({ k, v: number }, index) in phoneNumbers.values"
        :key="index"
        class="edit-contact__item"
      >
        <Button
          class="button--icon-only button--x"
          v-on:click="() => deletePhoneNumber(index)"
        >
          <Icon id="x" :width="17" :height="17"></Icon>
          <span class="visually-hidden">{{
            fluent('profile_phone', 'remove')
          }}</span>
        </Button>
        <Select
          class="options--chevron"
          :label="`Phone number ${index} type`"
          :id="`field-phone-${index}-type`"
          :options="phoneNumberLabels(k, index)"
          v-model="phoneNumbers.values[index].k"
        />
        <label :for="`field-phone-${index}-value`" class="visually-hidden">{{
          fluent({
            id: 'profile_phone',
            attr: 'label',
            args: { index: index + 1 },
          })
        }}</label>
        <input
          :id="`field-phone-${index}-value`"
          class="edit-contact__input-w-error"
          type="tel"
          pattern="\+[1-9][0-9 \-]*"
          :placeholder="fluent('profile_phone', 'placeholder')"
          v-model="phoneNumbers.values[index].v"
        />
        <span class="edit-contact__error-msg">{{
          fluent('profile_phone', 'error')
        }}</span>
        <Checkbox
          @input="(newValue) => togglePhoneNumberContactMe(newValue, index)"
          :checked="destructPhoneKey(k).contact"
          :label="fluent('profile_contact-me', 'show-in')"
          class="edit-contact__set-as-contact"
        />
        <hr role="presentation" />
      </div>
      <hr role="presentation" />
      <Button
        class="edit-contact__add-more button--secondary button--action"
        :disabled="phoneNumbers.values.length >= MAX_NUMBERS"
        v-on:click="addPhoneNumber"
        ><Icon id="plus" :width="16" :height="16" />{{
          fluent('profile_phone', 'add')
        }}</Button
      >
    </div>
  </EditMutationWrapper>
</template>

<script>
import Checkbox from '@/components/ui/Checkbox.vue';
import PhoneNumbersMixin from '@/components/_mixins/PhoneNumbersMixin.vue';
import Button from '@/components/ui/Button.vue';
import EditMutationWrapper from './EditMutationWrapper.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Icon from '@/components/ui/Icon.vue';
import Select from '@/components/ui/Select.vue';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';
import Tooltip from '@/components/ui/Tooltip.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';

const EMPTY_SECONDARY_EMAIL = {
  value: '',
  display: DISPLAY_LEVELS.staff.value,
};

export default {
  name: 'EditContact',
  props: {
    initialPrimaryEmail: Object,
    initialSecondaryEmail1: Object,
    initialSecondaryEmail2: Object,
    initialPhoneNumbers: Object,
    initialUris: Object,
  },
  mixins: [PhoneNumbersMixin, LinksMixin],
  components: {
    Button,
    Checkbox,
    EditMutationWrapper,
    Icon,
    PrivacySetting,
    Select,
    Tooltip,
  },
  mounted() {
    this.$refs.header.focus();
  },
  computed: {
    editVariables() {
      return {
        phoneNumbers: this.phoneNumbers,
        primaryEmailDisplay: this.primaryEmail.display,
        custom1PrimaryEmail: this.custom1PrimaryEmail,
        custom2PrimaryEmail: this.custom2PrimaryEmail,
      };
    },
  },
  methods: {
    removeSecondaryEmail() {
      this.hasSecondaryEmail = false;
      this.editSecondaryEmail = EMPTY_SECONDARY_EMAIL;
      this.custom1PrimaryEmail = EMPTY_SECONDARY_EMAIL;
      this.custom2PrimaryEmail = EMPTY_SECONDARY_EMAIL;
    },
    addSecondaryEmail() {
      this.hasSecondaryEmail = true;
      this.updateSecondaryEmail();
    },
    toggleSecondaryEmailContactMe(checked) {
      this.secondaryEmailContactMe = checked;
      this.updateSecondaryEmail();
    },
    updateSecondaryEmail() {
      this.custom1PrimaryEmail = this.secondaryEmailContactMe
        ? this.editSecondaryEmail
        : EMPTY_SECONDARY_EMAIL;
      this.custom2PrimaryEmail = this.secondaryEmailContactMe
        ? EMPTY_SECONDARY_EMAIL
        : this.editSecondaryEmail;
    },
    addPhoneNumber() {
      const count = this.phoneNumbers.values.length;
      this.phoneNumbers.values.push({
        k: this.constructPhoneKey({ view: 'Mobile', num: count }),
        v: '',
      });
    },
    deletePhoneNumber(index) {
      if (this.phoneNumbers.values.length > index) {
        this.phoneNumbers.values.splice(index, 1);
      }
    },
    toggleContactMe(newValue, index, list, destruct, construct) {
      const field = destruct(list[index].k, index);
      field.contact = newValue;
      list[index].k = construct(field);
    },
    togglePhoneNumberContactMe(newValue, index) {
      this.toggleContactMe(
        newValue,
        index,
        this.phoneNumbers.values,
        this.destructPhoneKey,
        this.constructPhoneKey,
      );
    },
    labels(k, index, desctruct, construct, allOptions) {
      const current = desctruct(k).view;
      const names = allOptions.filter((name) => name !== current);
      const options = names.map((label) => {
        return {
          label: this.getTranslatedLabel(label),
          value: construct({ view: label, num: index }),
        };
      });
      options.push({
        label: this.getTranslatedLabel(current),
        value: k,
      });
      return options;
    },
    phoneNumberLabels(k, index) {
      return this.labels(
        k,
        index,
        this.destructPhoneKey,
        this.constructPhoneKey,
        this.allOptions(),
      );
    },
  },
  data() {
    const {
      values: numbers,
      metadata: { display: numbersDisplay },
    } = this.initialPhoneNumbers;
    const {
      value: email,
      metadata: { display: emailDisplay },
    } = this.initialPrimaryEmail;

    /*
     * Since we do not support the contact me flag on profile v2 we creatively use
     * two custom email fields to store the contact me flag.
     *
     * If the value for the secondary email ist stored in custom1PrimaryEmail (editSecondaryEmail1)
     * we consider the contact me flag to be set. If it's stored in custom2PrimaryEmail we
     * consider it not set (see secondaryEmailContactMe).
     */
    const {
      value: editSecondaryEmail1 = '',
      metadata: { display: editSecondaryEmail1Display },
    } = this.initialSecondaryEmail1;
    const {
      value: editSecondaryEmail2 = '',
      metadata: { display: editSecondaryEmail2Display },
    } = this.initialSecondaryEmail2;
    const secondaryEmailContactMe = Boolean(editSecondaryEmail1);

    const editSecondaryEmail = {
      value: secondaryEmailContactMe
        ? editSecondaryEmail1
        : editSecondaryEmail2,
      display:
        (secondaryEmailContactMe
          ? editSecondaryEmail1Display
          : editSecondaryEmail2Display) || DISPLAY_LEVELS.staff.value,
    };

    /*
     * Display level for customXPrimaryEmail defaults to PUBLIC upon creation.
     * We want it to default to STAFF.
     */
    const firstTimeSecondaryEmail =
      editSecondaryEmail1 === null && editSecondaryEmail2 === null;
    if (firstTimeSecondaryEmail) {
      editSecondaryEmail.display = DISPLAY_LEVELS.staff.value;
    }

    const hasSecondaryEmail = Boolean(editSecondaryEmail.value);
    const custom1PrimaryEmail = secondaryEmailContactMe
      ? editSecondaryEmail
      : EMPTY_SECONDARY_EMAIL;
    const custom2PrimaryEmail = secondaryEmailContactMe
      ? EMPTY_SECONDARY_EMAIL
      : editSecondaryEmail;

    return {
      MAX_NUMBERS: 5,
      hasSecondaryEmail,
      secondaryEmailContactMe,
      editSecondaryEmail,
      custom1PrimaryEmail,
      custom2PrimaryEmail,
      primaryEmail: {
        value: email,
        display: emailDisplay || DISPLAY_LEVELS.private.value,
      },
      phoneNumbers: {
        values: Object.entries(numbers || {}).map(([k, v]) => {
          return { k, v };
        }),
        display: numbersDisplay || DISPLAY_LEVELS.private.value,
      },
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
.edit-contact__item > .privacy-select {
  grid-row: 1/2;
}
.edit-contact__item .button--x {
  border-color: transparent;
  background-color: transparent;
  display: inline-block;
  vertical-align: baseline;
  margin-right: 0.5em;
  color: var(--blue-60);
  padding: 0;
}
.edit-contact__item .button--x:hover {
  color: var(--black);
  background-color: transparent;
}
.edit-contact__label {
  grid-column: 2 / 3;
  padding: 0.5em 0;
  color: var(--gray-50);
}
.edit-contact__label label + .tooltip {
  margin-left: 0.5em;
}
.edit-contact__item .options button {
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.edit-contact__item input[type='text'],
.edit-contact__item input[type='email'],
.edit-contact__item input[type='tel'],
.edit-contact__item input[type='password'] {
  border: 1px solid transparent;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
  padding: 0.5em 0.9em;
  grid-column: 2 / 4;
}
.edit-contact__item input[type='text']:hover,
.edit-contact__item input[type='email']:hover,
.edit-contact__item input[type='tel']:hover,
.edit-contact__item input[type='password']:hover,
.edit-contact__item input[type='text']:focus,
.edit-contact__item input[type='email']:focus,
.edit-contact__item input[type='tel']:focus,
.edit-contact__item input[type='password']:focus {
  border: 1px solid var(--blue-60);
}
@media (min-width: 57.5em) {
  .edit-contact__item input[type='text'],
  .edit-contact__item input[type='email'],
  .edit-contact__item input[type='tel'] {
    grid-column: 3 / 4;
  }
}
.edit-contact__item input[type='text'][disabled],
.edit-contact__item input[type='email'][disabled],
.edit-contact__item input[type='tel'][disabled] {
  color: inherit;
  background-color: var(--white);
  border: 2px solid var(--gray-20);
  cursor: not-allowed;
  opacity: 1;
  color: var(--gray-60);
  height: calc(100% - 4px); /* account for border */
}
.edit-contact__set-as-contact,
.edit-contact__item hr {
  grid-column: 2 / 5;
}
.edit-contact__item hr {
  margin: 1em 0;
}
.edit-contact__set-as-contact input {
  display: inline-block;
  vertical-align: baseline;
  margin-right: 1em;
}
.edit-contact__add-more {
  grid-column: 1 / 5;
  justify-self: end;
  margin-left: auto;
}
.edit-contact__header {
  display: flex;
}
.edit-contact__header .privacy-select {
  margin-left: auto;
}
.edit-contact__header ~ .edit-contact__header {
  margin: 3em 0 1em;
}
input.edit-contact__input-w-error ~ .edit-contact__error-msg {
  grid-column: 2 / 4;
  color: var(--neon-red);
  margin-top: -0.5em;
  font-size: small;
}
@media (min-width: 57.5em) {
  input.edit-contact__input-w-error ~ .edit-contact__error-msg {
    grid-column: 3 / 4;
  }
}
input:focus:invalid.edit-contact__input-w-error ~ .edit-contact__error-msg,
input:valid.edit-contact__input-w-error ~ .edit-contact__error-msg {
  display: none;
}
input:invalid:not(focus).edit-contact__input-w-error
  ~ .edit-contact__error-msg {
  display: initial;
}
input:invalid:not(focus).edit-contact__input-w-error {
  border-color: var(--neon-red);
}
</style>
