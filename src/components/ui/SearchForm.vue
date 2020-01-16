<template>
  <form
    class="search-form"
    :action="this.$router.resolve({ name: 'Search', query: urlQuery }).href"
    @submit="handleSubmit"
    method="GET"
  >
    <fieldset>
      <legend class="visually-hidden">{{ this.fluent('search') }}</legend>
      <div class="search-form__fields">
        <label for="search-query" class="visually-hidden">{{
          this.fluent('search_input')
        }}</label>
        <input
          type="text"
          id="search-query"
          name="query"
          v-model="searchQuery"
          class="search-form__input"
          ref="searchQueryField"
          :placeholder="this.fluent('search_input', 'placeholder')"
        />
        <button
          type="button"
          v-if="searchQuery && searchQuery.length > 0"
          @click="clearQuery"
          class="search-form__clear-button"
        >
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
          <span class="visually-hidden">{{
            this.fluent('search_input', 'clear')
          }}</span>
        </button>
        <button type="submit" class="search-form__submit">
          <svg
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="search-submit-icon-title"
          >
            <title id="search-submit-icon-title">
              {{ this.fluent('search') }}
            </title>
            <path
              d="M17.842 17.158a.537.537 0 0 1 .158.396c0 .158-.053.29-.158.395a.556.556 0 0 1-.404.176.556.556 0 0 1-.405-.176l-5.449-5.484c-.621.539-1.324.96-2.11 1.265a6.838 6.838 0 0 1-2.495.457 6.847 6.847 0 0 1-2.743-.553 7.208 7.208 0 0 1-2.24-1.503A6.909 6.909 0 0 1 .491 9.898a6.942 6.942 0 0 1-.545-2.742c0-.972.182-1.886.545-2.742.363-.855.864-1.6 1.503-2.232A7.208 7.208 0 0 1 4.236.679 6.847 6.847 0 0 1 6.98.125c.96 0 1.869.185 2.724.554.856.369 1.603.87 2.241 1.503a7.027 7.027 0 0 1 1.512 2.232c.37.856.554 1.77.554 2.742 0 .856-.147 1.667-.44 2.435a7.299 7.299 0 0 1-1.195 2.065l5.467 5.502zM6.979 13.08c.808 0 1.573-.155 2.293-.466a5.9 5.9 0 0 0 1.881-1.274 6.11 6.11 0 0 0 1.266-1.881c.31-.715.466-1.482.466-2.303 0-.82-.156-1.588-.466-2.302a6.11 6.11 0 0 0-1.266-1.881 5.9 5.9 0 0 0-1.88-1.275 5.735 5.735 0 0 0-2.294-.466c-.82 0-1.591.156-2.312.466a5.9 5.9 0 0 0-1.88 1.275 6.11 6.11 0 0 0-1.266 1.88 5.716 5.716 0 0 0-.466 2.303c0 .82.155 1.588.466 2.303a6.11 6.11 0 0 0 1.265 1.88 5.9 5.9 0 0 0 1.881 1.275c.72.31 1.491.466 2.312.466z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>
          <span class="visually-hidden">{{ this.fluent('search') }}</span>
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
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
      return this.$route.query.who || this.scope.isStaff ? 'staff' : 'all';
    },
    urlQuery() {
      if (this.query) {
        return { query: this.query, who: this.who };
      }
      return { who: this.who };
    },
  },
  data() {
    return {
      searchQuery: this.$route.query.query || '',
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
.search-form__fields:focus .search-form__input,
.search-form__fields:hover .search-form__input {
  border: 1px solid var(--blue-60);
}
.search-form__fields:focus button[type='submit'],
.search-form__fields:hover button[type='submit'] {
  border-right: 1px solid var(--blue-60);
}
.search-form__fields input,
.search-form__fields button[type='submit'] {
  font-size: 1.15em;
}
.search-form__input {
  border: 1px solid var(--gray-30);
  width: 100%;
  background-color: var(--white);
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0;
  padding: 0.5em 3em;
}
.search-form__input::placeholder {
  text-align: center;
}

.search-form__submit {
  border: 0;
  border-right: 1px solid var(--gray-30);
  appearance: none;
  background-color: var(--white);
  width: 2.5em;
  padding: 0.5em;
  margin-right: -1px;
  position: absolute;
  left: 1px;
  top: 1px;
  bottom: 1px;
  transition: background-color 0.2s ease-in-out;
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
  border: 0;
  top: 1px;
  right: 1px;
  bottom: 1px;
  width: 3em;
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
