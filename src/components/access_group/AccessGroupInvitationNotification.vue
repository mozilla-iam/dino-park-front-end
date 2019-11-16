<template>
  <article class="invitation-notification-container">
    <div
      class="invitation-notification-item"
      v-for="(notification, idx) in invitations"
      :key="idx"
    >
      <p class="invitation-notification__description">
        You've been invited to join {{ notification.groupName }} group
      </p>
      <aside
        class="invitation-notification__tos-container"
        v-if="notification.requiresTOS"
      >
        <p class="tos__description">
          Accept
          <a :href="tosUrl">terms of service</a>
        </p>
        <span class="tos__field">
          <input type="checkbox" v-model="notification.acceptedTOS" />
        </span>
      </aside>
      <footer class="invitation-notification_actions">
        <Button
          class="primary-action"
          v-on:click="handleAcceptClick(idx)"
          :disabled="!notification.acceptedTOS"
          >Accept</Button
        >
        <Button
          class="secondary-action button--secondary button--action"
          v-on:click="handleRejectClick(idx)"
          >Reject</Button
        >
      </footer>
    </div>
  </article>
</template>

<script>
import Button from '@/components/ui/Button.vue';

export default {
  name: 'AccessGroupInvitationNotification',
  components: { Button },
  props: {},
  methods: {
    handleAcceptClick(idx) {
      this.$store.commit('acceptGroupInvitation', idx);
    },
    handleRejectClick(idx) {
      this.$store.commit('rejectGroupInvitation', idx);
    },
  },
  computed: {
    invitations() {
      return this.$store.getters.getActiveInvitations;
    },
    // TODO: Move this to somewhere more global
    tosUrl() {
      return `${this.$route.path}/tos`;
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.invitation-notification-container {
  background: #f2fcfd;
  border: 1px solid var(--blue-60);
  border-radius: var(--formElementRadius);
  text-align: center;
  padding: 1em;
}

.invitation-notification-container .invitation-notification__description {
  margin-top: 0;
}

.invitation-notification-container .invitation-notification__tos-container {
  display: flex;
  justify-content: center;
}

.invitation-notification__tos-container .tos__description {
  margin: 0 1em 0 0;
}
.invitation-notification__tos-container .tos__field {
  display: flex;
  align-items: center;
}

.invitation-notification-container .invitation-notification_actions {
  margin-top: 1em;
}

.invitation-notification-container .invitation-notification_actions .button {
  margin: 0 1em;
}

.invitation-notification-container .invitation-notification_actions .button:first-child {
  margin-left: 0;
}
</style>
