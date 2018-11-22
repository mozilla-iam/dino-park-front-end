<template>
  <header class="top-bar">
    <div class="top-bar__bar">
      <router-link :to="{ name: 'Home' }" class="top-bar__link top-bar__link--logo"><img src="@/assets/images/mozilla.svg" alt="Mozilla logo" /></router-link>
      <SearchForm class="hide-mobile"></SearchForm>
      <button class="hide-desktop top-bar__search-toggle" @click="toggleMobileSearch" aria-controls="mobile-search" :aria-expanded="mobileSearchOpen ? 'true' : 'false'">
        <img src="@/assets/images/search.svg" alt="" role="presentation" aria-hidden="true" width="20" />
        <span class="visually-hidden">
          <template v-if="mobileSearchOpen">Hide search</template>
          <template v-else>Show search</template>
        </span>
      </button>
      <router-link :to="{ name: 'Orgchart' }" class="top-bar__link" exact-active-class="top-bar__link--current"><img src="@/assets/images/org-chart.svg" alt="Org chart" width="20" title="Org chart" /></router-link>
      <ApolloQuery :query="profileQuery">
        <template slot-scope="{ result: { loading, data, error } }">
          <template v-if="error">
            <Error>
              <h2>{{ error.message }}</h2>
              <pre>{{ error }}</pre>
              <p>An error occured while trying to go fetch user profile</p>
            </Error>
          </template>
          <template v-else-if="data">
            <ShowMore buttonText="Open user menu" alternateButtonText="Close user menu" buttonClass="top-bar__user-menu-toggle" :expanded="false" v-on:close-user-menu="closeUserMenu()" ref="showMoreEl" :closeWhenClickedOutside="true">
              <template slot="overflow">
                <UserMenu v-bind="data.userMenu"></UserMenu>
              </template>
              <template slot="button-content">
                <UserPicture :picture="data.userMenu.picture" :username="data.userMenu.username" :size="40" dinoType="Staff"></UserPicture>
              </template>
            </ShowMore>
          </template>
          <template v-else>
            …
          </template>
        </template>
      </ApolloQuery>
    </div>
    <SearchForm modifier="search-form--small hide-desktop" v-if="mobileSearchOpen" id="mobile-search" v-on:close-search-form="closeMobileSearchForm()"></SearchForm>
  </header>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';
import ShowMore from '@/components/functional/ShowMore.vue';
import UserMenu from '@/components/UserMenu.vue';
import Error from '@/components/Error.vue';
import UserPicture from '@/components/UserPicture.vue';
import { USER_MENU_PROFILE } from '@/queries/profile';

export default {
  name: 'TopBar',
  components: {
    SearchForm,
    ShowMore,
    UserMenu,
    Error,
    UserPicture,
  },
  methods: {
    closeUserMenu() {
      this.$refs.showMoreEl.expanded = false;
    },
    closeMobileSearchForm() {
      this.mobileSearchOpen = false;
    },
    toggleMobileSearch() {
      this.mobileSearchOpen = !this.mobileSearchOpen;
    },
  },
  data() {
    return {
      searchQuery: '',
      mobileSearchOpen: false,
      profileQuery: USER_MENU_PROFILE,
    };
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
  padding: 1em;
  line-height: 0;
}
.top-bar__search-toggle[aria-expanded="true"] {
  background-color: var(--gray-20);
}
.top-bar__link {
  padding: .75em;
  text-transform: uppercase;
  color: var(--black);
  font-weight: 700;
  text-decoration: none;
  transition: background-color .2s ease-in-out;
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
.top-bar__link--current:focus {
  outline: none;
}
.top-bar__link--current:focus::before /* because of https://bugzilla.mozilla.org/show_bug.cgi?id=687311 */ {
  content: '';
  border: 1px solid var(--blue-60);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.top-bar__search-toggle[aria-expanded="true"] + .top-bar__link--current {
  background-color: transparent;
}
@media (min-width: 50em ) {
  .top-bar__link--current {
    background-color: transparent;
  }
  .top-bar__link--current::after {
    content: "";
    height: .1428em;
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
  margin-right: 0;
  border-radius: var(--imageRadius);
}
.top-bar__user-menu-toggle .show-more__button-text {
  position: absolute;
  left: -9999em;
  top: -9999em;
}
</style>
