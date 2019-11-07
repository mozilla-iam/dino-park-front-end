<template>
  <div class="membership-management-container">
    <p class="primary-data-row">
      <span class="primary-data-row__count">{{ totalPendingInvitations }}</span>
      <RouterLink
        class="primary-data-row__direct"
        :to="{
          name: 'Edit Access Group',
          query: { section: 'pending-acceptance' },
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
          query: { section: 'pending-renewal' },
        }"
        >{{ pendingRenewalsText }}</RouterLink
      >
    </p>
    <p class="secondary-data-row">
      Memberships set to
      <span class="secondary-data-row__focus">expire</span> after
      <span class="secondary-data-row__focus">{{ expiry }}</span>
    </p>
    <footer class="action-row">
      <Button
        class="membership-management__add-more button--secondary button button--action"
        type="button"
        v-on:click="handleAddMembers"
      >
        <Icon id="plus" :width="16" :height="16" />Add Members
      </Button>
    </footer>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';

const membershipData = {
  pending: {
    invitations: [{ memberName: 'Bruce Wayne', memberId: '1' }],
    renewals: [{ memberName: 'Bruce Wayne', memberId: '1' }],
  },
  membershipExpiry: '30 days',
};
export default {
  name: 'AccessGroupMembershipManagement',
  components: { Icon, Button },
  props: {
    title: String,
  },
  computed: {
    totalPendingInvitations() {
      return membershipData.pending.invitations.length;
    },
    pendingInvitationsText() {
      if (membershipData.pending.invitations.length > 1) {
        return 'pending invitations';
      }
      return 'pending invitation';
    },
    totalPendingRenewals() {
      return membershipData.pending.renewals.length;
    },
    pendingRenewalsText() {
      if (membershipData.pending.renewals.length > 1) {
        return 'pending renewals';
      }
      return 'pending renewal';
    },
  },
  methods: {
    handleAddMembers() {
      console.log('Adding members');
    },
  },
  data() {
    return {
      expiry: membershipData.membershipExpiry,
    };
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
