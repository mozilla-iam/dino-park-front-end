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
      class="edit-identity__item edit-identity__item"
    >
      <Button
        class="button--icon-only"
        v-on:click="() => deleteIdentity('github')"
        :disabled="adding"
      >
        <Icon id="x" :width="17" :height="17"></Icon>
        <span class="visually-hidden">Remove GitHub identity</span>
      </Button>
      <span class="edit-identity__item-label">GitHub</span>
      <span class="edit-identity__item-identity">
        {{ githubUsername }}
        <span>Verified</span>
      </span>
      <PrivacySetting
        label="GitHub identity privacy settings"
        id="field-github-privacy"
        :profileFieldObject="githubIdentityUpdate"
      />
      <hr role="presentation" />
    </div>
    <div
      v-if="identities.hasBugzilla() && !bugzillaIdentityUpdate.remove"
      class="edit-identity__item"
    >
      <Button
        class="button--icon-only"
        v-on:click="() => deleteIdentity('bugzilla')"
        :disabled="adding"
      >
        <Icon id="x" :width="17" :height="17"></Icon>
        <span class="visually-hidden">Remove Bugzilla identity</span>
      </Button>
      <span class="edit-identity__item-label">Bugzilla</span>
      <span class="edit-identity__item-identity">
        {{ identities.bugzillaEmail() }}
        <span>Verified</span>
      </span>
      <PrivacySetting
        label="Bugzilla identity privacy settings"
        id="field-bugzilla-privacy"
        :profileFieldObject="bugzillaIdentityUpdate"
      />
      <hr role="presentation" />
    </div>
    <div v-if="adding" class="edit-identity__item">
      <Button class="button--icon-only" v-on:click="cancelAdding">
        <Icon id="x" :width="17" :height="17"></Icon>
        <span class="visually-hidden">Cancel adding new identity</span>
      </Button>
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
        <a v-bind:href="redirect(newIdentity)">
          Verify
        </a>
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
      this.identities.fetchGithubUsername().then(({ username }) => {
        this.githubUsername = username;
      });
    },
    addIdentity() {
      [this.newIdentity] = this.identities.available();
      this.adding = true;
    },
    cancelAdding() {
      this.adding = false;
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
    if (this.identities.githubUsername === null) {
      this.update();
    }
    return {
      githubUsername: this.identities.githubUsername,
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
  display: flex;
}
.edit-identities__verify > a {
  background-color: var(--green-80);
  height: 100%;
  padding-left: 2em;
  padding-right: 2em;
  color: var(--white);
  text-transform: uppercase;
  border-radius: var(--imageRadius);
  border: 1px solid transparent;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.edit-identities__verify > a:hover {
  background-color: var(--white);
  border: 1px solid var(--green-80);
  color: var(--green-80);
}

.edit-identity__item {
  display: grid;
  grid-template-columns: auto 1fr 3fr calc(1em + 17px);
  grid-gap: 1em;
}

.edit-identity__item .button--icon-only {
  border-color: transparent;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  margin-right: 0.5em;
  color: var(--blue-60);
  padding: 0;
}
.edit-identity__item .button--icon-only:hover {
  color: var(--black);
  background-color: transparent;
}

.edit-identity__item-label {
  color: var(--gray-50);
}

.edit-identity__item > hr {
  grid-column: 2/-1;
}

.edit-identity__item .options button {
  width: 100%;
  text-align: left;
}

.edit-identity__item .popover {
  width: 18em;
}

.edit-identity__item span {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
}

.edit-identity__item-identity {
  color: var(--gray-50);
  border: 1px solid var(--gray-30);
  width: 100%;
  padding-right: 0.5em;
  padding-left: 0.5em;
  position: relative;
  grid-column: 2/4;
}
@media (min-width: 57.5em) {
  .edit-identity__item-identity {
    grid-column: 3/4;
  }
}
.edit-identity__item-identity > span {
  font-size: 0.85em;
  color: var(--green-80);
  letter-spacing: 0.1em;
  margin-left: auto;
  margin-right: 0px;
}
.edit-identity__add-more {
  margin-left: auto;
}
</style>
