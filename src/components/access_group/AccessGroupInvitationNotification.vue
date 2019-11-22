<template>
  <article
    class="notification-container invitation-notification-container"
    v-if="showInvitations && invitations.length > 0"
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
      <footer class="invitation-notification__actions">
        <template v-if="isInvitationInitial(notification)">
          <Button class="primary-action" v-on:click="handleAcceptClick(idx)"
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
import { ACCESS_GROUP_TOS_PAGE } from '@/router';

const PENDING_REJECTION = 'PENDING_REJECTION';

export default {
  name: 'AccessGroupInvitationNotification',
  components: { Button },
  mixins: [LinksMixin],
  props: {},
  methods: {
    handleAcceptClick(idx) {
      const currentInvitation = this.invitations[idx];
      if (currentInvitation.requires_tos) {
        this.$router.push({
          name: 'Access Group TOS',
          params: { groupname: currentInvitation.group_name },
          query: {
            accept: true,
          },
        });
      } else {
        this.$store.dispatch('acceptGroupInvitation', idx).then(() => {
          this.$router.push({
            name: 'Access Group',
            params: { groupname: currentInvitation.group_name },
          });
        });
      }
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
    showInvitations() {
      return this.$route.name !== ACCESS_GROUP_TOS_PAGE;
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
.invitation-notification-item {
  background: #f2fcfd;
  border: 1px solid var(--blue-60);
  border-radius: var(--formElementRadius);
  text-align: center;
  padding: 1em;
  margin: 1em 0;
}

.invitation-notification-item:first-child {
  margin-top: 0;
}

.invitation-notification-item:last-child {
  margin-bottom: 0;
}

.invitation-notification-container .invitation-notification__description {
  margin-top: 0;
}

.invitation-notification-container .invitation-notification__actions {
  margin-top: 1em;
}

.invitation-notification-container .invitation-notification__actions .button {
  margin: 0 1em;
  display: inline-block;
}

.invitation-notification-container
  .invitation-notification__actions
  .button:first-child {
  margin-left: 0;
}
</style>
