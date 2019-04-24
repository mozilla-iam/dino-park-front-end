<template>
  <EditMutationWrapper
    :editVariables="{
      uris,
    }"
    :initialValues="initialValues"
    formName="Edit accounts"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Accounts</h2>
      <PrivacySetting
        class="privacy-setting--large"
        label="Accounts privacy levels"
        id="section-accounts-privacy"
        profileFieldName="uris"
        :profileFieldObject="uris"
        :collapsedShowLabel="true"
      />
    </header>
    <div
      v-for="({ k, v }, index) in uris.values"
      :key="index"
      class="edit-contact__item"
    >
      <Button class="button--icon-only" v-on:click="() => deleteUri(index)">
        <Icon id="x" :width="17" :height="17"></Icon>
        <span class="visually-hidden">Remove Account</span>
      </Button>
      <Select
        class="options--chevron"
        :label="`Account ${index} type`"
        :id="`field-account-${index}-type`"
        :options="[
          { label: EXTERNAL_ACCOUNTS[destructUriKey(k).name].text, value: k },
          ...remainingAccounts,
        ]"
        v-model="uris.values[index].k"
      />
      <label :for="`field-account-${index}-username`" class="visually-hidden"
        >Username on
        {{ `${EXTERNAL_ACCOUNTS[destructUriKey(k).name].text}` }}</label
      >
      <input
        :id="`field-account-${index}-username`"
        type="text"
        v-model="uris.values[index].v"
        :placeholder="
          `Your username on ${EXTERNAL_ACCOUNTS[destructUriKey(k).name].text}`
        "
      />
      <label class="edit-contact__set-as-contact"
        ><input
          type="checkbox"
          v-on:change="(e) => toggleUriContactMe(e, index)"
          :checked="destructUriKey(k).contact"
        />
        Show in Contact Me button</label
      >
      <hr role="presentation" />
    </div>
    <Button
      class="edit-contact__add-more button--secondary button button--action"
      type="button"
      :disabled="noAccountsLeft"
      v-on:click="addUri"
      ><Icon id="plus" :width="16" :height="16" />Add Account</Button
    >
  </EditMutationWrapper>
</template>

<script>
import AccountsMixin from '@/components/_mixins/AccountsMixin.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Select from '@/components/ui/Select.vue';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditMutationWrapper from './EditMutationWrapper.vue';

export default {
  name: 'EditAccounts',
  props: {
    initialUris: {
      type: Object,
      default: () => {
        return {};
      },
    },
    initialValues: Object,
    editVariables: Object,
  },
  mixins: [AccountsMixin],
  components: {
    EditMutationWrapper,
    Icon,
    PrivacySetting,
    Select,
    Button,
  },
  methods: {
    displayLevelsFor,
    formatAsKeyValues([k, v]) {
      return {
        k,
        v,
      };
    },
    addUri() {
      if (this.remainingAccounts.length > 0) {
        const k = this.remainingAccounts[0].value;
        this.uris.values.push({
          k,
          v: '',
        });
      }
    },
    deleteUri(index) {
      if (this.uris.values.length > index) {
        this.uris.values.splice(index, 1);
      }
    },
    toggleUriContactMe(e, index) {
      const account = this.destructUriKey(this.uris.values[index].k, index);
      account.contact = e.target.checked;
      this.uris.values[index].k = this.constructUriKey(account);
    },
  },
  mounted() {
    this.$refs.header.focus();
  },
  computed: {
    remainingAccounts() {
      const selectedUris = this.uris.values.map(
        ({ k }) => this.destructUriKey(k).name,
      );
      return this.availableAccounts
        .filter((account) => !selectedUris.includes(account))
        .map((account) => {
          const label = this.EXTERNAL_ACCOUNTS[account].text;
          return { label, value: this.constructUriKey({ name: account }) };
        });
    },
    noAccountsLeft() {
      return this.remainingAccounts.length <= 0;
    },
  },
  data() {
    const {
      values: initialUris,
      metadata: { display = DISPLAY_LEVELS.private.value },
    } = this.initialUris;
    return {
      uris: {
        values: Object.entries(initialUris || {}).map(([k, v]) => {
          return { k, v };
        }),
        display,
      },
    };
  },
};
</script>
