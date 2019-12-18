<template>
  <article class="members-container">
    <header class="members-container__top-bar">
      <SearchForm
        class="top-bar__search"
        id="access-group-members-search"
        v-on:clear-query="clearSearchHandler"
        :searchFormHandler="searchFormHandler"
        searchFormLabel="Search Members"
      ></SearchForm>
      <Tooltip
        class="members-container__tooltip"
        buttonText="Member search info"
        alternateButtonText="Close member search info"
        >You can search by name, username and email</Tooltip
      >
    </header>
    <nav class="members-container__tabs">
      <ul class="tabs-container">
        <li
          :class="{ 'tabs-container__item': true, active: isTabActive(tab) }"
          v-for="(tab, idx) in tabList"
          :key="idx"
          @click="handleTabClick(tab)"
        >
          {{ tab.label }}
        </li>
      </ul>
    </nav>
    <template v-if="filteredListDisplay.length > 0">
      <ul class="members-container__list columned">
        <li
          v-for="(column, idx) in filteredListTwoColumnDisplay"
          :key="idx"
          class="list-column-container"
        >
          <ul class="members-container__list-column">
            <li
              v-for="(member, idx2) in column"
              :key="idx2"
              class="list-item-container"
            >
              <AccessGroupMemberItem :member="member" />
            </li>
          </ul>
        </li>
      </ul>
      <ul class="members-container__list">
        <li
          v-for="(member, idx) in filteredListDisplay"
          :key="idx"
          class="list-item-container"
        >
          <AccessGroupMemberItem :member="member" />
        </li>
      </ul>
    </template>
    <template v-else>
      <p class="members-container__empty">
        There are no members in this group.
        <br />Why not
        <RouterLink
          :to="{
            name: 'Edit Access Group',
            query: {
              section: 'invitations',
            },
          }"
          >invite some</RouterLink
        >?
      </p>
    </template>
  </article>
</template>

<script>
import EditButton from '@/components/ui/EditButton.vue';
import AccessGroupMemberItem from '@/components/access_group/AccessGroupMemberItem.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import Select from '@/components/ui/Select.vue';
import Tooltip from '@/components/ui/Tooltip.vue';
import Icon from '@/components/ui/Icon.vue';
import { getTwoColumnGridArraySplitFromArray } from '@/assets/js/component-utils';

const defaultTab = 'all';
export default {
  name: 'AccessGroupMembers',
  components: {
    EditButton,
    Icon,
    SearchForm,
    Select,
    Tooltip,
    AccessGroupMemberItem,
  },
  props: {
    title: String,
  },
  methods: {
    // eslint-disable-next-line
    searchFormHandler(searchQuery, scope) {
      if (searchQuery === '') {
        this.filteredList = this.memberList;
        return searchQuery;
      }
      this.filteredList = this.memberList.filter(member => {
        return (
          member.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        );
      });
      return searchQuery;
    },
    handleTabClick(tab) {
      this.activeTab = tab.key;
    },
    clearSearchHandler() {
      this.filteredList = this.memberList;
    },
    isTabActive(tab) {
      return this.activeTab === tab.key;
    },
  },
  computed: {
    filteredListTwoColumnDisplay() {
      return getTwoColumnGridArraySplitFromArray(this.filteredListDisplay);
    },
    filteredListDisplay() {
      return this.filteredList.filter(
        member =>
          (this.activeTab === 'curators' && member.isCurator()) ||
          (this.activeTab === 'members' && member.isMember()) ||
          this.activeTab === 'all'
      );
    },
  },
  data() {
    const fullMemberList = this.$store.getters['accessGroup/getMembers'];
    return {
      search: '',
      filter: '',
      filteredList: fullMemberList.slice(0),
      memberList: fullMemberList.slice(0),
      tabList: [
        { key: 'all', label: 'All' },
        { key: 'curators', label: 'Curators' },
        { key: 'members', label: 'Members' },
      ],
      activeTab: defaultTab,
    };
  },
};
</script>

<style>
.members-container__top-bar {
  background: var(--white);
  box-shadow: var(--shadowCard);
  margin: 0;
  position: relative;
  padding: 1.5em;
  display: flex;
  justify-content: space-between;
}

@media (min-width: 57.5em) {
  .members-container__top-bar {
    justify-content: initial;
  }
}

.members-container__top-bar .members-container__tooltip {
  display: flex;
  position: absolute;
  right: 3%;
  top: 50%;
  height: 2em;
  transform: translate(0, -50%);
}

@media (min-width: 35em) {
  .members-container__top-bar .members-container__tooltip {
    right: 2em;
  }
}

.members-container__top-bar .members-container__tooltip .show-more__button {
  margin: 0;
}

.members-container__tabs {
  min-width: 25em;
  width: 50%;
  border: 1px solid var(--gray-40);
  border-radius: 5em;
  margin: 1em auto 2em auto;
}

.members-container__tabs > ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.members-container__tabs .tabs-container {
  display: flex;
  flex-direction: row;
}

.tabs-container .tabs-container__item {
  flex: 1;
  border-right: 1px solid var(--gray-40);
  text-align: center;
  padding: 1em;
  cursor: pointer;
  background: var(--white);
}

.tabs-container .tabs-container__item.active {
  background: var(--blue-60);
  color: var(--white);
}

.tabs-container .tabs-container__item:first-child {
  padding: 1em;
  border-top-left-radius: 5em;
  border-bottom-left-radius: 5em;
}

.tabs-container .tabs-container__item:nth-child(2) {
  padding: 1em 2em;
}

.tabs-container .tabs-container__item:last-child {
  border-right: none;
  padding-right: 2em;
  padding-left: 1em;
  border-top-right-radius: 5em;
  border-bottom-right-radius: 5em;
}

.members-container__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
.members-container__list:not(.columned) {
  display: flex;
  flex-direction: column;
}

.members-container__list.columned {
  display: none;
}
@media (min-width: 57.5em) {
  .members-container__list.columned {
    display: grid;
    grid-template-columns: calc(50% - 0.5em) calc(50% - 0.5em);
    grid-row-gap: 1em;
    grid-column-gap: 1em;
    grid-auto-rows: min-content;
  }

  .members-container__list:not(.columned) {
    display: none;
  }
}

.members-container__list .list-item-container {
  width: 100%;
  display: flex;
  margin-top: 1em;
}

.members-container__list-column {
  margin: 0;
  padding: 0;
}

@media (min-width: 57.5em) {
  .members-container__list-column {
    display: flex;
    flex-direction: column;
  }
  .members-container__list .list-item-container {
    float: left;
    display: flex;
    margin-top: 1em;
  }

  .members-container__list .list-item-container:first-child {
    margin-top: 0;
  }
}

.members-container__list .list-item:first-child {
  margin-left: 0;
}

.members-container__top-bar .top-bar__search {
  margin: 0 auto;
  width: 15em;
}

@media (min-width: 57.5em) {
  .members-container__top-bar .top-bar__search {
    width: 25em;
  }
}

.members-container .members-container__empty {
  text-align: center;
  margin: 3em auto;
}
</style>
