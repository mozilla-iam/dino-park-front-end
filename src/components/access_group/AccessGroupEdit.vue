<template>
  <main class="group-edit">
    <RouterLink
      class="button group-edit__back-action"
      :to="{
        name: 'Access Group',
      }"
    >
      <Icon id="chevron-left" :width="17" :height="17" />
      {{ `${groupName} ${fluent('access-group_nav-back')}` }}
    </RouterLink>
    <section class="edit-container">
      <nav class="edit-container__tabs">
        <p class="tabs-heading">{{ fluent(currentTab.fluentLabel) }}</p>
        <ul class="tabs-container">
          <li
            :class="{ 'tab-item': true, active: isActive(tab) }"
            v-for="(tab, idx) in tabs"
            :key="idx"
          >
            <RouterLink
              :to="{
                name: 'Edit Access Group',
                query: {
                  section: tab.key,
                },
              }"
            >
              <span class="item__icon">
                <Icon :id="tab.icon" :width="24" :height="24" />
              </span>
              <p class="item__label">{{ fluent(tab.fluentLabel) }}</p>
            </RouterLink>
          </li>
        </ul>
      </nav>
      <section class="edit-container__content">
        <component v-bind:is="currentTab.component"></component>
      </section>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import store, {
  fetchBase,
  fetchMembers,
  fetchAccessGroup,
  resolvePromisesSerially,
  fetchInvitationsAndRequests,
} from '@/store';
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import AccessGroupInformationEdit from '@/components/access_group/AccessGroupInformationEdit.vue';
import AccessGroupMembersEdit from '@/components/access_group/AccessGroupMembersEdit.vue';
import AccessGroupInvitationsEdit from '@/components/access_group/AccessGroupInvitationsEdit.vue';
import AccessGroupHistoryEdit from '@/components/access_group/AccessGroupHistoryEdit.vue';

const tabs = [
  {
    key: 'information',
    fluentLabel: 'access-group-information-tab',
    icon: 'info',
    component: 'AccessGroupInformationEdit',
  },
  {
    key: 'members',
    fluentLabel: 'access-group-members-tab',
    icon: 'users-outline',
    component: 'AccessGroupMembersEdit',
  },
  {
    key: 'invitations',
    fluentLabel: 'access-group-invitations-tab',
    icon: 'user-plus',
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
  beforeRouteEnter(to, from, next) {
    const { groupname } = to.params;
    store.dispatch('setLoading');
    const [membersPromises, membersResolvers] = fetchMembers(store, groupname);
    const [agPromises, agResolvers] = fetchAccessGroup(store, groupname);
    const [iarPromises, iarResolvers] = fetchInvitationsAndRequests(store);
    resolvePromisesSerially(
      [...membersPromises, ...agPromises, ...iarPromises],
      [...membersResolvers, ...agResolvers, ...iarResolvers],
    ).then(() => {
      store.dispatch('completeLoading');
      next();
    });
  },
  mounted() {
    if (this.getFeature('historyTab')) {
      tabs.concat({
        key: 'history',
        label: 'History',
        icon: 'clock',
        component: 'AccessGroupHistoryEdit',
      });
    }
  },
  methods: {
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
    currentTab() {
      const defaultTab = 0;
      if (!this.$route.query.section) {
        return defaultTab;
      }
      const [currentTab] = tabs.filter(
        (tab) => tab.key === this.$route.query.section,
      );
      if (currentTab) {
        return currentTab;
      }
      return defaultTab;
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
.access-group-container .container {
  width: 100%;
  max-width: 100%;
  padding: 0;
}
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
  margin-left: 1em;
}

@media (min-width: 57.5em) {
  .group-edit .group-edit__back-action {
    margin: 0;
  }
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

.edit-container .edit-container__tabs {
  margin: 0 1em;
  position: sticky;
  top: 6em;
  left: 0;
  z-index: var(--layerPopover);
}

@media (min-width: 57.5em) {
  .edit-container .edit-container__tabs {
    margin: 0;
  }
}

.edit-container .edit-container__content {
  margin-top: 1em;
  /* enable tag selector dropdown */
  overflow: visible;
  z-index: 0;
}

.edit-container__tabs .tabs-container {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: stretch;
  justify-content: space-between;
}

@media (min-width: 57.5em) {
  .edit-container__tabs .tabs-container {
    margin: 0;
  }
}

.edit-container__tabs .tabs-heading {
  text-align: center;
  padding-top: 1em;
  color: var(--blue-60);
}

@media (min-width: 57.5em) {
  .edit-container__tabs .tabs-heading {
    display: none;
  }
}

.tab-item {
  display: flex;
  padding: 1em 2em;
  cursor: pointer;
  flex: 1;
  border-bottom: 2px solid transparent;
}

.tab-item.active {
  border-bottom: 2px solid var(--blue-60);
}

.tab-item a {
  color: var(--black);
  text-align: center;
  flex: 1;
}

.tab-item.active a {
  color: var(--blue-60);
}

.item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

@media (min-width: 57.5em) {
  .tab-item a {
    display: flex;
    text-decoration: none;
  }
  .item__icon {
    justify-content: flex-start;
    flex: none;
    margin-right: 1em;
  }
}

.item__label {
  display: none;
}

@media (min-width: 57.5em) {
  .item__label {
    display: inline-block;
    text-decoration: none;
  }
}

/* Expiration styles */
.access-group-container .group-edit .expiration-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.group-edit .expiration-container .expiration-container__label {
  color: var(--gray-50);
  margin-bottom: 1em;
}

.group-edit .expiration-container .expiration-container__value {
  width: 100%;
}

/* Radio styles */
.group-edit .content-area__row .radio-control {
  margin: 0 1em 0 0;
  color: var(--black);
}

.group-edit .content-area__row .radio-control > input {
  margin: 0 0.5em 0 0;
}
</style>
