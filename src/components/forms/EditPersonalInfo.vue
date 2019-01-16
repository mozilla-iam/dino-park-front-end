<template>
  <ApolloMutation :mutation="mutateProfile" :variables="{ username, firstName, lastName, alternativeName, funTitle, pronouns, location, timezone, description }" :update="updateCache" @done="handleSuccess" @error="handleError" clientId="mutationClient">
    <template slot-scope="{ mutate, data, error } ">
      <form action="" @submit.prevent="mutate()">
        <fieldset class="edit-personal-info">
          <legend class="visually-hidden">Edit personal info</legend>

          <label for="field-first-name">First name</label>
          <input type="text" id="field-first-name" v-model="firstName">
          <div class="edit-personal-info__privacy">PR</div>

          <label for="field-last-name">Last name</label>
          <input type="text" id="field-last-name" v-model="lastName">
          <div class="edit-personal-info__privacy">PR</div>

          <label for="field-pronouns">Gender pronouns</label>
          <select id="field-pronouns">
            <option>Select pronoun</option>
            <option value="he-him">He/him</option>
            <option value="she-her">She/her</option>
          </select>
          <div class="edit-personal-info__privacy">PR</div>

          <label for="field-alt-name">Alternative name</label>
          <input type="text" id="field-alt-name" v-model="alternativeName">
          <div class="edit-personal-info__privacy">PR</div>

          <label for="field-official-job-title">Official job title</label>
          <input type="text" disabled value="Staff Software Engineer">

          <label for="field-fun-job-title">Fun job title</label>
          <input type="text" id="field-fun-job-title" v-model="funTitle">
          <div class="edit-personal-info__privacy">PR</div>

          <label for="field-location">Location</label>
          <input type="text" id="field-location" v-model="location">
          <div class="edit-personal-info__privacy">PR</div>

          <label for="field-timezone">Timezone</label>
          <input type="text" id="field-timezone" v-model="timezone">
          <div class="edit-personal-info__privacy">PR</div>

          <div class="edit-personal-info__meta">
            Worker type, desk number, department, cost centre
          </div>
          <div class="edit-personal-info__privacy">PR</div>

          <label for="field-bio">Bio</label>
          <textarea id="field-bio" v-model="description"></textarea>
          <div class="edit-personal-info__privacy">PR</div>
        </fieldset>
        <div class="button-bar">
          <button type="button" class="button button--secondary" @click="$emit('toggle-edit-mode')">Cancel</button>
          <button type="submit" class="button">Save</button>
        </div>
      </form>
    </template>
  </ApolloMutation>
</template>

<script>
import { MUTATE_PROFILE, DISPLAY_PROFILE } from '@/queries/profile';

export default {
  name: 'EditPersonalInfo',
  props: {
    username: String,
    initialValues: Object,
  },
  methods: {
    cancelEdit() {
      this.$emit('cancel-edit');
    },
    handleError() {
      // show toast
    },
    handleSuccess() {
      // show toast
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
    },
  },
  data() {
    return {
      displayProfile: DISPLAY_PROFILE,
      mutateProfile: MUTATE_PROFILE,
      alternativeName: '',
      description: '',
      firstName: '',
      lastName: '',
      funTitle: '',
      location: '',
      primaryEmail: '',
      pronouns: '',
      timezone: '',
      username: 'fiji',
      editMode: false,
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
.edit-personal-info {
  display: grid;
  grid-template-columns: 20em 10em 1fr 4em;
  border: 0;
}
  .edit-personal-info label {
    grid-column: 2 / 3;
    color: var(--gray-60);
    margin: .5em 0;
    padding: .5em 0;
  }
  .edit-personal-info input {
    grid-column: 3 / 4;
  }
  .edit-personal-info input,
  .edit-personal-info textarea,
  .edit-personal-info select {
    background-color: var(--gray-20);
    color: var(--black);
    border: 1px solid var(--gray-50);
    margin: .5em 0;
    padding: .5em;
  }
  .edit-personal-info input[disabled] {
    background-color: transparent;
    border-color: transparent;
  }
  .edit-personal-info__privacy {
    grid-column: 4 / 5;
    align-self: center;
    justify-self: center;
  }
  .edit-personal-info__meta {
    grid-column: 2 / 4;
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
</style>
