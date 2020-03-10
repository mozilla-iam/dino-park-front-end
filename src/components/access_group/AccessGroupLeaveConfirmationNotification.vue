<template>
  <article
    class="notification-container leave-confirmation-notification-container"
    v-if="showLeaveConfirmationNotification"
  >
    <span class="leave-confirmation-notification__icon">
      <Icon id="question-mark-circle" :width="32" :height="32" />
    </span>
    <p
      class="leave-confirmation-notification__description"
      v-if="canLeaveGroup"
    >
      {{ confirmLeaveText }}
    </p>
    <p class="leave-confirmation-notification__description" v-else>
      {{ leaveAlertText }}
    </p>
    <div class="leave-confirmation-notification__actions" v-if="canLeaveGroup">
      <Button class="primary-action" v-on:click="handleLeaveClick()">{{
        fluent('access-group_notifications', 'leave-action')
      }}</Button>
      <RouterLink
        class="button secondary-action button--secondary button--action"
        :to="{
          name: 'Access Group',
        }"
        >{{ fluent('access-group_notifications', 'cancel-action') }}</RouterLink
      >
    </div>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import { ACCESS_GROUP_LEAVE_CONFIRMATION_PAGE } from '@/router';

export default {
  name: 'AccessGroupLeaveConfirmationNotification',
  props: {},
  components: { Icon, Button },
  computed: {
    ...mapGetters({
      accessGroup: 'accessGroup/getGroup',
      groupName: 'accessGroup/getGroupName',
      getCurators: 'accessGroup/getCurators',
      getProfile: 'userV2/getProfile',
    }),
    showLeaveConfirmationNotification() {
      return this.$route.name === ACCESS_GROUP_LEAVE_CONFIRMATION_PAGE;
    },
    // Determine if the the user is allowed to leave the group, in case they are the last one in the group and the only curator
    canLeaveGroup() {
      if (!this.getCurators.length) {
        return false;
      }
      // Check to see if the current user is in the list of curators
      const matches = this.getCurators.filter(
        curator => curator.uuid === this.getProfile.uuid
      );
      // Return false if the current user is both the last curator and the last member of this group
      if (this.getCurators.length === 1 && matches.length === 1) {
        return false;
      }
      return true;
    },
    confirmLeaveText() {
      return this.fluent('access-group_notifications', 'leave-confirm').replace(
        '[]',
        this.groupName
      );
    },
    leaveAlertText() {
      return this.fluent('access-group_notifications', 'leave-alert').replace(
        '[]',
        this.groupName
      );
    },
  },
  methods: {
    ...mapActions({
      leaveGroup: 'accessGroup/leaveGroup',
      setLoading: 'setLoading',
      completeLoading: 'completeLoading',
    }),
    handleLeaveClick() {
      this.setLoading();
      this.leaveGroup().then(() => {
        this.tinyNotification('access-group-left-group', this.groupName);
        this.$router.replace({
          name: 'Access Group',
        });
        this.completeLoading();
      });
    },
    handleCancelClick() {
      this.$router.push({
        name: 'Access Group',
      });
    },
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 7%;
  text-align: left;
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
