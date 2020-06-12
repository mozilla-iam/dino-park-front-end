<template>
  <div class="group-details">
    <p class="primary-data-row">{{ membersCountText }}</p>
    <RouterLink
      class="primary-data-row"
      v-if="group.terms"
      :to="{
        name: tosName,
        params: {
          groupname: groupName,
        },
      }"
    >
      {{ fluent('access-group_details', 'terms') }}
    </RouterLink>
    <p class="primary-data-row">
      {{
        `${fluent(
          'access-group_details',
          'create-date-text',
        )} ${groupCreatedDate}`
      }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/ui/Icon.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import { ACCESS_GROUP_TOS_PAGE } from '@/router';

export default {
  name: 'AccessGroupDetails',
  components: { Icon, UserPicture },
  mixins: [LinksMixin],
  props: {
    title: String,
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tosName: ACCESS_GROUP_TOS_PAGE,
    };
  },
  computed: {
    ...mapGetters({
      group: 'accessGroup/getGroup',
      memberCount: 'accessGroup/getMemberCount',
      groupName: 'accessGroup/getGroupName',
    }),
    membersCountText() {
      return this.memberCount === 1
        ? `1 ${this.fluent('access-group_details', 'member')}`
        : `${this.memberCount} ${this.fluent(
            'access-group_details',
            'members',
          )}`;
    },
    groupCreatedDate() {
      return new Date(this.group.created).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

<style>
.group-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.group-details .primary-data-row {
  margin-top: 0;
  margin-bottom: 1em;
}

.group-details .primary-data-row:last-child {
  margin-bottom: 0;
}
</style>
