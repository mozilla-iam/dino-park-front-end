<template>
  <EditMutationWrapper
    :editVariables="{
      identities: {
        github: githubIdentityUpdate,
        bugzilla: bugzillaIdentityUpdate,
      },
    }"
    :initialValues="{}"
    formName="Edit identities"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <h2>Identities</h2>
    </header>
    <div
      v-if="identities.hasGithub() && !githubIdentityUpdate.remove"
      class="edit-contact__item edit-identity__item"
    >
      <Button
        class="button--icon-only"
        v-on:click="() => deleteIdentity('github')"
        :disabled="adding"
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
      <div class="input">
        <input
          type="text"
          id="field-github-value"
          :value="githubUsername"
          placeholder=""
          disabled
        />
        <span>Verified</span>
      </div>
      <PrivacySetting
        label="GitHub identity privacy settings"
        id="field-github-privacy"
        :profileFieldObject="githubIdentityUpdate"
      />
      <hr role="presentation" />
    </div>
    <div
      v-if="identities.hasBugzilla() && !bugzillaIdentityUpdate.remove"
      class="edit-contact__item edit-identity__item"
    >
      <Button
        class="button--icon-only"
        v-on:click="() => deleteIdentity('bugzilla')"
        :disabled="adding"
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
      <div class="input">
        <input
          type="text"
          id="field-bugzilla-value"
          :value="identities.bugzillaEmail()"
          placeholder=""
          disabled
        />
        <span>Verified</span>
      </div>
      <PrivacySetting
        label="Bugzilla identity privacy settings"
        id="field-bugzilla-privacy"
        :profileFieldObject="bugzillaIdentityUpdate"
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
        <form v-bind:action="redirect(newIdentity)">
          <button type="submit">
            Verify
          </button>
        </form>
      </div>
      <hr role="presentation" />
    </div>
    <Button
      class="edit-identity__add-more button--secondary button button--action"
      type="button"
      :disabled="identities.noIdentitiesLeft() || adding || deleting"
      v-on:click="addIdentity"
      ><Icon id="plus" :width="16" :height="16" />{{ addButtonText }}</Button
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
  computed: {
    addButtonText() {
      if (this.adding) {
        return 'Verify Added Identity First';
      }
      if (this.deleting) {
        return 'Save Changes First';
      }
      if (this.identities.noIdentitiesLeft()) {
        return 'All Identities Added';
      }
      return 'Add Identity';
    },
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
    deleteIdentity(name) {
      this.deleting = true;
      switch (name) {
        case 'github':
          this.githubIdentityUpdate.remove = true;
          break;
        case 'bugzilla':
          this.bugzillaIdentityUpdate.remove = true;
          break;
        default:
      }
    },
    redirect(...args) {
      return Identities.redirect(...args);
    },
  },
  data() {
    const bugzillaIdentityUpdate = {
      remove: false,
      display: this.identities.bugzillaDisplay(),
    };
    const githubIdentityUpdate = {
      remove: false,
      display: this.identities.githubDisplay(),
    };
    this.update();
    return {
      githubUsername: null,
      adding: false,
      newIdentity: null,
      deleting: false,
      bugzillaIdentityUpdate,
      githubIdentityUpdate,
    };
  },
};
</script>

<style>
.edit-identities__verify {
  height: 100%;
  margin: auto 0;
}
.edit-identities__verify > form {
  height: 100%;
  appearance: button;
}
.edit-identities__verify button {
  background-color: var(--true-green);
  height: 100%;
  padding-left: 2em;
  padding-right: 2em;
  color: var(--white);
  text-transform: uppercase;
  border-radius: var(--imageRadius);
  border: 1px solid transparent;
}
.edit-identities__verify button:hover {
  background-color: var(--white);
  border: 1px solid var(--true-green);
  color: var(--true-green);
}
.edit-identity__item .input {
  position: relative;
}
.edit-identity__item .input input {
  width: 100%;
  padding-right: 5em;
}
.edit-identity__item .input input + span {
  position: absolute;
  bottom: 1em;
  right: 1em;
  font-size: 0.85em;
  color: var(--true-green);
  letter-spacing: 0.1em;
}
.edit-identity__add-more {
  margin-left: auto;
}
</style>
