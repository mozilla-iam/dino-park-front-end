<template>
  <div class="list-item">
    <article class="list-item__main">
      <div class="member-view">
        <UserPicture
          :avatar="{ picture: member.imageUrl, username: member.name }"
          class="member-view__image"
          :size="40"
          :isStaff="true"
        />
        <div class="member-view__info">
          <p class="info-header">{{ member.name }}</p>
          <p class="info-sub">{{ member.jobTitle }}</p>
        </div>
      </div>
      <button
        :class="{ 'member-action': true, expanded: showExpandable }"
        v-on:click="toggleExpandable"
      >
        <Icon id="info" :width="24" :height="24" />
      </button>
    </article>
    <aside class="list-item__expandable" v-if="showExpandable">
      <p class="expandable-row">
        <span class="expandable-row__label">Member since</span>
        <span class="expandable-row__content">{{ member.memberSince }}</span>
      </p>
      <p class="expandable-row">
        <span class="expandable-row__label">Added by</span>
        <a :href="addedByProfile" class="expandable-row__content">{{
          member.addedBy
        }}</a>
      </p>
    </aside>
  </div>
</template>

<script>
import UserPicture from '@/components/ui/UserPicture.vue';
import EditButton from '@/components/ui/EditButton.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'AccessGroupMemberItem',
  components: { UserPicture, EditButton, Icon },
  props: {
    member: Object,
  },
  methods: {
    toggleExpandable() {
      this.showExpandable = !this.showExpandable;
    },
  },
  computed: {
    addedByProfile() {
      return `/p/${this.member.addedByMemberId}`;
    },
  },
  data() {
    return {
      showExpandable: false,
    };
  },
};
</script>

<style>
.list-item {
  width: 100%;
  box-shadow: var(--shadowCard);
  background: var(--white);
}
.list-item .list-item__main {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.list-item__main .member-view {
  display: flex;
}

.member-view .member-view__image {
  margin: 1em;
  width: 3.5em;
  height: 3.5em;
}

.member-view .member-view__info {
  margin-top: 1em;
}
.member-view .member-view__info p {
  margin: 0 0 0.25em 0;
}

.member-view__info .info-header {
  font-weight: bold;
  color: var(--black);
}

.member-view__info .info-sub {
  margin-top: 0;
}

.list-item__main .member-action {
  width: 7em;
  margin: 0.5em;
  background: var(--white);
  border-left: 2px solid var(--gray-20);
  border-right: none;
  border-top: none;
  border-bottom: none;
}

.list-item__main .member-action.expanded svg {
  color: var(--blue-60);
}

.list-item__expandable {
  margin: 1em;
}
.expandable-row {
  display: block;
  width: 100%;
  margin-bottom: 0.5em;
}

.expandable-row:last-child {
  margin-top: 0;
}

.expandable-row__label {
  font-weight: bold;
  color: var(--black);
  margin-right: 0.5em;
}

span.expandable-row__content {
  color: var(--gray-50);
}
</style>
