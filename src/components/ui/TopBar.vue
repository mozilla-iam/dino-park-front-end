<template>
  <header class="top-bar" :style="{ marginBottom: extraPadding + 'px' }">
    <div class="top-bar__bar">
      <RouterLink
        :to="{ name: 'Home' }"
        class="top-bar__link top-bar__link--logo"
      >
        <img src="@/assets/images/mozilla.svg" :alt="fluent('mozilla')" />
      </RouterLink>
      <SearchForm
        :searchFormHandler="searchFormHandler"
        :searchFormLabel="fluent('search_input', 'placeholder')"
        class="hide-mobile"
      >
        <TourTooltip :index="1" selector=".search-form__submit"></TourTooltip>
      </SearchForm>
      <ShowMore
        :buttonText="fluent('search', 'open')"
        :alternateButtonText="fluent('search', 'close')"
        buttonClass="hide-desktop top-bar__search-toggle"
        :closeWhenClickedOutside="true"
        ref="showMoreSearch"
        :buttonTextVisuallyHidden="true"
        :moveFocus="false"
      >
        <template slot="overflow">
          <SearchForm
            :searchFormHandler="searchFormHandler"
            :searchFormLabel="fluent('search_input', 'placeholder')"
            class="search-form--small hide-desktop"
            id="mobile-search"
            v-on:close-search-form="closeMobileSearchForm()"
          ></SearchForm>
        </template>
        <template slot="button-content">
          <Icon id="search" :width="20" :height="20" />
        </template>
      </ShowMore>
      <RouterLink
        v-if="showAccessGroupNav"
        :to="{ name: indexPageName }"
        class="top-bar__link"
        exact-active-class="top-bar__link--current"
        :title="fluent('access-group-nav-bar')"
      >
        <Icon id="users-outline" :width="24" :height="24" />
      </RouterLink>
      <RouterLink
        v-if="scope.isStaff"
        :to="{ name: 'Orgchart' }"
        class="top-bar__link"
        exact-active-class="top-bar__link--current"
        :title="fluent('orgchart_nav-bar')"
      >
        <title id="org-chart-link-icon-title">{{ fluent('orgchart') }}</title>
        <Icon id="org-chart" :width="24" :height="24" />
      </RouterLink>
      <template v-if="scope.isLoggedIn">
        <ShowMore
          :buttonText="fluent('user-menu_open')"
          :alternateButtonText="fluent('user-menu_close')"
          buttonClass="top-bar__user-menu-toggle"
          :closeWhenClickedOutside="true"
          :buttonTextVisuallyHidden="true"
        >
          <template slot="overflow">
            <UserMenu></UserMenu>
          </template>
          <template slot="button-content">
            <UserPicture
              v-if="scope.isReady"
              :avatar="{
                picture: user.picture.value,
                username: user.primaryUsername.value,
              }"
              :size="40"
              :pictureSize="100"
              :showLabel="scope.isStaff"
            ></UserPicture>
            <UserPicture
              v-else
              :size="40"
              :pictureSize="100"
              :showLabel="scope.isStaff"
            ></UserPicture>
          </template>
        </ShowMore>
      </template>
      <ExternalButtonLink
        v-else
        href="/_/login"
        class="top-bar__login"
        iconRight="chevron-right"
        :text="fluent('log_in')"
      ></ExternalButtonLink>
      <Toast />
    </div>
    <SearchForm
      class="search-form--small hide-desktop"
      :searchFormLabel="fluent('search_input', 'placeholder')"
      :searchFormHandler="searchFormHandler"
      v-if="showMobileSearch"
      id="mobile-search"
      v-on:close-search-form="closeMobileSearchForm()"
    ></SearchForm>
  </header>
</template>

<script>
import { ACCESS_GROUP_INDEX_PAGE } from '@/router';
import ShowMore from '@/components/_functional/ShowMore.vue';
import Toast from '@/components/ui/Toast.vue';
import Icon from '@/components/ui/Icon.vue';
import ExternalButtonLink from '@/components/ui/ExternalButtonLink.vue';
import TourTooltip from '@/components/guide/TourTooltip.vue';
import SearchForm from './SearchForm.vue';
import UserMenu from './UserMenu.vue';
import UserPicture from './UserPicture.vue';

export default {
  name: 'TopBar',
  components: {
    SearchForm,
    ShowMore,
    Toast,
    UserMenu,
    UserPicture,
    Icon,
    ExternalButtonLink,
    TourTooltip,
  },
  methods: {
    closeMobileSearchForm() {
      this.showMobileSearch = false;
    },
    searchFormHandler(searchQuery, scope) {
      this.$router.push({
        name: 'Search',
        query: {
          query: searchQuery,
          who: scope,
        },
      });
    },
  },
  data() {
    return {
      showMobileSearch: false,
      showBanner: true,
      extraPadding: 0,
      indexPageName: ACCESS_GROUP_INDEX_PAGE,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    showAccessGroupNav() {
      const { isNdaed, isStaff } = this.$store.state.scope;
      return isNdaed || isStaff;
    },
  },
  mounted() {
    window.addEventListener('resize', this.updatePadding);
  },
};
</script>

<style>
.top-bar {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: var(--layerTopBar);
}
.top-bar__bar {
  background-color: var(--white);
  border-bottom: 1px solid var(--gray-30);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
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
  padding: 0.57em;
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
.focus-styles .top-bar__link--current:focus::before /* because of https://bugzilla.mozilla.org/show_bug.cgi?id=687311 */
{
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
.top-bar__search-toggle svg {
  margin-right: 0;
}
.top-bar__login {
  margin-left: 1em;
  margin-right: 1em;
}
</style>
