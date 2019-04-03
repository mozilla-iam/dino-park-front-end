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
        @submit.prevent="mutate()"
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
    handleError() {
      this.$parent.$emit('toast', {
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
  z-index: 1;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0.5, 0.5, 0.5, 0.5);
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
.edit-personal-info {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0.5em;
}
.edit-personal-info fieldset {
  border: 0;
}
.edit-personal-info > label,
.edit-personal-info__label {
  color: var(--gray-50);
  margin: 0.5em 0 0;
  grid-column: 1 / -1;
}
.edit-personal-info > label::after {
  content: ':';
}
.edit-personal-info > hr {
  margin: 1em -1.5em;
  grid-column: 1 / -1;
}
.edit-personal-info > input,
.edit-personal-info > div > input,
.edit-personal-info > textarea,
.edit-personal-info > select {
  border: 0;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
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
.edit-personal-info__picture {
  border: none;
  background: none;
}
.edit-personal-info__meta {
  grid-column: 1 / -1;
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
    grid-template-columns: 20em 10em 1fr auto;
    grid-column-gap: 1em;
    margin: 2em 1em;
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
  .edit-personal-info > input,
  .edit-personal-info > div > input,
  .edit-personal-info > textarea,
  .edit-personal-info > select {
    margin: 0.5em 0;
  }
  .edit-personal-info > input {
    grid-column: 3 / 4;
  }
  .edit-personal-info > textarea {
    grid-column: 2 / 4;
  }
  .edit-personal-info__picture {
    grid-column: 1 / 2;
    grid-row: 1 / 8;
    position: relative;
  }
  .edit-personal-info__picture .edit-personal-info__picture-privacy,
  .edit-personal-info__picture .edit-personal-info__picture-edit-button {
    position: absolute;
    top: 15.5em;
    background-color: var(--gray-20);
    font-size: inherit;
    display: flex;
    border-radius: var(--imageRadius);
    color: var(--black);
    border-color: transparent;
  }
  .edit-personal-info__picture-edit-button {
    left: 1.1em;
  }
  .edit-personal-info .edit-personal-info__picture-edit-button svg {
    margin: 0;
  }
  .edit-personal-info__picture-privacy {
    right: 2.1em;
  }
  .edit-personal-info__picture button {
    background-color: var(--gray-20);
    font-size: inherit;
  }
  .edit-personal-info__privacy,
  .privacy-setting {
    grid-column: 4 / 5;
    align-self: center;
    justify-self: center;
  }
  .edit-personal-info__meta {
    grid-column: 2 / 4;
  }
}
</style>
