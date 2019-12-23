<template>
  <main class="group-edit">
    <RouterLink
      class="button group-edit__back-action"
      :to="{
        name: 'Access Group',
      }"
    >
      <Icon id="chevron-left" :width="17" :height="17" />{{ groupName }} group
    </RouterLink>
    <section class="edit-container">
      <nav class="edit-container__tabs">
        <ul class="tabs-container">
          <li
            :class="{ 'tab-item': true, active: isActive(tab) }"
            v-for="(tab, idx) in tabs"
            :key="idx"
            @click="handleTabClick(tab)"
          >
            <span class="item__icon">
              <Icon :id="tab.icon" :width="24" :height="24" />
            </span>
            <p class="item__label">{{ tab.label }}</p>
          </li>
        </ul>
      </nav>
      <section class="edit-container__content">
        <component v-bind:is="currentTabView"></component>
      </section>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import AccessGroupInformationEdit from '@/components/access_group/AccessGroupInformationEdit.vue';
import AccessGroupMembersEdit from '@/components/access_group/AccessGroupMembersEdit.vue';
import AccessGroupInvitationsEdit from '@/components/access_group/AccessGroupInvitationsEdit.vue';
import AccessGroupHistoryEdit from '@/components/access_group/AccessGroupHistoryEdit.vue';

const tabs = [
  {
    key: 'information',
    label: 'Information',
    icon: 'info',
    component: 'AccessGroupInformationEdit',
  },
  {
    key: 'members',
    label: 'Members',
    icon: 'users',
    component: 'AccessGroupMembersEdit',
  },
  {
    key: 'invitations',
    label: 'Invitations',
    icon: 'mail-outline',
    component: 'AccessGroupInvitationsEdit',
  },
];
export default {
  name: 'AccessGroup',
  components: {
    Icon,
    Button,
    AccessGroupInformationEdit,
    AccessGroupMembersEdit,
    AccessGroupInvitationsEdit,
    AccessGroupHistoryEdit,
  },
  props: {
    groupname: String,
  },
  mounted() {
    if (this.getFeature('history-tab')) {
      tabs.concat({
        key: 'history',
        label: 'History',
        icon: 'clock',
        component: 'AccessGroupHistoryEdit',
      });
    }
  },
  methods: {
    handleTabClick(tab) {
      this.$router.push({
        name: 'Edit Access Group',
        query: {
          section: tab.key,
        },
      });
    },
    isActive(tab) {
      if (!this.$route.query.section) {
        return false;
      }
      return tab.key === this.$route.query.section;
    },
  },
  computed: {
    ...mapGetters({
      groupName: 'accessGroup/getGroupName',
    }),
    currentTabView() {
      const defaultTab = 0;
      if (!this.$route.query.section) {
        return defaultTab;
      }
      const [currentTab] = tabs.filter(
        tab => tab.key === this.$route.query.section
      );
      if (currentTab) {
        return currentTab.component;
      }
      return tabs[defaultTab].component;
    },
  },
  data() {
    return {
      tabs,
    };
  },
};
</script>

<style>
@media (min-width: 57.5em) {
  .access-group-container .container {
    max-width: 70em;
  }
}
.group-edit {
  margin-top: 2em;
}
.group-edit .group-edit__back-action {
  background-color: var(--gray-30);
  color: var(--black);
  display: inline-block;
}

.group-edit .group-edit__back-action > svg {
  display: inline-block;
  vertical-align: bottom;
}

.group-edit .edit-container {
  margin-top: 2em;
  /* enable tag selector dropdown */
  overflow: visible;
}

.edit-container__tabs,
.edit-container__content {
  background: var(--white);
  box-shadow: var(--shadowCard);
}

.edit-container__content {
  margin-top: 1em;
  /* enable tag selector dropdown */
  overflow: visible;
}

.edit-container__tabs .tabs-container {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: stretch;
  justify-content: space-between;
}

.tab-item {
  display: flex;
  padding: 1em 2em;
  cursor: pointer;
  flex: 1;
  border-bottom: 2px solid transparent;
}

.tab-item.active {
  color: var(--blue-60);
  border-bottom: 2px solid var(--blue-60);
}

.item__icon {
  display: flex;
  align-items: center;
  margin-right: 1em;
}
</style>
