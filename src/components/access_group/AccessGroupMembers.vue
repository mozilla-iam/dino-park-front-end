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
      <li v-for="(member, idx) in memberList" :key="idx" class="list-item">
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
          <button class="member-action">
            <Icon id="info" :width="24" :height="24" />
          </button>
        </article>
        <aside class="list-item__expandable"></aside>
      </li>
    </ul>
  </article>
</template>

<script>
import UserPicture from '@/components/ui/UserPicture.vue';
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
  components: { EditButton, Icon, SearchForm, Select, UserPicture },
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
  box-shadow: var(--shadowCard);
  margin: 0 0 2em;
  position: relative;
  padding: 1.5em;
  display: flex;
}

.members-container__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.members-container__list .list-item {
  background: var(--white);
  width: calc(50% - 0.5em);
  float: left;
  display: flex;
  box-shadow: var(--shadowCard);
}

.members-container__list .list-item:nth-child(odd) {
  margin-right: 1em;
}

.members-container__list .list-item:first-child {
  margin-left: 0;
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

.list-item .list-item__expandable {
  display: none;
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
