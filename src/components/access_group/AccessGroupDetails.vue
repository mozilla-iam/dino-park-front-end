<template>
  <div class="membership-management-container">
    <p class="primary-data-row">{{ membersCountText }}</p>
    <a class="primary-data-row" v-if="group.terms" :href="tosUrl">{{
      fluent('access-group_details', 'terms')
    }}</a>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import { mapGetters } from 'vuex';

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
      let fullText = '';
      if (this.memberCount === 1) {
        fullText += `1 ${this.fluent('access-group_details', 'member')}`;
      } else {
        fullText += `${this.memberCount} ${this.fluent(
          'access-group_details',
          'members'
        )}`;
      }
      return fullText;
    },
  },
};
</script>

<style></style>
