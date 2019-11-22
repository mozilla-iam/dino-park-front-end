<template>
  <article
    class="notification-container tos-acceptance-notification-container"
    v-if="showTOSAcceptanceNotification"
  >
    Membership requires acceptance of the terms below
  </article>
</template>

<script>
import { INVITATION_STATE } from '@/view_models/AccessGroupViewModel';
import { ACCESS_GROUP_TOS_PAGE } from '@/router';

export default {
  name: 'AccessGroupTOSAcceptanceNotification',
  props: {},
  computed: {
    showTOSAcceptanceNotification() {
      if (!this.$route.query.accept) {
        return false;
      }
      const { requires_tos } = this.$store.getters.getInvitationByName(
        this.$store.state.accessGroup.group.name
      );
      return this.$route.name === ACCESS_GROUP_TOS_PAGE && requires_tos;
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
.tos-acceptance-notification-container {
  background: #f2fcfd;
  border: 1px solid var(--blue-60);
  border-radius: var(--formElementRadius);
  text-align: center;
  padding: 1em;
}
</style>
