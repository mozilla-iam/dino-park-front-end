<template>
  <div class="membership-management-container">
    <p class="primary-data-row">{{ membersCountText }}</p>
    <a class="primary-data-row" v-if="model.group.terms" :href="tosUrl">Group Terms</a>
  </div>
</template>

<script>
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
    membersCountText() {
      let fullText = '';
      if (this.model.member_count === 1) {
        fullText += '1 member';
      } else {
        fullText += `${this.model.member_count} members`;
      }
      return fullText;
    },
  },
  data() {
    return {
      model: this.$store.state.accessGroup,
    };
  },
};
</script>

<style></style>
