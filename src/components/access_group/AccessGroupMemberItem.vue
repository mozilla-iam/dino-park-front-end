<template>
  <div
    :class="{ 'list-item': true, primary: isCurator, expanded: showExpandable }"
  >
    <article class="list-item__main">
      <RouterLink
        :to="{
          name: 'Profile',
          params: {
            username: member.username,
          },
        }"
        class="member-view"
      >
        <UserPicture
          :avatar="{ picture: member.picture, username: member.username }"
          class="member-view__image"
          :size="40"
          :showLabel="member.isStaff"
        />
        <div class="member-view__info">
          <p class="info-header">{{ member.displayName }}</p>
          <p class="info-sub">
            <Icon v-if="isCurator" id="crown-fill" :width="16" :height="16" />
            {{ member.role }}
          </p>
        </div>
      </RouterLink>
      <button
        :class="{ 'member-action': true, expanded: showExpandable }"
        v-on:click="toggleExpandable"
      >
        <Icon id="info" :width="24" :height="24" />
      </button>
    </article>
    <aside class="list-item__expandable" v-if="showExpandable">
      <p class="expandable-row" v-if="isMemberSinceDateValid">
        <span class="expandable-row__label">{{
          fluent('access-group_members', 'member-expandable_member-since')
        }}</span>
        <span class="expandable-row__content">
          {{ formatMemberSinceDate }}
        </span>
      </p>
      <p class="expandable-row" v-if="!member.added_by.isAnonymous()">
        <span class="expandable-row__label">{{
          fluent('access-group_members', 'member-expandable_added-by')
        }}</span>
        <RouterLink
          class="expandable-row__content"
          :to="{
            name: 'Profile',
            params: {
              username: member.added_by.username,
            },
          }"
          >{{ member.added_by.displayName }}</RouterLink
        >
      </p>
    </aside>
  </div>
</template>

<script>
import UserPicture from '@/components/ui/UserPicture.vue';
import EditButton from '@/components/ui/EditButton.vue';
import Icon from '@/components/ui/Icon.vue';
import {
  DISPLAY_MEMBER_ROLES,
  MEMBER_IDEX,
} from '@/view_models/AccessGroupViewModel';
import { formatDate, isDateValid } from '@/assets/js/component-utils';

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
      if (isNaN(Date.parse(dateString))) {
        return '';
      }
      return new Date(dateString).toLocaleDateString();
    },
  },
  computed: {
    isCurator() {
      return this.member.role === DISPLAY_MEMBER_ROLES[MEMBER_IDEX.Curator];
    },
    isMemberSinceDateValid() {
      return isDateValid(this.member.since);
    },
    formatMemberSinceDate() {
      return formatDate(this.member.since);
    },
  },
  data() {
    return {
      showExpandable: false,
    };
  },
};
</script>

<style scoped>
.list-item {
  width: 100%;
  box-shadow: var(--shadowCard);
  border: 1px solid transparent;
  border-radius: var(--cardRadius);
  background: var(--white);
  height: 5.5em;
  display: flex;
  flex-direction: column;
}

.list-item:hover {
  border: 1px solid var(--blue-60);
}

.list-item.expanded {
  height: auto;
}

.list-item .list-item__main {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.list-item__main .member-view {
  display: flex;
  flex: 6;
  text-decoration: none;
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
  margin: 0.5em 0.5em 0.5em 0;
  background: transparent;
  border-left: 2px solid var(--gray-20);
  border-right: none;
  border-top: none;
  border-bottom: none;
  display: block;
}

.list-item__main .member-action-container:hover .member-action {
  border-left: 2px solid transparent;
}

.list-item__main .member-action:hover svg {
  color: var(--blue-60);
}

.list-item__expandable {
  margin: 0 1em 1em;
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
