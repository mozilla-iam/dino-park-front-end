<template>
  <div :class="{ 'list-item': true, primary: isCurator }">
    <article class="list-item__main">
      <div class="member-view">
        <UserPicture
          :avatar="{ picture: member.picture, username: member.name }"
          class="member-view__image"
          :size="40"
          :isStaff="true"
        />
        <div class="member-view__info">
          <p class="info-header">{{ member.name }}</p>
          <p class="info-sub">
            <Icon v-if="isCurator" id="crown-fill" :width="16" :height="16" />{{
              member.role
            }}
          </p>
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
        <span class="expandable-row__content">{{ formatDate(member.since) }}</span>
      </p>
      <p class="expandable-row">
        <span class="expandable-row__label">Added by</span>
        <span class="expandable-row__content">{{ member.added_by.name }}</span>
      </p>
    </aside>
  </div>
</template>

<script>
import UserPicture from '@/components/ui/UserPicture.vue';
import EditButton from '@/components/ui/EditButton.vue';
import Icon from '@/components/ui/Icon.vue';
import { DISPLAY_MEMBER_ROLES, MEMBER_IDEX } from '@/view_models/AccessGroupViewModel';

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
    // TODO: This needs to be done in the vuex model
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US');
    },
  },
  computed: {
    addedByProfile() {
      return `/p/${this.member.addedByMemberId}`;
    },
    isCurator() {
      return this.member.role === DISPLAY_MEMBER_ROLES[MEMBER_IDEX.Curator];
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

.list-item.primary .member-view__info .info-sub {
  color: #006504;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.list-item.primary .member-view__info .info-sub svg {
  margin-right: 0.25em;
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