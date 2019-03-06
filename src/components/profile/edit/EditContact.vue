<template>
  <ApolloMutation
    :mutation="mutateProfile"
    :variables="{
      phoneNumbers,
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
        aria-label="Edit contact information"
      >
        <div class="edit-personal-info"></div>
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
        data: { updateProfile },
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
        data: { displayProfile: { ...data.displayProfile, ...updateProfile } },
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
  data() {
    return {
      displayProfile: DISPLAY_PROFILE,
      mutateProfile: MUTATE_PROFILE,
      ...Object.entries(this.initialValues).reduce(
        (obj, [key, { value, display }]) => {
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
