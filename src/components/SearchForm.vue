<template>
  <form :class="'search-form' + ( modifier ? ' ' + modifier : '')" :action="this.$router.resolve({ name: 'Search', query: { query: searchQuery }}).href" @submit="handleSubmit" method="GET">
    <fieldset>
      <legend class="visually-hidden">Search</legend>
      <div class="search-form__fields">
        <label for="search-query" class="visually-hidden">Search term</label>
        <input type="search" id="search-query" name="query" v-model="searchQuery" class="search-form__input" ref="searchQueryField" placeholder="Search for people by name">
        <button type="submit" class="search-form__submit">
          <img src="@/assets/images/search.svg" alt="" role="presentation" aria-hidden="true" width="20" />
          <span class="visually-hidden">Search</span>
        </button>
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
    handleSubmit(event) {
      event.preventDefault();

      if (!this.searchQuery.length > 0) {
        this.$refs.searchQueryField.focus();
      } else {
        this.$router.push({
          name: 'Search',
          query: {
            query: this.searchQuery,
          },
        });
        this.$emit('close-search-form');
      }
    },
  },
  data() {
    return {
      searchQuery: this.$route.query.query || null,
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
    position: relative;
  }
     .search-form__fields input,
     .search-form__fields button {
       font-size: 1.15em;
       border: 1px solid var(--gray-30);
       padding: .5em;
       background-color: var(--white);
     }
     .search-form__input {
       width: 100%;
       -webkit-appearance: none;
       appearance: none;
       border-radius: 0;
       padding-left: 3em;
       text-align: center;
     }
    .search-form__submit {
       border: 0;
       appearance: none;
       width: 2.5em;
       margin-right: -1px;
       position: absolute;
       left: 0;
       top: 0;
    }
      .search-form__submit img {
        vertical-align: middle;
      }

.search-form--small {
  padding: 1em;
  max-width: none;
  background: var(--white);
  margin-bottom: 1em;
  position: fixed;
  left: 0;
  right: 0;
  top: 4em;
  z-index: var(--layerTopBar);
  box-shadow: var(--shadowCard);
}
</style>
