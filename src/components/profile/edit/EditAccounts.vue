<template>
  <EditMutationWrapper
    :editVariables="{
      accounts: urisUpdated,
    }"
    :initialValues="initialValues"
    formName="Edit accounts"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Accounts</h2>
      <PrivacySetting
        label="Accounts privacy levels"
        id="section-accounts-privacy"
        :profileField="urisUpdated"
        :collapsedShowLabel="true"
        v-model="urisUpdated.display"
      />
    </header>
    <div
      class="edit-contact__item"
      v-for="(username, type, id) in uris"
      :key="`account-item-${id}`"
    >
      <Select
        class="options--chevron"
        :label="`Account ${id} type`"
        :id="`field-account-${id}-type`"
        :options="selectableAccounts"
        :value="type"
      />
      <input type="text" :value="username" />
      <label class="edit-contact__set-as-contact"
        ><input type="checkbox" /> Show in Contact Me button</label
      >
      <hr role="presentation" />
    </div>
    <br /><br />
    <div class="edit-contact__item">
      <Select
        class="options--chevron"
        label="New account type"
        id="field-new-account-type"
        :options="selectableAccounts"
        v-model="newAccountType"
      />
      <input type="text" v-model="newAccountUsername" ref="inputUsername" />
      <Button
        class="edit-contact__add-more button--secondary button button--action"
        type="button"
        @click="
          if (newAccountUsername.length > 0) {
            addAccount({ [newAccountType]: newAccountUsername });
          } else {
            $refs.inputUsername.focus();
          }
        "
        ><Icon id="plus" :width="16" :height="16" />Add Account</Button
      >
    </div>
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
    addAccount(uri) {
      this.uris = { ...this.uris, ...uri };
      this.newAccountUsername = '';
    },
    formatAsKeyValues(item) {
      const [k, v] = item;

      return {
        k,
        v,
      };
    },
  },
  watch: {
    uris() {
      this.urisUpdated.values = Object.entries(this.uris).map(
        this.formatAsKeyValues,
      );
    },
  },
  mounted() {
    this.$refs.header.focus();
  },
  data() {
    return {
      newAccountUsername: '',
      newAccountType: '',
      uris: this.initialValues.uris.values,
      urisUpdated: {
        values: Object.entries(this.initialValues.uris.values).map(
          this.formatAsKeyValues,
        ),
        display:
          this.initialValues.uris.metadata.display ||
          DISPLAY_LEVELS.private.value,
      },
    };
  },
};
</script>
