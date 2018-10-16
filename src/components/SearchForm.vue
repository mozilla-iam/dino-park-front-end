<template>
  <form :class="'search-form' + ( modifier ? ' ' + modifier : '')" :action="this.$router.resolve({ name: 'Search', params: { query: searchQuery }}).href" @submit="preventEmptySubmit">
    <fieldset>
      <legend class="visually-hidden">Search</legend>
      <div class="search-form__fields">
        <button type="submit" class="search-form__submit">
          <img src="@/assets/images/search.svg" alt="" role="presentation" aria-hidden="true" width="20" />
          <span class="visually-hidden">Search</span>
        </button>
        <label for="search-query" class="visually-hidden">Search term</label>
        <input type="search" id="search-query" v-model="searchQuery" class="search-form__input" ref="searchQueryField">
      </div>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    modifier: String,
  },
  methods: {
    preventEmptySubmit(event) {
      if (!this.$refs.searchQueryField.value) {
        event.preventDefault();
        this.$refs.searchQueryField.focus();
      }
    },
  },
  mounted() {
    this.$refs.searchQueryField.focus();
  },
  data() {
    return {
      searchQuery: null,
    };
  },
};
</script>

<style>
.search-form {
  margin-right: auto;
  width: 100%;
  max-width: 25em;
}
  .search-form fieldset {
    border: 0;
    padding: 0;
  }
  .search-form__fields {
    display: flex;
    flex-direction: row;
  }
     .search-form__fields input,
     .search-form__fields button {
       font-size: inherit;
       border: 1px solid var(--gray-30);
       padding: .5em;
       background-color: var(--white);
     }
     .search-form__input {
       width: 100%;
       -webkit-appearance: none;
       appearance: none;
       border-radius: 0;
     }
    .search-form__submit {
       border: 0;
       appearance: none;
       width: 2.5em;
       margin-right: -1px;
    }
      .search-form__submit img {
        vertical-align: middle;
      }

.search-form--small {
  padding: 1em;
  max-width: none;
  background: var(--white);
  margin-bottom: 1em;
}
</style>
