<template>
  <main class="access-group__index">
    <p></p>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/ui/Icon.vue';
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

<style></style>
