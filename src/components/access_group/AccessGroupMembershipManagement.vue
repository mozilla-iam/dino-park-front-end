<template>
  <div class="membership-management-container">
    <p class="primary-data-row">
      <span class="primary-data-row__count">{{ totalPendingInvitations }}</span>
      <span class="primary-data-row__intro">
        {{ pendingInvitationsIntroText }}
      </span>
      <RouterLink
        v-if="showEdit"
        class="primary-data-row__direct"
        :to="{
          name: 'Edit Access Group',
          query: { section: 'invitations' },
        }"
        >{{
          fluent(
            'access-group_membership-management',
            'pending-invitations-link',
          )
        }}</RouterLink
      >
      <span class="primary-data-row__direct" v-else>
        {{
          fluent(
            'access-group_membership-management',
            'pending-invitations-link',
          )
        }}
      </span>
    </p>
    <p class="primary-data-row">
      <span class="primary-data-row__count">{{ totalPendingRenewals }}</span>
      <span class="primary-data-row__intro">
        {{ pendingRenewalsIntroText }}
      </span>
      <RouterLink
        v-if="showEdit"
        class="primary-data-row__direct"
        :to="{
          name: 'Edit Access Group',
          query: { section: 'members' },
        }"
        >{{
          fluent('access-group_membership-management', 'pending-renewals-link')
        }}</RouterLink
      >
      <span class="primary-data-row__direct" v-else>
        {{
          fluent('access-group_membership-management', 'pending-renewals-link')
        }}
      </span>
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
        <Icon id="plus" :width="16" :height="16" />
        {{ fluent('access-group_membership-management', 'add-members') }}
      </RouterLink>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';

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
    }),
    totalPendingInvitations() {
      return !this.invitationCount ? 0 : this.invitationCount;
    },
    pendingInvitationsIntroText() {
      if (this.invitationCount == 1) {
        return this.fluent(
          'access-group_membership-management',
          'pending-invitations-single',
        );
      }
      return this.fluent(
        'access-group_membership-management',
        'pending-invitations',
      );
    },
    totalPendingRenewals() {
      return !this.renewalCount ? 0 : this.renewalCount;
    },
    pendingRenewalsIntroText() {
      if (this.renewalCount == 1) {
        return this.fluent(
          'access-group_membership-management',
          'pending-renewals-single',
        );
      }
      return this.fluent(
        'access-group_membership-management',
        'pending-renewals',
      );
    },
    showEdit() {
      return this.isCurator;
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
