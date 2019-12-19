<template>
  <div class="membership-management-container">
    <p class="primary-data-row">
      <span class="primary-data-row__count">{{ totalPendingInvitations }}</span>
      <RouterLink
        class="primary-data-row__direct"
        :to="{
          name: 'Edit Access Group',
          query: { section: 'invitations' },
        }"
        >{{ pendingInvitationsText }}</RouterLink
      >
    </p>
    <p class="primary-data-row">
      <span class="primary-data-row__count">{{ totalPendingRenewals }}</span>
      <RouterLink
        class="primary-data-row__direct"
        :to="{
          name: 'Edit Access Group',
          query: { section: 'members' },
        }"
        >{{ pendingRenewalsText }}</RouterLink
      >
    </p>
    <p class="secondary-data-row">
      Memberships that
      <span class="secondary-data-row__focus">will expire</span> after
      <span class="secondary-data-row__focus">{{ expiry }}</span>
    </p>
    <footer class="action-row" v-if="showEdit">
      <RouterLink
        class="membership-management__add-more button--secondary button button--action"
        type="button"
        :to="{
          name: 'Edit Access Group',
          query: {
            section: 'invitations',
          },
        }"
      >
        <Icon id="plus" :width="16" :height="16" />Add Members
      </RouterLink>
    </footer>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import { expiryText } from '@/assets/js/component-utils';
import { mapGetters } from 'vuex';

export default {
  name: 'AccessGroupMembershipManagement',
  components: { Icon, Button },
  props: {
    title: String,
  },
  computed: {
    ...mapGetters({
      invitationCount: 'accessGroup/getInvitationCount',
      renewalCount: 'accessGroup/getRenewalCount',
      expiration: 'accessGroup/getExpiration',
      isCurator: 'accessGroup/isCurator',
      isAdmin: 'accessGroup/isAdmin',
    }),
    totalPendingInvitations() {
      return this.invitationCount;
    },
    pendingInvitationsText() {
      if (this.invitationCount > 1) {
        return 'pending invitations';
      }
      return 'pending invitation';
    },
    totalPendingRenewals() {
      return this.renewalCount;
    },
    pendingRenewalsText() {
      if (this.renewalCount > 1) {
        return 'pending renewals';
      }
      return 'pending renewal';
    },
    expiry() {
      return expiryText(this.expiration);
    },
    showEdit() {
      return (
        this.isCurator(this.$store.state.user.uuid.value) ||
        this.isAdmin(this.$store.state.user.uuid.value)
      );
    },
  },
};
</script>

<style>
.primary-data-row {
  margin-top: 0;
}

.primary-data-row .primary-data-row__count {
  font-weight: bold;
  color: var(--black);
  margin-right: 0.25em;
}

.secondary-data-row__focus {
  color: var(--black);
  font-weight: bold;
}

.action-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 2em;
}

.membership-management-container .action-row .button {
  margin: 0;
}
</style>
