<template>
  <article
    class="notification-container invitation-notification-container"
    v-if="invitations.length > 0"
  >
    <div
      class="invitation-notification-item"
      v-for="(notification, idx) in invitations"
      :key="idx"
    >
      <p
        class="invitation-notification__description"
        v-if="isInvitationInitial(notification)"
      >
        You've been invited to join {{ notification.group_name }} group
      </p>
      <p
        class="invitation-notification__description"
        v-else-if="isInvitationPendingRejection(notification)"
      >
        Are you sure this is what you want to do?
      </p>
      <aside
        class="invitation-notification__tos-container"
        v-if="notification.requires_tos && isInvitationInitial(notification)"
      >
        <p class="tos__description">
          Accept
          <a :href="tosUrl">terms of service</a>
        </p>
        <span class="tos__field">
          <input type="checkbox" v-model="notification.accepted_tos" />
        </span>
      </aside>
      <footer class="invitation-notification__actions">
        <template v-if="isInvitationInitial(notification)">
          <Button
            class="primary-action"
            v-on:click="handleAcceptClick(idx)"
            :disabled="!isInvitationAcceptable(notification)"
            >Accept</Button
          >
          <Button
            class="secondary-action button--secondary button--action"
            v-on:click="handleRejectClick(idx)"
            >Reject</Button
          >
        </template>
        <template v-if="isInvitationPendingRejection(notification)">
          <Button
            class="secondary-action button--secondary button--action"
            v-on:click="handleRejectClick(idx)"
            >Confirm</Button
          >
          <Button class="primary-action" v-on:click="handleInvitationBack(idx)"
            >Back</Button
          >
        </template>
      </footer>
    </div>
  </article>
</template>

<script>
import Button from '@/components/ui/Button.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import { INVITATION_STATE } from '@/view_models/AccessGroupViewModel';
import router from '@/router';
const PENDING_REJECTION = 'PENDING_REJECTION';

export default {
  name: 'AccessGroupInvitationNotification',
  components: { Button },
  mixins: [LinksMixin],
  props: {},
  methods: {
    handleAcceptClick(idx) {
      const currentInvitation = this.invitations[idx];
      this.$store.dispatch('acceptGroupInvitation', idx).then(result => {
        router.push({
          name: 'Access Group',
          params: { groupid: currentInvitation.group_name },
        });
      });
    },
    handleRejectClick(idx) {
      if (this.invitations[idx].state === PENDING_REJECTION) {
        this.$store.dispatch('rejectGroupInvitation', idx);
      } else if (this.invitations[idx].state === '') {
        this.invitations[idx].state = PENDING_REJECTION;
      }
    },
    handleInvitationBack(idx) {
      this.invitations[idx].state = '';
    },
    isInvitationAcceptable(notification) {
      if (!notification) {
        return false;
      }
      return (
        !notification.requires_tos ||
        (notification.requires_tos && notification.accepted_tos)
      );
    },
    isInvitationInitial(invitation) {
      return invitation.state === '';
    },
    isInvitationAccepted(invitation) {
      return invitation.state === INVITATION_STATE.ACCEPTED;
    },
    isInvitationRejected(invitation) {
      return invitation.state === INVITATION_STATE.REJECTED;
    },
    isInvitationPendingRejection(invitation) {
      return invitation.state === PENDING_REJECTION;
    },
  },
  computed: {
    invitations() {
      return this.$store.getters.getActiveInvitations;
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

.invitation-notification-container .invitation-notification__actions {
  margin-top: 1em;
}

.invitation-notification-container .invitation-notification__actions .button {
  margin: 0 1em;
  display: inline-block;
}

.invitation-notification-container .invitation-notification__actions .button:first-child {
  margin-left: 0;
}
</style>
