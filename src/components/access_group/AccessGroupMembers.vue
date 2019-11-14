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
    </header>
    <ul class="members-container__list">
      <li
        v-for="(column, idx) in filteredListDisplay"
        :key="idx"
        class="list-column-container"
      >
        <ul class="members-container__list-column">
          <li v-for="(member, idx2) in column" :key="idx2" class="list-item-container">
            <AccessGroupMemberItem :member="member" />
          </li>
        </ul>
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
import { getTwoColumnGridArraySplitFromArray } from '@/utils/ComponentUtils';

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
      this.filteredList = this.memberList.filter(member => {
        return member.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
      });
      return searchQuery;
    },
    clearSearchHandler() {
      this.filteredList = this.memberList;
    },
  },
  computed: {
    filteredListDisplay() {
      return getTwoColumnGridArraySplitFromArray(this.filteredList);
    },
  },
  data() {
    const fullMemberList = this.$store.state.accessGroup.curators.concat(
      this.$store.state.accessGroup.members
    );
    return {
      search: '',
      filter: '',
      filteredList: fullMemberList.slice(0),
      memberList: fullMemberList.slice(0),
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

  .members-container__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: grid;
    grid-template-columns: calc(50% - 0.5em) calc(50% - 0.5em);
    grid-row-gap: 1em;
    grid-column-gap: 1em;
    grid-auto-rows: min-content;
  }
}

.members-container__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

@media (min-width: 57.5em) {
  .members-container__list {
    display: grid;
    grid-template-columns: calc(50% - 0.5em) calc(50% - 0.5em);
    grid-row-gap: 1em;
    grid-column-gap: 1em;
    grid-auto-rows: min-content;
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
    /* width: calc(50% - 0.5em); */
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
  margin: 0 1em 0 0;
  width: 15em;
}

@media (min-width: 57.5em) {
  .members-container__top-bar .top-bar__search {
    margin: 0 auto;
    width: 25em;
  }
}
</style>
