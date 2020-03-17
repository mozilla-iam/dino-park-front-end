<template>
  <section class="group-index-container">
    <main class="group-index">
      <section class="summary-area">
        <h1 class="access-group__header">
          {{ fluent('access-group_list') }}
        </h1>
        <p class="summary-area__summary">
          {{ fluent('access-group_list', 'summary-area__summary') }}
        </p>
        <Button class="summary-area__action">
          <Icon id="plus" :width="24" :height="24" />
          {{ fluent('access-group_list', 'summary-area__action') }}
        </Button>
      </section>
    </main>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import EditButton from '@/components/ui/EditButton.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import PanelSection from '@/components/ui/PanelSection.vue';
import AccessGroupDescription from '@/components/access_group/AccessGroupDescription.vue';
import AccessGroupMembershipManagement from '@/components/access_group/AccessGroupMembershipManagement.vue';
import AccessGroupMembers from '@/components/access_group/AccessGroupMembers.vue';
import AccessGroupDetails from '@/components/access_group/AccessGroupDetails.vue';

export default {
  name: 'AccessGroupIndex',
  mixins: [LinksMixin],
  components: {
    Icon,
    Button,
    EditButton,
    PanelSection,
    AccessGroupDescription,
    AccessGroupMembers,
    AccessGroupMembershipManagement,
    AccessGroupDetails,
  },
  computed: {
    ...mapGetters({
      isCurator: 'accessGroup/isCurator',
    }),
  },
};
</script>

<style>
.group-index {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5em;
}

.summary-area .summary-area__action {
  background: transparent;
  color: var(--blue-60);
  border-color: var(--blue-60);
}
</style>
