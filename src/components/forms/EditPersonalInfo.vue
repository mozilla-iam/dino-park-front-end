<template>
  <ApolloMutation :mutation="mutateProfile" :variables="{ userId, firstName, lastName, primaryEmail }" @done="done = true" @error="handleError()">
    <template slot-scope="{ mutate, data, error } ">
        <form action="" @submit.prevent="mutate()">
          <fieldset>
            <legend>Edit First Name and Last Name</legend>
            <div class="success" v-if="done">
              <p>Data submitted</p>
            </div>
            <template v-else>
              <label for="field-first-name">First name</label>
              <input type="text" id="field-first-name" v-model="firstName">
              <label for="field-last-name">Last name</label>
              <input type="text" id="field-last-name" v-model="lastName">
              <label for="field-last-name">Primary email</label>
              <input type="email" id="field-last-email" v-model="primaryEmail">
              <button>Update</button>
            </template>
          </fieldset>
        </form>
    </template>
  </ApolloMutation>
</template>

<script>
export default {
  name: 'MutateDemo',
  props: {
  },
  methods: {
    handleError() {
    },
  },
  data() {
    return {
      mutateProfile: null,
      done: false,
      firstName: '',
      lastName: '',
      primaryEmail: '',
      userId: '',
    };
  },
};
</script>

<style>
  label,
  input {
    display: block;
    font: inherit;
  }
</style>
