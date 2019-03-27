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
    <div v-for="(username, type) in uris">
      <select>
        <option :value="type" :selected="type === 'EA#DISCOURSE'"
          >Discourse</option
        >
        <option :value="type" :selected="type === 'EA#TWITTER'">Twitter</option>
        >
      </select>
      <input type="username" v-bind="username" :value="username" />
    </div>
    <br /><br />
    <select v-model="newAccountType">
      <option value="EA#DISCOURSE">Discourse</option>
      <option value="EA#SLACK">Slack</option>
      <option value="EA#IRC">IRC</option>
    </select>
    <input type="text" v-model="newAccountUsername" ref="inputUsername" />
    <button
      type="button"
      @click="
        if (newAccountUsername.length > 0) {
          addAccount({ [newAccountType]: newAccountUsername });
        } else {
          $refs.inputUsername.focus();
        }
      "
    >
      Add account
    </button>
  </EditMutationWrapper>
</template>

<script>
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditMutationWrapper from './EditMutationWrapper.vue';

export default {
  name: 'EditAccounts',
  props: {
    initialValues: Object,
    editVariables: Object,
  },
  components: {
    EditMutationWrapper,
    PrivacySetting,
  },
  methods: {
    displayLevelsFor,
    addAccount(uri) {
      this.uris = { ...this.uris, uri };
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
      newAccount: '',
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
