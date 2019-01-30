<template>
  <ApolloMutation :mutation="mutateProfile" :variables="{ username, firstName, lastName, alternativeName, funTitle, pronouns, location, timezone, description }" :update="updateCache" @done="handleSuccess" @error="handleError" clientId="mutationClient">
    <template slot-scope="{ mutate, data, error } ">
      <form action="" @submit.prevent="mutate()" aria-label="Edit personal information">
        <div class="edit-personal-info">
          <label for="field-first-name">First name</label>
          <input type="text" id="field-first-name" v-model="firstName">
          <div class="edit-personal-info__privacy">
            <Options
              label="First name privacy levels"
              id="field-first-name-privacy"
              v-bind="privacySettings"
              :options="displayLevelsFor(firstName)" />
          </div>

          <hr role="presentation">

          <label for="field-last-name">Last name</label>
          <input type="text" id="field-last-name" v-model="lastName">
          <div class="edit-personal-info__privacy">
            <Options
              label="Last name privacy levels"
              id="field-last-name-privacy"
              v-bind="privacySettings"
              :options="displayLevelsFor(lastName)" />
          </div>

          <hr role="presentation">

          <div class="edit-personal-info__label">Gender pronouns</div>
          <Options label="Select pronoun" id="field-pronouns" :defaultToFirst="true" :options="[
            {
              label: 'Select pronoun',
              value: '',
            },
            {
              label: 'He/Him',
              value: 'hehim',
            },
            {
              label: 'She/Her',
              value: 'sheher',
            },
            {
              label: 'They/Them',
              value: 'theythem',
            },
            {
              label: 'Ze/Hir',
              value: 'zehir',
            },
          ]">
          </Options>
          <div class="edit-personal-info__privacy">
            <Options
              label="Pronoun privacy levels"
              id="field-pronoun-privacy"
              v-bind="privacySettings"
              :options="displayLevelsFor(pronouns)" />
          </div>

          <hr role="presentation">

          <label for="field-alt-name">Alternative name</label>
          <input type="text" id="field-alt-name" v-model="alternativeName">
          <div class="edit-personal-info__privacy">
            <Options
              label="Alternative name privacy levels"
              id="field-alt-name-privacy"
              v-bind="privacySettings"
              :options="displayLevelsFor(alternativeName)" />
          </div>

          <hr role="presentation">

          <label for="field-official-job-title">Official job title</label>
          <input type="text" disabled value="Staff Software Engineer">

          <hr role="presentation">

          <label for="field-fun-job-title">Fun job title</label>
          <input type="text" id="field-fun-job-title" v-model="funTitle">
          <div class="edit-personal-info__privacy">
            <Options
              label="Fun title privacy levels"
              id="field-fun-title-privacy"
              v-bind="privacySettings"
              :options="displayLevelsFor(funTitle)" />
          </div>
          <hr role="presentation">

          <label for="field-location">Location</label>
          <input type="text" id="field-location" v-model="location">
          <div class="edit-personal-info__privacy">
            <Options
              label="Location privacy levels"
              id="field-location-privacy"
              v-bind="privacySettings"
              :options="displayLevelsFor(location)" />
          </div>
          <hr role="presentation">

          <label for="field-timezone">Timezone</label>
          <input type="text" id="field-timezone" v-model="timezone">
          <div class="edit-personal-info__privacy">
            <Options
              label="Timezone privacy levels"
              id="field-timezone-privacy"
              v-bind="privacySettings"
              :options="displayLevelsFor(timezone)" />
          </div>
          <hr role="presentation">

          <div class="edit-personal-info__meta">
            Worker type, desk number, department, cost centre
          </div>

          <hr role="presentation">

          <label for="field-bio">Bio</label>
          <textarea id="field-bio" v-model="description"></textarea>
          <div class="edit-personal-info__privacy">
            <Options
              label="Bio privacy levels"
              id="field-bio-privacy"
              v-bind="privacySettings"
              :options="displayLevelsFor(description)" />
          </div>
        </div>
        <div class="button-bar">
          <button type="button" class="button button--secondary" @click="$emit('toggle-edit-mode')">Cancel</button>
          <button type="submit" class="button">Save</button>
        </div>
      </form>
    </template>
  </ApolloMutation>
</template>

<script>
import Options from '@/components/Options.vue';

import { MUTATE_PROFILE, DISPLAY_PROFILE } from '@/queries/profile';
import DisplayLevelsMixin from '@/components/mixins/DisplayLevelsMixin.vue';

export default {
  name: 'EditPersonalInfo',
  props: {
    username: String,
    initialValues: Object,
  },
  components: {
    Options,
  },
  mixins: [DisplayLevelsMixin],
  methods: {
    cancelEdit() {
      this.$emit('cancel-edit');
    },
    handleError() {
      this.$emit('toast', {
        content: 'A problem occured, please try again later.',
      });
    },
    handleSuccess() {
    },
    updateCache(store, { data: { updateProfile } }) {
      const data = store.readQuery({
        query: DISPLAY_PROFILE,
        variables: {
          username: this.username,
        },
      });

      store.writeQuery({
        query: DISPLAY_PROFILE,
        variables: {
          username: this.username,
        },
        data: { displayProfile: { ...data.displayProfile, ...updateProfile } },
      });

      this.$emit('toggle-edit-mode');
      this.$emit('toast', {
        content: 'Your changes have been saved. Thank you.',
      });
    },
  },
  data() {
    return {
      displayProfile: DISPLAY_PROFILE,
      mutateProfile: MUTATE_PROFILE,
      alternativeName: this.initialValues.alternativeName.value,
      firstName: this.initialValues.firstName.value,
      lastName: this.initialValues.lastName.value,
      funTitle: this.initialValues.funTitle.value,
      location: this.initialValues.location.value,
      pronouns: this.initialValues.pronouns.value,
      timezone: this.initialValues.timezone.value,
      description: this.initialValues.description.value,
      privacySettings: {
        defaultToFirst: true,
        collapsedShowIcon: true,
        collapsedShowLabel: false,
        expandedShowIcon: true,
        expandedShowLabel: true,
        class: 'options--zebra',
      },
    };
  },
};
</script>

<style>
label,
input,
select,
textarea {
  display: block;
  font: inherit;
}
.edit-personal-info fieldset {
  border: 0;
}
  .edit-personal-info > label,
  .edit-personal-info__label {
    color: var(--gray-50);
    margin: .5em 0 0;
  }
  .edit-personal-info > label::after {
    content: ':';
  }
  .edit-personal-info > hr {
    margin: 1em -2.4em;
  }
  .edit-personal-info > input,
  .edit-personal-info > textarea,
  .edit-personal-info > select {
    background-color: var(--gray-20);
    color: var(--black);
    border: 1px solid var(--gray-50);
    margin: .5em 0;
    padding: .5em;
    width: 100%;
  }
  .edit-personal-info > input[disabled] {
    background-color: transparent;
    border-color: transparent;
    color: var(--gray-50);
    padding-left: 0;
  }
  .button-bar {
    display: flex;
    margin: 2em -1.5em -1.5em;
    padding: 2em;
    border-top: 2px solid var(--gray-30);
  }
    .button-bar button {
      margin-left: 1em;
    }
    .button-bar button:first-child {
      margin-left: auto;
    }
@media (min-width:57.5em) {
  .edit-personal-info {
    display: grid;
    grid-template-columns: 20em 10em 1fr 4em;
    grid-column-gap: 1em;
  }
    .edit-personal-info > hr {
      grid-column: 2 / end;
      margin: .5em 0;
    }
    .edit-personal-info > label,
    .edit-personal-info__label {
      grid-column: 2 / 3;
    }
    @supports (display:grid) {
      .edit-personal-info > label {
        padding: .5em 0;
        margin: .5em 0;
      }
      .edit-personal-info > input[disabled] {
        padding-left: .25em;
      }
    }
    .edit-personal-info > input {
      grid-column: 3 / 4;
    }
    .edit-personal-info > textarea {
      grid-column: 2 / 4;
    }
    .edit-personal-info__privacy {
      grid-column: 4 / 5;
      align-self: center;
      justify-self: center;
    }
    .edit-personal-info__meta {
      grid-column: 2 / 4;
    }
}
</style>
