<template>
  <ApolloMutation
    :mutation="mutateProfile"
    :variables="editVariables"
    :update="updateCache"
    @done="handleSuccess"
    @error="handleError"
    clientId="mutationClient"
  >
    <template slot-scope="{ mutate, data, loading, error }">
      <form
        class="mutation-form"
        action=""
        v-on:submit.prevent="mutate"
        :aria-label="formName"
      >
        <slot></slot>
        <div class="button-bar">
          <button
            type="button"
            class="button button--secondary"
            @click="
              $router.push({
                name: 'Profile',
                params: {
                  username: loggedInUser,
                },
              })
            "
          >
            Cancel
          </button>
          <button type="submit" class="button">Save</button>
        </div>
      </form>
      <LoadingSpinner v-if="loading"></LoadingSpinner>
    </template>
  </ApolloMutation>
</template>

<script>
import { MUTATE_PROFILE, DISPLAY_PROFILE } from '@/queries/profile';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

export default {
  name: 'EditMutationWrapper',
  components: {
    LoadingSpinner,
  },
  props: {
    initialValues: Object,
    formName: String,
    editVariables: Object,
  },
  methods: {
    handleError(e) {
      let msg = '';
      switch (e.message) {
        case 'GraphQL error: username_exists':
          msg = 'Username already exists. Please choose another one.';
          break;
        case 'GraphQL error: username_length':
          msg =
            'Username must contain between 2 and 64 symbols. Please choose another one.';
          break;
        case 'GraphQL error: username_invalid_chars':
          msg =
            'Username must only contain letters from a-z, digits from 0-9, underscores or hyphens.';
          break;
        default:
          msg = 'A problem occurred, please try again later.';
      }
      this.$parent.$emit('toast', {
        content: msg,
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
      });
      store.writeQuery({
        query: DISPLAY_PROFILE,
        variables: {
          username: this.loggedInUser,
        },
        data: { profile: { ...data.profile, ...profile } },
      });
      // update the logged in user
      this.$store.commit('setUser', { ...data.profile, ...profile });
      this.$router.push({
        name: 'Profile',
        params: {
          username: this.loggedInUser,
        },
      });

      this.$emit('toggle-edit-mode');
      this.$parent.$emit('toast', {
        content: 'Your changes have been saved. Thank you.',
      });
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user.primaryUsername.value;
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
    };
  },
};
</script>

<style>
.mutation-form + .loading {
  position: absolute;
  z-index: var(--layerOne);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-direction: row;
}
label,
input,
select,
textarea {
  display: block;
  font: inherit;
}
</style>
