  <template>
  <div>
    <ApolloQuery v-if="!editMode" :query="displayProfile" :variables="{ username, firstName, lastName, primaryEmail }" clientId="mutationClient" ref="examplequery">
      <template v-if="data" slot-scope="{ result: { loading, data, error, refetch } }">
        <!-- <ViewPersonalInfo v-bind="data.displayProfile" :manager="{ value: 'John' }" /> -->
        <ul>
          <li>username: {{ username }}</li>
          <li>firstName: {{ data.displayProfile.firstName.value }}</li>
          <li>last name: {{ data.displayProfile.lastName.value }}</li>
          <li>primary email: {{ data.displayProfile.primaryEmail.value }}</li>
        </ul>
        <button @click="editMode = true">Edit</button>
      </template>
    </ApolloQuery>
    <ApolloMutation v-else :mutation="mutateProfile" :variables="{ username, firstName, lastName, primaryEmail }" :update="updateCache" @done="handleSuccess" @error="handleError" clientId="mutationClient" ref="">
      <template slot-scope="{ mutate, data, error } ">
          <form action="" @submit.prevent="mutate()">
            <fieldset>
              <legend>Edit First Name and Last Name</legend>
              <label for="field-first-name">First name</label>
              <input type="text" id="field-first-name" v-model="firstName">
              <label for="field-last-name">Last name</label>
              <input type="text" id="field-last-name" v-model="lastName">
              <label for="field-last-name">Primary email</label>
              <input type="email" id="field-last-email" v-model="primaryEmail">
              <button type="button" class="button button--secondary" @click="cancelEdit">Cancel</button>
              <button type="submit" class="button">Save</button>
            </fieldset>
          </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import { MUTATE_PROFILE, DISPLAY_PROFILE } from '@/queries/profile';
import ViewPersonalInfo from '@/components/ViewPersonalInfo.vue';

export default {
  name: 'EditPersonalInfo',
  props: {
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

      this.editMode = false;
    },
  },
  components: {
    ViewPersonalInfo,
  },
  data() {
    return {
      displayProfile: DISPLAY_PROFILE,
      mutateProfile: MUTATE_PROFILE,
      firstName: '',
      lastName: '',
      primaryEmail: '',
      username: 'fiji',
      editMode: false,
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
