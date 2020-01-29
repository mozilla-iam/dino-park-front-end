<template lang="html">
  <section class="global-notifications-container">
    <AccessGroupTOSAcceptanceNotification />
    <AccessGroupInvitationNotification />
    <AccessGroupLeaveConfirmationNotification />
  </section>
</template>

<script lang="js">
import AccessGroupInvitationNotification from '@/components/access_group/AccessGroupInvitationNotification.vue';
import AccessGroupTOSAcceptanceNotification from '@/components/access_group/AccessGroupTOSAcceptanceNotification.vue';
import AccessGroupLeaveConfirmationNotification from '@/components/access_group/AccessGroupLeaveConfirmationNotification.vue';

export default  {
  name: 'GlobalNotifications',
  components: {
    AccessGroupInvitationNotification,
    AccessGroupTOSAcceptanceNotification,
    AccessGroupLeaveConfirmationNotification,
  }
}
</script>

<style>
.global-notifications-container {
  max-width: 74em;
  margin: 0 auto;
  width: 100%;
  padding: 0 2em;
}

.global-notifications-container > article {
  margin-top: 1em;
}

.global-notifications-container > article:first-child {
  margin-top: 0;
}

.global-notifications-container.container {
  margin: 2em auto 0 auto;
}

.global-notifications-container.container:empty {
  margin: 0 auto;
}

@media (min-width: 57.5em) {
  .global-notifications-container {
    padding: 0 1em;
  }
}
</style>
