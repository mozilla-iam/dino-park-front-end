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
        label="Accounts privacy levels"
        id="section-accounts-privacy"
        profileFieldName="uris"
        :profileFieldObject="urisUpdated"
        :collapsedShowLabel="true"
        v-model="urisUpdated.display"
      />
    </header>
    <div class="edit-contact__item">
      <Select
        class="options--chevron"
        :label="`Account 1 type`"
        :id="`field-account-1-type`"
        :options="selectableAccounts"
        value="EA#SLACK"
        :disabled="true"
      />
      <input type="text" v-model="uris['EA#SLACK']" />
      <label class="edit-contact__set-as-contact"
        ><input type="checkbox" /> Show in Contact Me button</label
      >
      <hr role="presentation" />
    </div>
    <div class="edit-contact__item">
      <Select
        class="options--chevron"
        :label="`Account 2 type`"
        :id="`field-account-2-type`"
        :options="selectableAccounts"
        value="EA#IRC"
        :disabled="true"
      />
      <input type="text" v-model="uris['EA#IRC']" />
      <label class="edit-contact__set-as-contact"
        ><input type="checkbox" /> Show in Contact Me button</label
      >
      <hr role="presentation" />
    </div>
    <div class="edit-contact__item">
      <Select
        class="options--chevron"
        :label="`Account 3 type`"
        :id="`field-account-3-type`"
        :options="selectableAccounts"
        value="EA#DISCOURSE"
        :disabled="true"
      />
      <input type="text" v-model="uris['EA#DISCOURSE']" />
      <label class="edit-contact__set-as-contact"
        ><input type="checkbox" /> Show in Contact Me button</label
      >
      <hr role="presentation" />
    </div>
    <div class="edit-contact__item" v-show="false">
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
    uris: {
      handler() {
        this.urisUpdated.values = Object.entries(this.uris).map(
          this.formatAsKeyValues,
        );
      },
      deep: true,
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
