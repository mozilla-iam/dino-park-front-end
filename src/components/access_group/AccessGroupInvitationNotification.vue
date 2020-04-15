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
        {{ getInvitationText(notification) }}
      </p>
      <p
        class="invitation-notification__description"
        v-else-if="isInvitationPendingRejection(notification)"
      >
        {{ fluent('access-group_notifications', 'rejection') }}
      </p>
      <div class="invitation-notification__actions">
        <template v-if="isInvitationInitial(notification)">
          <Button class="primary-action" v-on:click="handleAcceptClick(idx)">{{
            fluent('access-group_notifications', 'continue-action')
          }}</Button>
          <Button
            class="secondary-action button--secondary button--action"
            v-on:click="handleRejectClick(idx)"
            >{{ fluent('access-group_notifications', 'reject-action') }}</Button
          >
        </template>
        <template v-if="isInvitationPendingRejection(notification)">
          <Button
            class="secondary-action button--secondary button--action"
            v-on:click="handleRejectClick(idx)"
            >{{
              fluent('access-group_notifications', 'confirm-action')
            }}</Button
          >
          <Button
            class="primary-action"
            v-on:click="handleInvitationBack(idx)"
            >{{ fluent('access-group_notifications', 'back-action') }}</Button
          >
        </template>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import { INVITATION_STATE } from '@/view_models/AccessGroupViewModel';
import { ACCESS_GROUP_TOS_PAGE } from '@/router';

const PENDING_REJECTION = 'PENDING_REJECTION';

export default {
  name: 'AccessGroupInvitationNotification',
  components: { Button, Icon },
  mixins: [LinksMixin],
  props: {},
  methods: {
    ...mapActions({
      acceptInvitation: 'userV2/acceptInvitation',
      rejectInvitation: 'userV2/rejectInvitation',
      fetchGroup: 'accessGroup/fetchGroup',
      fetchMembers: 'accessGroup/fetchMembers',
      setLoading: 'setLoading',
      completeLoading: 'completeLoading',
    }),
    handleAcceptClick(idx) {
      const currentInvitation = this.invitations[idx];
      if (currentInvitation.requiresTos) {
        this.$router.push({
          name: 'Access Group TOS',
          params: { groupname: currentInvitation.groupName },
          query: {
            accept: true,
          },
        });
      } else {
        this.setLoading();
        const completePromise = () => {
          this.$router.push({
            name: 'Access Group',
            params: { groupname: currentInvitation.groupName },
          });
          this.tinyNotification(
            'access-group-joined-group',
            currentInvitation.groupName,
          );
          this.completeLoading();
        };
        if (this.$route.name === 'Access Group') {
          this.acceptInvitation(currentInvitation)
            .then(() => this.fetchGroup(currentInvitation.groupName))
            .then(() => this.fetchMembers(currentInvitation.groupName))
            .then(() => {
              completePromise();
            });
        } else {
          this.acceptInvitation(currentInvitation).then(() => {
            completePromise();
          });
        }
      }
    },
    handleRejectClick(idx) {
      const currentInvitation = this.invitations[idx];
      if (currentInvitation.state === PENDING_REJECTION) {
        this.rejectInvitation(currentInvitation).then((result) => {
          this.tinyNotification(
            'access-group-terms-rejected',
            currentInvitation.groupName,
          );
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
    getInvitationText(invitation) {
      return this.fluent('access-group_notifications', 'invitation').replace(
        '[]',
        invitation.groupName,
      );
    },
  },
  computed: {
    ...mapGetters({
      invitations: 'userV2/getActiveInvitations',
    }),
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

@media (min-width: 57.5em) {
  .invitation-notification-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5em 1em;
  }
}

.invitation-notification-item:first-child {
  margin-top: 0;
}

.invitation-notification-item:last-child {
  margin-bottom: 0;
}

.invitation-notification-container .invitation-notification__icon {
  color: var(--blue-60);
  display: inline-block;
  width: 3em;
  text-align: left;
  margin-right: 0.5em;
}

@media (min-width: 57.5em) {
  .invitation-notification-container .invitation-notification__icon {
    width: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 0;
  }
}

.invitation-notification-container .invitation-notification__description {
  margin: 0;
  text-align: left;
  width: calc(100% - 5em);
  display: inline-block;
  vertical-align: top;
}

@media (min-width: 57.5em) {
  .invitation-notification-container .invitation-notification__description {
    margin: 0;
    flex: 1;
    text-align: left;
    padding-left: 1em;
    width: auto;
  }
}

.invitation-notification-container .invitation-notification__actions {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
}

@media (min-width: 57.5em) {
  .invitation-notification-container .invitation-notification__actions {
    width: auto;
    margin-top: 0;
  }
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
