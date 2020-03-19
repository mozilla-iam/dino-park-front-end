<template>
  <article class="list-container">
    <header class="list-container__control-bar">
      <SearchForm
        class="search-container"
        id="access-group-list-search"
        v-on:clear-query="clearSearchHandler"
        :searchFormHandler="searchFormHandler"
        :searchFormLabel="fluent('access-group_list', 'search')"
      ></SearchForm>
      <Select
        class="options--chevron options--large group-select"
        label="Sort"
        id="member-list-sort"
        v-model="selectedSort"
        :options="sortOptions"
        :nonOption="defaultSort"
      ></Select>
    </header>
    <ul class="list-container__list">
      <li
        v-for="(group, idx) in groupList"
        :key="idx"
        class="list-item-container"
      >
        <AccessGroupListItem :group="group" />
      </li>
    </ul>
    <footer class="list-container__actions" v-if="canShowMore">
      <Button class="show-more" @click="handleShowMoreClicked">
        <Icon id="chevron-down" :width="24" :height="24"></Icon>
        {{ fluent('access-group_list', 'show-more') }}
      </Button>
    </footer>
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import EditButton from '@/components/ui/EditButton.vue';
import Button from '@/components/ui/Button.vue';
import AccessGroupListItem from '@/components/access_group/AccessGroupListItem.vue';
import SearchForm from '@/components/ui/SearchForm.vue';
import Select from '@/components/ui/Select.vue';
import Tooltip from '@/components/ui/Tooltip.vue';
import Icon from '@/components/ui/Icon.vue';

const resultsStep = 20;
export default {
  name: 'AccessGroupList',
  components: {
    EditButton,
    Button,
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
      fetchList: 'accessGroups/fetch',
    }),
    // eslint-disable-next-line
    searchFormHandler(searchQuery, scope) {
      this.listOptions.search = searchQuery;
      this.fetchList(this.listOptions);
    },
    clearSearchHandler() {
      this.listOptions.search = '';
      this.fetchList(this.listOptions);
    },
    handleShowMoreClicked() {
      this.listOptions.numResults += resultsStep;
      this.fetchList(this.listOptions);
    },
  },
  computed: {
    ...mapGetters({
      groupList: 'accessGroups/list',
    }),
    canShowMore() {
      return this.groupList.length > resultsStep;
    },
  },
  watch: {
    selectedSort(value) {
      this.listOptions.sort = value;
      this.fetchList(this.listOptions);
    },
  },
  data() {
    return {
      listOptions: {
        search: '',
        sort: 'name-asc',
        numResults: resultsStep,
      },
      selectedSort: '',
      sortOptions: [
        { value: 'name-asc', label: 'Name A-Z' },
        { value: 'name-desc', label: 'Name Z-A' },
        { value: 'member-count-desc', label: 'Most members' },
        { value: 'member-count-asc', label: 'Fewest members' },
      ],
      defaultSort: {
        value: '',
        label: 'Sort',
      },
    };
  },
};
</script>

<style>
.list-container {
  width: 100%;
  background: var(--white);
  box-shadow: var(--shadowCard);
}

@media (min-width: 57.5em) {
  .list-container {
    background: transparent;
    box-shadow: none;
  }
}

.list-container__control-bar {
  margin: 0;
  position: relative;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 57.5em) {
  .list-container__control-bar {
    background: var(--white);
    margin-bottom: 1em;
  }
}

.list-container__control-bar .group-select {
  align-self: center;
  margin-top: 1em;
}

.list-container__control-bar .group-select .options__toggle {
  border: 1px solid var(--gray-30);
}

.search-container {
  margin: 0 auto;
}

@media (min-width: 57.5em) {
  .list-container__control-bar {
    justify-content: initial;
    position: relative;
  }

  .list-container__control-bar .group-select {
    position: absolute;
    top: 0;
    right: 1em;
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
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 1em;
    grid-column-gap: 1em;
    grid-auto-rows: min-content;
  }
}

.list-container__list .list-item-container {
  width: 100%;
  display: flex;
}

.list-container__list .list-item-container:nth-child(even) {
  background: var(--gray-20);
}
@media (min-width: 57.5em) {
  .list-container__list .list-item-container {
    background: var(--white);
  }
  .list-container__list .list-item-container:nth-child(even) {
    background: var(--white);
  }
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

.list-container .list-container__actions {
  background: var(--gray-20);
  display: flex;
  justify-content: center;
  padding: 1em;
}

.list-container .list-container__actions .show-more {
  background: transparent;
  color: var(--gray-40);
}

.list-container .list-container__actions .show-more:hover {
  border: 1px solid transparent;
}
</style>
