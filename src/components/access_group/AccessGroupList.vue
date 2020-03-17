<template>
  <article class="list-container">
    <header class="list-container__control-bar">
      <SearchForm
        class="control-bar__search"
        id="access-group-list-search"
        v-on:clear-query="clearSearchHandler"
        :searchFormHandler="searchFormHandler"
        :searchFormLabel="fluent('access-group_list', 'search')"
      ></SearchForm>
    </header>
    <ul class="list-container__list">
      <li v-for="(member, idx) in getMembers" :key="idx">
        <AccessGroupListtem class="list-item-container" :member="member" />
      </li>
    </ul>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EditButton from '@/components/ui/EditButton.vue';
import AccessGroupListItem from '@/components/access_group/AccessGroupListItem.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import Select from '@/components/ui/Select.vue';
import Tooltip from '@/components/ui/Tooltip.vue';
import Icon from '@/components/ui/Icon.vue';
import { getTwoColumnGridArraySplitFromArray } from '@/assets/js/component-utils';

const defaultTab = 'all';
export default {
  name: 'AccessGroupList',
  components: {
    EditButton,
    Icon,
    SearchForm,
    Select,
    Tooltip,
    AccessGroupListItem,
  },
  props: {
    title: String,
  },
  methods: {
    ...mapActions({
      getMembersWithOptions: 'accessGroup/fetchMembersWithOptions',
    }),
    // eslint-disable-next-line
    searchFormHandler(searchQuery, scope) {
      this.memberListOptions.search = searchQuery;
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.memberListOptions,
      });
    },
    handleTabClick(tab) {
      this.activeTab = tab.key;
      this.memberListOptions.role = tab.key;
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.memberListOptions,
      });
    },
    clearSearchHandler() {
      this.memberListOptions.search = '';
      this.getMembersWithOptions({
        groupName: this.groupName,
        options: this.memberListOptions,
      });
    },
    isTabActive(tab) {
      return this.activeTab === tab.key;
    },
  },
  watch: {
    getMembers(value) {
      this.filteredList = value.slice(0);
      this.memberList = value.slice(0);
    },
  },
  computed: {
    ...mapGetters({
      getMembers: 'accessGroup/getMembers',
      groupName: 'accessGroup/getGroupName',
    }),
  },
  data() {
    const fullMemberList = this.$store.getters['accessGroup/getMembers'];
    return {
      memberListOptions: {
        search: '',
        role: defaultTab,
        sort: 'role-asc',
      },
      filter: '',
      tabList: [
        {
          key: 'all',
          label: this.fluent(
            'access-group_members',
            'tabs-container__item-all',
          ),
        },
        {
          key: 'curators',
          label: this.fluent(
            'access-group_members',
            'tabs-container__item-curators',
          ),
        },
        {
          key: 'members',
          label: this.fluent(
            'access-group_members',
            'tabs-container__item-members',
          ),
        },
      ],
      activeTab: defaultTab,
    };
  },
};
</script>

<style>
.list-container__control-bar {
  background: var(--white);
  box-shadow: var(--shadowCard);
  margin: 0;
  position: relative;
  padding: 1.5em;
  display: flex;
  justify-content: space-between;
}

@media (min-width: 57.5em) {
  .list-container__control-bar {
    justify-content: initial;
  }
}

.list-container__control-bar .list-container__tooltip {
  display: flex;
  position: absolute;
  right: 3%;
  top: 50%;
  height: 2em;
  transform: translate(0, -50%);
}

@media (min-width: 35em) {
  .list-container__control-bar .list-container__tooltip {
    right: 2em;
  }
}

.list-container__control-bar .list-container__tooltip .show-more__button {
  margin: 0;
}

.list-container__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

@media (min-width: 57.5em) {
  .list-container__list {
    display: grid;
    grid-template-columns: calc(50% - 0.5em) calc(50% - 0.5em);
    grid-row-gap: 1em;
    grid-column-gap: 1em;
    grid-auto-rows: min-content;
  }
}

.list-container__list .list-item-container {
  width: 100%;
  display: flex;
  margin-top: 1em;
}

.list-container__list-column {
  margin: 0;
  padding: 0;
}

@media (min-width: 57.5em) {
  .list-container__list-column {
    display: flex;
    flex-direction: column;
  }

  .list-container__list .list-item-container:first-child {
    margin-top: 0;
  }
}

.list-container__list .list-item:first-child {
  margin-left: 0;
}

.list-container__top-bar .top-bar__search {
  margin: 0 auto;
  width: 15em;
}

@media (min-width: 57.5em) {
  .list-container__top-bar .top-bar__search {
    width: 25em;
  }
}

.list-container .list-container__empty {
  text-align: center;
  margin: 3em auto;
}
</style>
