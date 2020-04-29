<template>
  <div class="member-list-display">
    <UserPicture
      :avatar="{ picture: member.picture, username: member.username }"
      class="curator-image"
      :size="40"
      :showLabel="member.isStaff"
    />
    <div class="member-list-description">
      <p class="member-list-description__header">{{ member.displayName }}</p>
      <p class="member-list-description__sub">{{ subText }}</p>
    </div>
  </div>
</template>

<script>
import UserPicture from '@/components/ui/UserPicture.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'AccessGroupMemberListDisplay',
  components: {
    UserPicture,
    Icon,
  },
  props: {
    member: Object,
    subRowText: Function,
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    subText() {
      return this.subRowText(this.member);
    },
  },
};
</script>

<style>
.member-list-display {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.member-list-description p {
  margin: 0.5em;
}

.member-list-description .member-list-description__header {
  font-weight: bold;
  margin-bottom: 0;
}

.member-list-description .member-list-description__sub {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.25em;
  color: var(--gray-60);
}

.member-list-description .member-list-description__sub svg {
  margin-right: 0.5em;
}
</style>
