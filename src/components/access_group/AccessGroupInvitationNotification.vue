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
      <span class="invitation-notification__icon">
        <Icon :id="getInvitationIcon(notification)" :width="32" :height="32" />
      </span>
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
        Are you sure you wish to reject this invitation?
      </p>
      <div class="invitation-notification__actions">
        <template v-if="isInvitationInitial(notification)">
          <Button class="primary-action" v-on:click="handleAcceptClick(idx)"
            >Continue</Button
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
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import { INVITATION_STATE } from '@/view_models/AccessGroupViewModel';
import {
  ACCESS_GROUP_TOS_PAGE,
  ACCESS_GROUP_LEAVE_CONFIRMATION_PAGE,
} from '@/router';

const PENDING_REJECTION = 'PENDING_REJECTION';

export default {
  name: 'AccessGroupInvitationNotification',
  components: { Button, Icon },
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
        this.$store.dispatch('userV2/acceptInvitation', idx).then(() => {
          this.$router.push({
            name: 'Access Group',
            params: { groupname: currentInvitation.group_name },
          });
          this.$root.$emit('toast', {
            content: 'You accepted the terms for this group.',
          });
        });
      }
    },
    handleRejectClick(idx) {
      const currentInvitation = this.invitations[idx];
      if (currentInvitation.state === PENDING_REJECTION) {
        this.$store.dispatch('userV2/rejectInvitation', idx).then(() => {
          this.$root.$emit('toast', {
            content: `You rejected the invite for group ${currentInvitation.group_name}.`,
          });
        });
      } else if (currentInvitation.state === '') {
        currentInvitation.state = PENDING_REJECTION;
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
    getInvitationIcon(invitation) {
      return invitation.state === '' ? 'user-plus' : 'question-mark-circle';
    },
  },
  computed: {
    ...mapGetters({
      invitations: 'userV2/getActiveInvitations',
    }),
    showInvitations() {
      return (
        this.$route.name !== ACCESS_GROUP_TOS_PAGE &&
        this.$route.name !== ACCESS_GROUP_LEAVE_CONFIRMATION_PAGE
      );
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
  padding: 0.5em 1em;
  margin: 1em 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.invitation-notification-item:first-child {
  margin-top: 0;
}

.invitation-notification-item:last-child {
  margin-bottom: 0;
}

.invitation-notification-container .invitation-notification__icon {
  color: var(--blue-60);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7%;
  text-align: left;
}

.invitation-notification-container .invitation-notification__description {
  margin: 0;
  flex: 1;
  text-align: left;
  padding-left: 1em;
}

.invitation-notification-container .invitation-notification__actions {
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
