<template>
  <div class="member-list-display">
    <UserPicture
      :avatar="{ picture: member.picture, username: member.name }"
      class="curator-image"
      :size="24"
      :isStaff="false"
    />
    <div class="member-list-description">
      <p class="member-list-description__header">{{ member.name }}</p>
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
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    subText() {
      if (
        !this.member.added_by.hasOwnProperty('uuid') ||
        this.member.added_by.uuid === null
      ) {
        return ' ';
      }
      return `${this.fluent('member-list-description__sub')} ${
        this.member.added_by.name
      }`;
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
