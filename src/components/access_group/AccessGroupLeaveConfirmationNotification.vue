<template>
  <article
    class="notification-container leave-confirmation-notification-container"
    v-if="showLeaveConfirmationNotification"
  >
    <template v-if="showCantLeave">
      <span class="leave-confirmation-notification__icon">
        <Icon id="crown" :width="32" :height="32" />
      </span>
      <p class="leave-confirmation-notification__description">
        {{ fluent('access-group_notifications', 'cannot-leave-1') }} <br />
        {{ fluent('access-group_notifications', 'cannot-leave-2') }}
        <span class="focus"
          >{{ fluent('access-group_notifications', 'cannot-leave-2') }}
        </span>
        {{ cannotLeaveContactLine }}
      </p>
      <div class="leave-confirmation-notification__actions">
        <RouterLink
          class="button secondary-action"
          :to="{
            name: 'Access Group',
          }"
          >{{
            fluent('access-group_notifications', 'close-action')
          }}</RouterLink
        >
      </div>
    </template>
    <template v-else>
      <span class="leave-confirmation-notification__icon">
        <Icon id="question-mark-circle" :width="32" :height="32" />
      </span>
      <p class="leave-confirmation-notification__description">
        {{ confirmLeaveText }}
      </p>
      <div class="leave-confirmation-notification__actions">
        <Button class="primary-action" v-on:click="handleLeaveClick()">{{
          fluent('access-group_notifications', 'leave-action')
        }}</Button>
        <RouterLink
          class="button secondary-action button--secondary button--action"
          :to="{
            name: 'Access Group',
          }"
          >{{
            fluent('access-group_notifications', 'cancel-action')
          }}</RouterLink
        >
      </div>
    </template>
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
    showLeaveConfirmationNotification() {
      return this.$route.name === ACCESS_GROUP_LEAVE_CONFIRMATION_PAGE;
    },
    cannotLeaveContactLine() {
      return this.fluent(
        'access-group_notifications',
        'cannot-leave-4',
      ).replace('[]', this.administratorEmail);
    },
    confirmLeaveText() {
      return this.fluent('access-group_notifications', 'leave-confirm').replace(
        '[]',
        this.$route.params.groupname,
      );
    },
    leaveAlertText() {
      return this.fluent('access-group_notifications', 'leave-alert').replace(
        '[]',
        this.$route.params.groupname,
      );
    },
  },
  data() {
    return {
      showCantLeave: false,
    };
  },
  methods: {
    ...mapActions({
      setLoading: 'setLoading',
      completeLoading: 'completeLoading',
    }),
    async leaveGroup() {
      const r = await this.accessGroupApi.execute({
        path: 'self/delete',
        endpointArguments: [this.$route.params.groupname],
      });
      return r?.error !== 'last_admin_of_group';
    },
    async handleLeaveClick() {
      this.setLoading();
      const couldLeave = await this.leaveGroup();
      if (!couldLeave) {
        this.showCantLeave = true;
        return;
      }
      this.tinyNotification(
        'access-group-left-group',
        this.$route.params.groupname,
      );
      this.$router.replace({
        name: 'Access Group',
      });
      this.$root.$emit('dp-reload-group');
      this.completeLoading();
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
  flex: 1;
}
.leave-confirmation-notification-container
  .leave-confirmation-notification__description {
  padding-left: 1em;
  flex: 15;
}

.leave-confirmation-notification-container
  .leave-confirmation-notification__actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 5;
}

.leave-confirmation-notification__actions .button {
  margin: 0 1em;
}
</style>
