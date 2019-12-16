<template>
  <article
    class="notification-container leave-confirmation-notification-container"
    v-if="showLeaveConfirmationNotification"
  >
    <span class="leave-confirmation-notification__icon">
      <Icon id="question-mark-circle" :width="32" :height="32" />
    </span>
    <p class="leave-confirmation-notification__description">
      Are you sure you wish to leave the {{ groupName }} group?
    </p>
    <div class="leave-confirmation-notification__actions">
      <Button class="primary-action" v-on:click="handleLeaveClick()"
        >Leave</Button
      >
      <RouterLink
        class="button secondary-action button--secondary button--action"
        :to="{
          name: 'Access Group',
        }"
        >Cancel</RouterLink
      >
    </div>
  </article>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import { ACCESS_GROUP_LEAVE_CONFIRMATION_PAGE } from '@/router';

export default {
  name: 'AccessGroupLeaveConfirmationNotification',
  props: {},
  components: { Icon, Button },
  computed: {
    showLeaveConfirmationNotification() {
      return this.$route.name === ACCESS_GROUP_LEAVE_CONFIRMATION_PAGE;
    },
  },
  methods: {
    handleLeaveClick() {
      const groupName = this.$store.getters.getAccessGroup.name;
      this.$store.dispatch('leaveGroup').then(() => {
        this.$root.$emit('toast', {
          content: `You have left the ${groupName} group`,
        });
        this.$router.push({
          name: 'Access Group',
        });
      });
    },
    handleCancelClick() {
      this.$router.push({
        name: 'Access Group',
      });
    },
  },
  data() {
    return {
      mode: '',
    };
  },
};
</script>

<style>
.leave-confirmation-notification-container {
  background: #f2fcfd;
  border: 1px solid var(--blue-60);
  border-radius: var(--formElementRadius);
  padding: 0.5em 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.leave-confirmation-notification-container
  .leave-confirmation-notification__icon {
  color: var(--blue-60);
}
.leave-confirmation-notification-container
  .leave-confirmation-notification__description {
  padding-left: 1em;
  flex: 1;
}

.leave-confirmation-notification-container
  .leave-confirmation-notification__actions {
  display: flex;
  flex-direction: row;
}

.leave-confirmation-notification__actions .button {
  margin: 0 1em;
}
</style>
