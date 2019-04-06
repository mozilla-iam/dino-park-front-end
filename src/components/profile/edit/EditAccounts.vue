<template>
  <EditMutationWrapper
    :editVariables="{
      uris: urisUpdated,
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
        :profileFieldObject="urisUpdated"
        :collapsedShowLabel="true"
      />
    </header>
    <div
      v-for="({ k, v }, index) in urisUpdated.values"
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
        v-model="urisUpdated.values[index].k"
      />
      <input type="text" v-model="urisUpdated.values[index].v" />
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
        this.urisUpdated.values.push({
          k: this.constructUriKey({ name: this.availableAccounts[0] }),
          v: '',
        });
      }
    },
    deleteUri(index) {
      if (this.urisUpdated.values.length > index) {
        this.urisUpdated.values.splice(index, 1);
      }
    },
    toggleUriContactMe(e, index) {
      const account = this.destructUriKey(
        this.urisUpdated.values[index].k,
        index,
      );
      account.contact = e.target.checked;
      this.urisUpdated.values[index].k = this.constructUriKey(account);
    },
  },
  mounted() {
    this.$refs.header.focus();
  },
  computed: {
    remainingAccounts() {
      const selectedUris = this.urisUpdated.values.map(
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
      values: initialUris = {},
      metadata: { display = DISPLAY_LEVELS.private.value },
    } = this.initialUris;
    const urisUpdated = {
      values: Object.entries(initialUris).map(this.formatAsKeyValues),
      display,
    };
    return {
      urisUpdated,
    };
  },
};
</script>
