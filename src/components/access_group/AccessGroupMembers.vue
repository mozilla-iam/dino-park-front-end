<template>
  <article class="members-container">
    <header class="members-container__top-bar">
      <SearchForm
        class="top-bar__search"
        id="access-group-members-search"
        :searchFormHandler="searchFormHandler"
        searchFormLabel="Search Members by Name"
      ></SearchForm>
      <Select
        class="options--chevron top-bar__filter"
        label="Filter"
        id="access-group-members-filter"
        :options="[{ value: 'value1', label: 'Label1' }]"
        v-model="filter"
        :collapsedShowLabel="true"
      />
    </header>
    <ul class="members-container__list">
      <li v-for="(member, idx) in memberList" :key="idx"></li>
    </ul>
  </article>
</template>

<script>
import EditButton from '@/components/ui/EditButton.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import Select from '@/components/ui/Select.vue';
import Icon from '@/components/ui/Icon.vue';

const testList = [
  {
    imageUrl: '',
    name: 'Bruce Wayne',
    jobTitle: 'Batman',
    memberSince: '2001',
    addedBy: 'Andrew Sunada',
  },
  {
    imageUrl: '',
    name: 'Dick Grayson',
    jobTitle: 'Nightwing',
    memberSince: '2001',
    addedBy: 'Bruce Wayne',
  },
];

export default {
  name: 'AccessGroupMembers',
  components: { EditButton, Icon, SearchForm, Select },
  props: {
    title: String,
  },
  methods: {
    searchFormHandler(searchQuery, scope) {
      console.log('Searching: ', searchQuery);
      return searchQuery;
    },
  },
  data() {
    return {
      search: '',
      filter: '',
      memberList: testList,
    };
  },
};
</script>

<style>
.members-container__top-bar {
  background: var(--white);
  margin: 0 0 2em;
  position: relative;
  padding: 1.5em;
  display: flex;
}

.members-container__top-bar .top-bar__search {
  margin: 0 auto;
  width: 25em;
}

.members-container__top-bar .top-bar__filter {
  position: absolute;
  right: 1.5em;
  top: 1.5em;
}
</style>
