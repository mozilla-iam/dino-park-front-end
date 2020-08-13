<template>
  <article class="list-container">
    <header class="list-container__control-bar">
      <SearchForm
        class="search-container"
        id="access-group-list-search"
        v-on:clear-query="clearSearchHandler"
        :searchFormHandler="searchFormHandler"
        :searchFormLabel="fluent('access-group_list', 'search')"
        :searchFormKeyUpHandler="searchFormKeyUpHandler"
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
import { Api } from '@/assets/js/access-groups-api.js';
import { AbbGroupViewModel } from '@/view_models/AccessGroupViewModel';

const resultsStep = 20;
const defaultListOptions = {
  search: '',
  sort: 'member-count-desc',
  numResults: resultsStep,
};
const accessGroupApi = new Api();
let localFetchList = null;
let next = null;
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
    async fetchList(options) {
      try {
        const data = await accessGroupApi.execute({
          path: 'groups/get',
          endpointArguments: [options],
        });

        localFetchList = data.groups.map(
          (group) => new AbbGroupViewModel(group),
        );
        next = data.next;
        this.groupList = localFetchList;
      } catch (e) {
        console.error('Propagating error during fetchList()', e);
        throw new Error(e);
      }
    },
    async fetchNext(options = {}) {
      try {
        const data = await accessGroupApi.execute({
          path: 'groups/get',
          endpointArguments: [...options, next],
        });

        const nextList = data.groups.map(
          (group) => new AbbGroupViewModel(group),
        );
        next = data.next;

        return nextList;
      } catch (e) {
        console.error('Propagating error during fetchNext()', e);
        throw new Error(e);
      }
    },
    ...mapActions({
      // fetchList: 'accessGroups/fetchList',
      // fetchNext: 'accessGroups/fetchNext',
    }),
    // eslint-disable-next-line
    searchFormHandler(searchQuery, scope) {
      if (this.nextClicked) {
        this.resetOptions();
      }
      this.listOptions.search = searchQuery;
      this.fetchList(this.listOptions);
    },
    searchFormKeyUpHandler(searchQuery, scope) {
      this.searchFormHandler(searchQuery, scope);
    },
    clearSearchHandler() {
      this.listOptions.search = '';
      this.fetchList(this.listOptions);
    },
    async handleShowMoreClicked() {
      this.nextClicked = true;
      const nextList = await this.fetchNext(this.listOptions);
      this.groupList = this.groupList.concat(nextList);
    },
    resetOptions() {
      this.listOptions = defaultListOptions;
      this.nextClicked = false;
    },
  },
  computed: {
    ...mapGetters({
      // rawList: 'accessGroups/getList',
      // groupNext: 'accessGroups/getNext',
    }),
    canShowMore() {
      return next !== null;
    },
  },
  watch: {
    selectedSort(value) {
      if (this.nextClicked) {
        this.resetOptions();
      }
      this.listOptions.sort = value;
      this.fetchList(this.listOptions);
    },
    // rawList(value) {
    //   this.groupList = value;
    // },
  },
  data() {
    return {
      nextClicked: false,
      groupList: localFetchList,
      listOptions: defaultListOptions,
      selectedSort: defaultListOptions.sort,
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
  mounted() {
    this.fetchList(this.defaultListOptions);
  },
};
</script>

<style>
.list-container {
  width: 100%;
}

@media (min-width: 57.5em) {
  .list-container {
    margin: 0;
    box-shadow: none;
    width: auto;
  }
}

.list-container__control-bar {
  margin: 0;
  position: relative;
  padding: 1.5em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: var(--white);
  box-shadow: var(--shadowCard);
  margin: 0 1em 2em 1em;
}

.list-container__control-bar .search-form__input {
  font-size: 1em;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  padding-left: 4em;
}

.list-container__control-bar .search-form__input::placeholder {
  text-align: left;
}

@media (min-width: 57.5em) {
  .list-container__control-bar {
    background: var(--white);
    margin: 0 0 2em 0;
  }

  .list-container__control-bar .search-form__input {
    font-size: initial;
  }
}

.list-container__control-bar .group-select {
  align-self: center;
  margin-left: 1em;
}

.list-container__control-bar .group-select .options__toggle {
  border: 1px solid var(--gray-30);
  padding: 0.75em 2.5em 0.75em 1.75em;
}

.list-container__control-bar .group-select .options__toggle:hover {
  border-color: var(--blue-60);
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
    top: 1.7em;
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
  background: var(--white);
  box-shadow: var(--shadowCard);
  margin: 1em 0;
  word-break: break-all;
  height: min-content;
}

@media (min-width: 57.5em) {
  .list-container__list .list-item-container {
    background: var(--white);
    box-shadow: none;
    margin: 0;
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
  color: var(--gray-50);
}

.list-container .list-container__actions .show-more:hover {
  border: 1px solid transparent;
}
</style>
