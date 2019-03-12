<template>
  <ApolloMutation
    :mutation="mutateProfile"
    :variables="editVariables"
    :update="updateCache"
    @done="handleSuccess"
    @error="handleError"
    clientId="mutationClient"
  >
    <template slot-scope="{ mutate, data, error }">
      <form action="" @submit.prevent="mutate()" :aria-label="formName">
        <slot></slot>
        <div class="button-bar">
          <button
            type="button"
            class="button button--secondary"
            @click="
              $router.push({
                name: 'Profile',
              })
            "
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
import { MUTATE_PROFILE, DISPLAY_PROFILE } from '@/queries/profile';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';

export default {
  name: 'EditMutationWrapper',
  props: {
    initialValues: Object,
    formName: String,
    editVariables: Object,
  },
  methods: {
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

      this.$router.push({
        name: 'Profile',
      });

      this.$emit('toggle-edit-mode');
      this.$emit('toast', {
        content: 'Your changes have been saved. Thank you.',
      });
    },
  },
  computed: {
    username() {
      return this.$route.params.username;
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
.edit-personal-info__picture {
  border: none;
  background: none;
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
  .edit-personal-info__picture {
    grid-column: 1 / 2;
    grid-row: 1 / 8;
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
