<template>
  <article class="invitation-notification-container">
    <p class="invitation-notification__description">
      You've been invited to join {{ groupName }} group
    </p>
    <aside class="invitation-notification__tos-container">
      <p class="tos__description">
        Accept
        <a href="#">terms of service</a>
      </p>
      <span class="tos__field">
        <input type="checkbox" v-model="tosAccepted" />
      </span>
    </aside>
    <footer class="invitation-notification_actions">
      <Button
        class="primary-action"
        v-on:click="handleAcceptClick"
        :disabled="!tosAccepted"
        >Accept</Button
      >
      <Button
        class="secondary-action button--secondary button--action"
        v-on:click="handleRejectClick"
        >Reject</Button
      >
    </footer>
  </article>
</template>

<script>
import Button from '@/components/ui/Button.vue';

export default {
  name: 'AccessGroupInvitationNotification',
  components: { Button },
  props: {
    member: Object,
  },
  methods: {
    handleAcceptClick() {},
    handleRejectClick() {},
  },
  computed: {
    groupName() {
      return this.$store.state.accessGroup.group.name;
    },
  },
  data() {
    return {
      tosAccepted: false,
    };
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
