<template>
  <article class="notification-container tos-acceptance-notification-container">
    <span class="acceptance-notification__icon">
      <Icon id="info" :width="32" :height="32" />
    </span>
    <p class="acceptance-notification__description">
      {{ fluent('access-group_notifications', 'tos-accept_message') }}
    </p>
  </article>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'AccessGroupTOSAcceptanceNotification',
  props: {},
  components: { Icon },
};
</script>

<style>
.tos-acceptance-notification-container {
  align-items: center;
  background: #f2fcfd;
  border: 1px solid var(--blue-60);
  border-radius: var(--formElementRadius);
  display: flex;
  flex-direction: row;
  padding: 0.5em 1em;
  margin-bottom: 2em;
}

.tos-acceptance-notification-container .acceptance-notification__icon {
  color: var(--blue-60);
}
.tos-acceptance-notification-container .acceptance-notification__description {
  padding-left: 1em;
}
</style>
