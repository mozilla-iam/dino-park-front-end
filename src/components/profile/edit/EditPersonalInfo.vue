<template>
  <ApolloMutation
    :mutation="mutateProfile"
    :variables="{
      username,
      firstName,
      lastName,
      alternativeName,
      funTitle,
      pronouns,
      location,
      timezone,
      description,
    }"
    :update="updateCache"
    @done="handleSuccess"
    @error="handleError"
    clientId="mutationClient"
  >
    <template slot-scope="{ mutate, data, error }">
      <form
        action=""
        @submit.prevent="mutate()"
        aria-label="Edit personal information"
      >
        <div class="edit-personal-info">
          <label for="field-first-name">First name</label>
          <input type="text" id="field-first-name" v-model="firstName.value" />
          <div class="edit-personal-info__privacy">
            <Select
              label="First name privacy levels"
              id="field-first-name-privacy"
              v-bind="privacySettings"
              v-model="firstName.display"
              :options="displayLevelsFor(firstName.value)"
            />
          </div>

          <hr role="presentation" />

          <label for="field-last-name">Last name</label>
          <input type="text" id="field-last-name" v-model="lastName.value" />
          <div class="edit-personal-info__privacy">
            <Select
              label="Last name privacy levels"
              id="field-last-name-privacy"
              v-bind="privacySettings"
              v-model="lastName.display"
              :options="displayLevelsFor(lastName.value)"
            />
          </div>

          <hr role="presentation" />

          <label for="field-pronouns" class="edit-personal-info__label"
            >Gender pronouns</label
          >
          <Combobox
            id="field-pronouns"
            v-model="pronouns.value"
            placeholder="Choose a pronoun or type your own"
            :source="['He/Him', 'She/Her', 'They/Them']"
          >
          </Combobox>
          <div class="edit-personal-info__privacy">
            <Select
              label="Pronoun privacy levels"
              id="field-pronoun-privacy"
              v-bind="privacySettings"
              v-model="pronouns.display"
              :options="displayLevelsFor(pronouns.value)"
            />
          </div>

          <hr role="presentation" />

          <label for="field-alt-name">Alternative name</label>
          <input
            type="text"
            id="field-alt-name"
            v-model="alternativeName.value"
          />
          <div class="edit-personal-info__privacy">
            <Select
              label="Alternative name privacy levels"
              id="field-alt-name-privacy"
              v-bind="privacySettings"
              v-model="alternativeName.display"
              :options="displayLevelsFor(alternativeName.value)"
            />
          </div>

          <hr role="presentation" />

          <label for="field-official-job-title">Official job title</label>
          <input type="text" disabled value="Staff Software Engineer" />

          <hr role="presentation" />

          <label for="field-fun-job-title">Fun job title</label>
          <input
            type="text"
            id="field-fun-job-title"
            v-model="funTitle.value"
          />
          <div class="edit-personal-info__privacy">
            <Select
              label="Fun title privacy levels"
              id="field-fun-title-privacy"
              v-bind="privacySettings"
              v-model="funTitle.display"
              :options="displayLevelsFor(funTitle.value)"
            />
          </div>
          <hr role="presentation" />

          <label for="field-location">Location</label>
          <Combobox
            id="field-location"
            v-model="location.value"
            :allowCustomInput="false"
            :source="[
              'Berlin',
              'Rotterdam',
              'San Francisco',
              'Cluj-Napoca',
              'München',
            ]"
          >
          </Combobox>

          <div class="edit-personal-info__privacy">
            <Select
              label="Location privacy levels"
              id="field-location-privacy"
              v-bind="privacySettings"
              v-model="location.display"
              :options="displayLevelsFor(location.value)"
            />
          </div>
          <hr role="presentation" />

          <label for="field-timezone">Timezone</label>
          <input type="text" id="field-timezone" v-model="timezone.value" />
          <div class="edit-personal-info__privacy">
            <Select
              label="Timezone privacy levels"
              id="field-timezone-privacy"
              v-bind="privacySettings"
              v-model="timezone.display"
              :options="displayLevelsFor(timezone.value)"
            />
          </div>
          <hr role="presentation" />

          <div class="edit-personal-info__meta">
            Worker type, desk number, department, cost centre
          </div>

          <hr role="presentation" />

          <label for="field-bio">Bio</label>
          <textarea id="field-bio" v-model="description.value"></textarea>
          <div class="edit-personal-info__privacy">
            <Select
              label="Bio privacy levels"
              id="field-bio-privacy"
              v-bind="privacySettings"
              v-model="description.display"
              :options="displayLevelsFor(description.value)"
            />
          </div>
        </div>
        <div class="button-bar">
          <button
            type="button"
            class="button button--secondary"
            @click="$emit('toggle-edit-mode')"
          >
            Cancel
          </button>
          <button type="submit" class="button">Save</button>
        </div>
      </form>
    </template>
  </ApolloMutation>
</template>

<script>
import Combobox from '@/components/ui/Combobox.vue';
import Select from '@/components/ui/Select.vue';

import { MUTATE_PROFILE, DISPLAY_PROFILE } from '@/queries/profile';
import { displayLevelsFor, DISPLAY_LEVELS } from '@/assets/js/display-levels';

export default {
  name: 'EditPersonalInfo',
  props: {
    username: String,
    initialValues: Object,
  },
  components: {
    Combobox,
    Select,
  },
  methods: {
    displayLevelsFor,
    cancelEdit() {
      this.$emit('cancel-edit');
    },
    handleError() {
      this.$emit('toast', {
        content: 'A problem occured, please try again later.',
      });
    },
    handleSuccess() {},
    updateCache(
      store,
      {
        data: { profile },
      },
    ) {
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
        data: { profile: { ...data.profile, ...profile } },
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
      ...Object.entries(this.initialValues).reduce(
        (
          obj,
          [
            key,
            {
              value,
              metadata: { display },
            },
          ],
        ) => {
          obj[key] = {
            value,
            display: display || DISPLAY_LEVELS.public.value,
          };
          return obj;
        },
        {},
      ),
      privacySettings: {
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
  margin: 0.5em 0 0;
}
.edit-personal-info > label::after {
  content: ':';
}
.edit-personal-info > hr {
  margin: 1em -2.4em;
}
.edit-personal-info > input,
.edit-personal-info > div > input,
.edit-personal-info > textarea,
.edit-personal-info > select {
  border: 0;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0.5em 0;
  padding: 0.5em 0.9em;
  width: 100%;
}
.edit-personal-info > textarea {
  resize: none;
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
@media (min-width: 57.5em) {
  .edit-personal-info {
    display: grid;
    grid-template-columns: 20em 10em 1fr 4em;
    grid-column-gap: 1em;
  }
  .edit-personal-info > hr {
    grid-column: 2 / end;
    margin: 0.5em 0;
  }
  .edit-personal-info > label,
  .edit-personal-info__label {
    grid-column: 2 / 3;
  }
  @supports (display: grid) {
    .edit-personal-info > label {
      padding: 0.5em 0;
      margin: 0.5em 0;
    }
    .edit-personal-info > input[disabled] {
      padding-left: 0.25em;
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
