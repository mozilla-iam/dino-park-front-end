<template>
  <article class="members-container">
    <header class="members-container__top-bar">
      <SearchForm
        class="top-bar__search"
        id="access-group-members-search"
        v-on:clear-query="clearSearchHandler"
        :searchFormHandler="searchFormHandler"
        searchFormLabel="Members Search"
      ></SearchForm>
      <Select
        class="options--chevron top-bar__filter"
        label="Filter"
        id="access-group-members-filter"
        :options="[
          { value: 'value1', label: 'Label1' },
          { value: 'value2', label: 'Label2' },
          { value: 'value3', label: 'Label3' },
        ]"
        v-model="filter"
        :collapsedShowLabel="true"
      />
    </header>
    <ul class="members-container__list">
      <li
        v-for="(member, idx) in filteredList"
        :key="idx"
        class="list-item-container"
      >
        <AccessGroupMemberItem :member="member" />
      </li>
    </ul>
  </article>
</template>

<script>
import EditButton from '@/components/ui/EditButton.vue';
import AccessGroupMemberItem from '@/components/access_group/AccessGroupMemberItem.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import Select from '@/components/ui/Select.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'AccessGroupMembers',
  components: {
    EditButton,
    Icon,
    SearchForm,
    Select,
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
      this.filteredList = this.memberList.filter((member) => {
        return (
          member.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        );
      });
      return searchQuery;
    },
    clearSearchHandler() {
      this.filteredList = this.memberList;
    },
  },
  data() {
    return {
      search: '',
      filter: '',
      filteredList: this.$store.state.accessGroup.members.members.slice(0),
      memberList: this.$store.state.accessGroup.members.members.slice(0),
    };
  },
};
</script>

<style>
.members-container__top-bar {
  background: var(--white);
  box-shadow: var(--shadowCard);
  margin: 0 0 2em;
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

.members-container__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.members-container__list .list-item-container {
  width: 100%;
  display: flex;
  margin-top: 1em;
}
@media (min-width: 57.5em) {
  .members-container__list .list-item-container {
    width: calc(50% - 0.5em);
    float: left;
    display: flex;
    margin-top: 0;
  }

  .members-container__list .list-item-container:nth-child(n + 3) {
    margin-top: 0.5em;
  }
  .members-container__list .list-item-container:nth-child(odd) {
    margin-right: 1em;
  }
}

.members-container__list .list-item:first-child {
  margin-left: 0;
}

.members-container__top-bar .top-bar__search {
  margin: 0 1em 0 0;
  width: 15em;
}

@media (min-width: 57.5em) {
  .members-container__top-bar .top-bar__search {
    margin: 0 auto;
    width: 25em;
  }

  .members-container__top-bar .top-bar__filter {
    position: absolute;
    right: 1.5em;
    top: 1.5em;
  }
}

.top-bar__filter .options__toggle {
  background-color: var(--white);
  border-radius: 2em;
  border: 2px solid var(--gray-20);
  padding: 0.75em 2.5em 0.75em 1.5em;
}
</style>
