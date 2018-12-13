<template>
  <form :class="'search-form' + ( modifier ? ' ' + modifier : '')" :action="this.$router.resolve({ name: 'Search', query: { query, who, }}).href" @submit="handleSubmit" method="GET">
    <fieldset>
      <legend class="visually-hidden">Search</legend>
      <div class="search-form__fields">
        <label for="search-query" class="visually-hidden">Search term</label>
        <input type="text" id="search-query" name="query" v-model="searchQuery" class="search-form__input" ref="searchQueryField" placeholder="Search for people">
        <button type="button" v-if="searchQuery && searchQuery.length > 0" @click="clearQuery" class="search-form__clear-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span class="visually-hidden">Clear query</span>
        </button>
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
            who: this.who,
          },
        });
        this.$emit('close-search-form');
      }
    },
    clearQuery() {
      this.searchQuery = null;
      this.$refs.searchQueryField.focus();
    },
  },
  computed: {
    query: {
      get() {
        return this.$route.query.query || null;
      },
    },
    who() {
      return this.$route.query.who || 'all';
    },
  },
  data() {
    return {
      searchQuery: this.query,
    };
  },
  mounted() {
    this.$refs.searchQueryField.focus();
  },
};
</script>

<style>
.search-form {
  margin-right: auto;
  width: 100%;
  max-width: 31em;
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
     .search-form__fields button[type="submit"] {
       font-size: 1.15em;
     }
     .search-form__input {
       border: 1px solid var(--gray-30);
       width: 100%;
       background-color: var(--white);
       -webkit-appearance: none;
       appearance: none;
       border-radius: 0;
       padding: .5em;
       padding-left: 3em;
     }
     .search-form__input::placeholder {
       text-align: center;
     }
     .search-form__input:focus,
     .search-form__input:hover {
       border: 1px solid var(--blue-60);
     }
     .search-form__input:focus + .search-form__submit,
     .search-form__input:hover + .search-form__submit {
       border-color: var(--blue-60);
     }
     .focus-styles .search-form__input:focus,
     .focus-styles .search-form__input:hover,
     .focus-styles .search-form__input:focus + .search-form__submit,
     .focus-styles .search-form__input:hover + .search-form__submit {
        border-color: var(--gray-30);
     }
    .search-form__submit {
       border: 0;
       border-right: 1px solid var(--gray-30);
       appearance: none;
       background-color: var(--white);
       width: 2.5em;
       padding: .5em;
       margin-right: -1px;
       position: absolute;
       left: 1px;
       top: 1px;
       bottom: 1px;
       transition: background-color .2s ease-in-out;
    }
    .search-form__submit:hover {
      background-color: var(--gray-20);
    }
      .search-form__submit img {
        vertical-align: middle;
        width: 1.15em;
      }
    .search-form__clear-button {
      background-color: var(--white);
      position: absolute;
      right: 0;
      border: 0;
      top: 1em;
      right: 1em;
      width: 2em;
      padding: 0;
      line-height: 1;
    }
    .search-form__clear-button:hover {
      color: var(--blue-60);
    }

.search-form--small {
  padding: 1em;
  max-width: none;
  background: var(--white);
  margin-bottom: 1em;
  position: fixed;
  left: 0;
  right: 0;
  top: 5em;
  z-index: var(--layerTopBar);
  box-shadow: var(--shadowCard);
}
</style>
