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
        :novalidate="novalidate"
        v-on:submit.prevent="(ev) => check(mutate, ev)"
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
    novalidate: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    check(mutate, ev) {
      if (this.novalidate) {
        const form = ev.target;
        if (form.checkValidity()) {
          return mutate(ev);
        }
        return ev.preventDefault();
      }
      return mutate(ev);
    },
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
      this.$root.$emit('toast', {
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
        variables: {
          username: null,
        },
      });
      store.writeQuery({
        query: DISPLAY_PROFILE,
        variables: {
          username: null,
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
      this.$root.$emit('toast', {
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
    };
  },
};
</script>

<style>
.mutation-form label,
.mutation-form input,
.mutation-form select,
.mutation-form textarea {
  display: block;
  font: inherit;
}
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
.mutation-form > input,
.mutation-form > div > input,
.mutation-form > textarea,
.mutation-form > select {
  border: 1px solid transparent;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
  padding: 0.5em 0.9em;
  width: 100%;
}
.mutation-form input:hover,
.mutation-form textarea:hover,
.mutation-form select:hover,
.mutation-form input:focus,
.mutation-form textarea:focus,
.mutation-form select:focus {
  border: 1px solid var(--blue-60);
}
.mutation-form > input[disabled] {
  background-color: transparent;
  border: 1px solid transparent;
  color: var(--gray-50);
  -webkit-text-fill-color: var(--gray-50);
  padding-left: 0;
  opacity: 1;
}
.mutation-form > input[disabled]:hover {
  border-color: transparent;
}
.mutation-form > textarea {
  resize: none;
}
.mutation-form > input + button {
  margin-top: 1em;
}

.button-bar {
  display: flex;
  margin: 2em -1.5em -1.5em;
  padding: 2em;
  border-top: 2px solid var(--gray-30);
}
.button-bar .button {
  margin-left: 1em;
}
.button-bar .button:first-child {
  margin-left: auto;
}
</style>
