<template>
  <article
    class="notification-container tos-acceptance-notification-container"
    v-if="showTOSAcceptanceNotification"
  >
    <span class="acceptance-notification__icon">
      <Icon id="info" :width="32" :height="32" />
    </span>
    <p class="acceptance-notification__description">
      {{ fluent('access-group_notifications', 'tos-accept_message') }}
    </p>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/ui/Icon.vue';
import { ACCESS_GROUP_TOS_PAGE } from '@/router';

export default {
  name: 'AccessGroupTOSAcceptanceNotification',
  props: {},
  components: { Icon },
  computed: {
    ...mapGetters({
      accessGroup: 'accessGroup/getGroup',
      getInvitationByName: 'userV2/getInvitationByName',
    }),
    showTOSAcceptanceNotification() {
      if (!this.$route.query.accept) {
        ``;
        return false;
      }
      const invitationByName = this.getInvitationByName(this.accessGroup.name);
      if (!invitationByName) {
        return false;
      }
      return (
        this.$route.name === ACCESS_GROUP_TOS_PAGE &&
        invitationByName.requires_tos
      );
    },
    showInvitations() {
      return this.$route.name !== ACCESS_GROUP_TOS_PAGE;
    },
  },
};
</script>

<style>
.tos-acceptance-notification-container {
  background: #f2fcfd;
  border: 1px solid var(--blue-60);
  border-radius: var(--formElementRadius);
  padding: 0.5em 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tos-acceptance-notification-container .acceptance-notification__icon {
  color: var(--blue-60);
}
.tos-acceptance-notification-container .acceptance-notification__description {
  padding-left: 1em;
}
</style>
