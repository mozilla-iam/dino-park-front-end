<template lang="html">
  <section class="global-notifications-container">
    <AccessGroupInvitationNotification />
  </section>
</template>

<script lang="js">
import AccessGroupInvitationNotification from '@/components/access_group/AccessGroupInvitationNotification.vue';

export default  {
  name: 'GlobalNotifications',
  components: {
    AccessGroupInvitationNotification,
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

@media (min-width: 57.5em) {
  .global-notifications-container {
    padding: 0 1em;
  }
}
</style>
