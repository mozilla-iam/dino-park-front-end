<template>
  <header class="top-bar">
    <div class="top-bar__bar">
      <RouterLink
        :to="{ name: 'Home' }"
        class="top-bar__link top-bar__link--logo"
        ><img src="@/assets/images/mozilla.svg" alt="Mozilla logo"
      /></RouterLink>
      <SearchForm class="hide-mobile"></SearchForm>
      <ShowMore
        buttonText="Open search"
        alternateButtonText="Close search"
        buttonClass="hide-desktop top-bar__search-toggle"
        :expanded="false"
        :closeWhenClickedOutside="true"
        ref="showMoreSearch"
      >
        <template slot="overflow">
          <SearchForm
            modifier="search-form--small hide-desktop"
            id="mobile-search"
            v-on:close-search-form="closeMobileSearchForm()"
          ></SearchForm>
        </template>
        <template slot="button-content">
          <img
            src="@/assets/images/search.svg"
            alt=""
            role="presentation"
            aria-hidden="true"
            width="20"
          />
        </template>
      </ShowMore>
      <RouterLink
        :to="{ name: 'Orgchart' }"
        class="top-bar__link"
        exact-active-class="top-bar__link--current"
      >
        <svg
          width="22"
          height="22"
          viewport="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-labelledby="org=chart-link-icon-title"
        >
          <title id="org-chart-link-icon-title">Org chart</title>
          <path
            d="M11.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 2a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm7 8a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.5 7a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3 7h1v1H3V7zm0 2h1v1H3V9zm1 3h-.5a.5.5 0 0 1-.5-.5V11h1v1zm1 0v-1h1v1H5zm2 0v-1h1v1H7zm4 2h1v1h-1v-1zm0 2h1v1h-1v-1zm1 3h-.5a.5.5 0 0 1-.5-.5V18h1v1zm1 0v-1h1v1h-1z"
            fill="currentColor"
            fill-rule="nonzero"
          />
        </svg>
      </RouterLink>
      <template v-if="user">
        <ShowMore
          buttonText="Open user menu"
          alternateButtonText="Close user menu"
          buttonClass="top-bar__user-menu-toggle"
          :expanded="false"
          @close-user-menu="closeUserMenu"
          ref="showMoreUserMenu"
          :closeWhenClickedOutside="true"
        >
          <template slot="overflow">
            <UserMenu></UserMenu>
          </template>
          <template slot="button-content">
            <UserPicture
              :picture="user.picture.value"
              :username="user.primaryUsername.value"
              :size="40"
              dinoType="Staff"
            ></UserPicture>
          </template>
        </ShowMore>
      </template>
      <template v-else>
        …
      </template>
    </div>
    <SearchForm
      modifier="search-form--small hide-desktop"
      v-if="mobileSearchOpen"
      id="mobile-search"
      v-on:close-search-form="closeMobileSearchForm()"
    ></SearchForm>
  </header>
</template>

<script>
import ShowMore from '@/components/_functional/ShowMore.vue';
import SearchForm from './SearchForm.vue';
import UserMenu from './UserMenu.vue';
import UserPicture from './UserPicture.vue';

export default {
  name: 'TopBar',
  components: {
    SearchForm,
    ShowMore,
    UserMenu,
    UserPicture,
  },
  methods: {
    closeUserMenu() {
      this.$refs.showMoreUserMenu.isExpanded = false;
    },
    closeMobileSearchForm() {
      this.$refs.showMoreSearch.isExpanded = false;
    },
  },
  data() {
    return {
      mobileSearchOpen: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
.top-bar__bar {
  background-color: var(--white);
  border-bottom: 1px solid var(--gray-30);
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: var(--layerTopBar);
}
.top-bar__search-toggle {
  border: 0;
  background-color: transparent;
  padding: 0.75em;
  line-height: 0;
}
.top-bar__search-toggle[aria-expanded='true'] {
  background-color: var(--gray-20);
}
.top-bar__link {
  padding: 0.75em;
  text-transform: uppercase;
  color: var(--black);
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
  border-radius: var(--imageRadius);
  line-height: 0.75; /* to not add vertical whitespace */
}
.top-bar__link img {
  vertical-align: middle;
}
.top-bar__link:hover {
  background-color: var(--gray-20);
}
.top-bar__link--current {
  position: relative;
  background-color: var(--gray-20);
}
.focus-styles .top-bar__link--current:focus {
  outline: none;
}
.focus-styles .top-bar__link--current:focus::before /* because of https://bugzilla.mozilla.org/show_bug.cgi?id=687311 */ {
  content: '';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.show-more--expanded + .top-bar__link--current {
  background-color: transparent;
}
@media (min-width: 50em) {
  .top-bar__link--current {
    background-color: transparent;
  }
  .top-bar__link--current::after {
    content: '';
    height: 0.1428em;
    background: black;
    width: 100%;
    position: absolute;
    bottom: -1.4em;
    left: 0;
  }
  .top-bar__link--current {
    outline: none;
  }
}
.top-bar__link--logo {
  margin-right: auto;
  margin: 1.6em auto 1.6em 1.6em;
  padding: 0;
  max-width: none; /* don't shrink on small screens */
  border-radius: 0;
}
.top-bar__link--logo img {
  vertical-align: middle;
  width: 103px;
  height: 30px;
}
@media (min-width: 57.5em) {
  .top-bar__link--logo img {
    width: 112px;
    height: 32px;
  }
}
.top-bar__user-menu-toggle {
  border: 0;
  background-color: transparent;
  padding: 1.6em;
}
.top-bar__user-menu-toggle:hover {
  background-color: var(--gray-20);
}
.top-bar__user-menu-toggle img {
  border-radius: var(--imageRadius);
}
.top-bar__user-menu-toggle img,
.top-bar__search-toggle img {
  margin-right: 0;
}
.top-bar__search-toggle .show-more__button-text,
.top-bar__user-menu-toggle .show-more__button-text {
  position: absolute;
  left: -9999em;
  top: -9999em;
}
</style>
