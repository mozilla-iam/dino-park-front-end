<template>
  <div class="list-item">
    <RouterLink
      :to="{
        name: 'Access Group',
        params: {
          groupname: group.name,
        },
      }"
      class="group-view"
    >
      <div class="group-view__info">
        <div class="info-primary">
          <p class="info-header">{{ group.name }}</p>
          <p class="info-sub">{{ infoSubText }}</p>
        </div>
        <aside class="info-aside">
          <Icon
            class="info-aside__icon"
            :id="groupTypeIcon"
            :width="20"
            :height="20"
          />
          {{ group.type }}
        </aside>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import {
  DISPLAY_MEMBER_ROLES,
  MEMBER_IDEX,
} from '@/view_models/AccessGroupViewModel';

export default {
  name: 'AccessGroupListItem',
  components: { Icon },
  props: {
    group: Object,
  },
  computed: {
    groupTypeIcon() {
      return this.group.type === 'Closed' ? 'lock' : 'user-check';
    },
    infoSubText() {
      return this.group.memberCount === 1
        ? `${this.group.memberCount} ${this.fluent(
            'access-group_list',
            'info-sub',
          )}`
        : `${this.group.memberCount} ${this.fluent(
            'access-group_list',
            'info-sub--plural',
          )}`;
    },
  },
};
</script>

<style scoped>
.list-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: var(--cardRadius);
  border: 1px solid transparent;
  padding: 1em;
}

.list-item:hover {
  border: 1px solid var(--blue-60);
}

.list-item .group-view {
  display: flex;
  flex: 6;
  text-decoration: none;
}

.group-view .group-view__image {
  margin: 1em;
  width: 3.5em;
  height: 3.5em;
}

.group-view .group-view__info {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.group-view .group-view__info .info-primary {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.group-view .group-view__info .info-aside {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: 1em;
  color: var(--gray-50);
}

.info-aside .info-aside__icon {
  margin-right: 0.5em;
  margin-bottom: 0.1em;
}

.group-view .group-view__info p {
  margin: 0;
}

.group-view .group-view__info .info-header {
  font-weight: bold;
  color: var(--black);
  margin-bottom: 0.25em;
}

.group-view__info .info-sub {
  margin-top: 0;
  color: var(--gray-50);
}
</style>
