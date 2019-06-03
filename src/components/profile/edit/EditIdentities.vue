<template>
  <EditMutationWrapper
    :editVariables="{
      github: identities.githubIdentityUpdate,
      bugzilla: identities.bugzillaIdentityUpdate,
    }"
    :initialValues="{}"
    formName="Edit identities"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Identities</h2>
    </header>
    <div v-if="identities.hasGithub()" class="edit-contact__item">
      <Button
        class="button--icon-only"
        v-on:click="() => deleteIdentity('github')"
      >
        <Icon id="x" :width="17" :height="17"></Icon>
        <span class="visually-hidden">Remove GitHub identity</span>
      </Button>
      <Select
        class="options--chevron"
        label="GitHub identity"
        id="field-github-type"
        :options="[{ label: 'GitHub', value: 'GitHub' }]"
        :disabled="true"
      />
      <label for="field-github-value" class="visually-hidden"
        >GitHub identity</label
      >
      <input
        type="text"
        id="field-github-value"
        :value="githubUsername"
        placeholder=""
        disabled
      />
      <PrivacySetting
        label="GitHub identity privacy settings"
        id="field-github-privacy"
        profileFieldName="identites.update.github"
        :profileFieldObject="identities.githubIdentityUpdate"
      />
      <hr role="presentation" />
    </div>
    <div v-if="identities.hasBugzilla()" class="edit-contact__item">
      <Button
        class="button--icon-only"
        v-on:click="() => deleteIdentity('bugzilla')"
      >
        <Icon id="x" :width="17" :height="17"></Icon>
        <span class="visually-hidden">Remove Bugzilla identity</span>
      </Button>
      <Select
        class="options--chevron"
        label="Bugzilla identity"
        id="field-bugzilla-type"
        :options="[{ label: 'Bugzilla', value: 'Bugzilla' }]"
        :disabled="true"
      />
      <label for="field-bugzilla-value" class="visually-hidden"
        >Bugzilla identity</label
      >
      <input
        type="text"
        id="field-bugzilla-value"
        :value="identities.bugzillaEmail()"
        placeholder=""
        disabled
      />
      <PrivacySetting
        label="Bugzilla identity privacy settings"
        id="field-bugzilla-privacy"
        profileFieldName="identites.update.bugzilla"
        :profileFieldObject="identities.bugzillaIdentityUpdate"
      />
      <hr role="presentation" />
    </div>
    <div v-if="adding" class="edit-contact__item">
      <Select
        ref="new_identity"
        class="options--chevron"
        label="New identity"
        id="field-bugzilla-type"
        v-model="newIdentity"
        :options="identities.available().map((x) => identities.label(x))"
      />
      <label for="field-bugzilla-value" class="visually-hidden"
        >New identity {{ newIdentity }}</label
      >
      <div class="edit-identities__verify">
        <a v-bind:href="redirect(newIdentity)"
          >Verify on {{ identities.label(newIdentity).label }}</a
        >
      </div>
      <hr role="presentation" />
    </div>
    <Button
      class="edit-contact__add-more button--secondary button button--action"
      type="button"
      :disabled="identities.noIdentitiesLeft()"
      v-on:click="addIdentity"
      ><Icon id="plus" :width="16" :height="16" />Add Identity</Button
    >
  </EditMutationWrapper>
</template>

<script>
import Button from '@/components/ui/Button.vue';
import EditMutationWrapper from './EditMutationWrapper.vue';
import Icon from '@/components/ui/Icon.vue';
import Identities from '@/assets/js/identities';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Select from '@/components/ui/Select.vue';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';

export default {
  props: {
    identities: Object,
  },
  components: {
    Button,
    EditMutationWrapper,
    Icon,
    PrivacySetting,
    Select,
  },
  methods: {
    update() {
      this.identities.fetchGithubUsername().then((username) => {
        this.githubUsername = username;
      });
    },
    addIdentity() {
      [this.newIdentity] = this.identities.available();
      this.adding = true;
    },
    deleteIdentity(name) {},
    redirect(...args) {
      console.log(`re: ${this.newIdentity}`);
      return Identities.redirect(...args);
    },
  },
  data() {
    this.update();
    return {
      githubUsername: null,
      adding: false,
      newIdentity: null,
    };
  },
};
</script>

<style>
.edit-identities__verify {
  margin: auto 0;
}
</style>
