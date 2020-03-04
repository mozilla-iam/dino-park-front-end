<template>
  <div class="group-details">
    <p class="primary-data-row">{{ membersCountText }}</p>
    <a class="primary-data-row" v-if="group.terms" :href="tosUrl">{{
      fluent('access-group_details', 'terms')
    }}</a>
    <p class="primary-data-row">
      {{
        `${fluent(
          'access-group_details',
          'create-date-text'
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
  computed: {
    ...mapGetters({
      group: 'accessGroup/getGroup',
      memberCount: 'accessGroup/getMemberCount',
    }),
    membersCountText() {
      return this.memberCount === 1
        ? `1 ${this.fluent('access-group_details', 'member')}`
        : `${this.memberCount} ${this.fluent(
            'access-group_details',
            'members'
          )}`;
    },
    groupCreatedDate() {
      const date = new Date(this.group.created);
      return `${date.getDate()} ${date.toLocaleString('default', {
        month: 'long',
      })} ${date.getFullYear()}`;
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
