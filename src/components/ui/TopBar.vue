<template>
  <header class="top-bar" :style="{ marginBottom: extraPadding + 'px' }">
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
        :closeWhenClickedOutside="true"
        ref="showMoreSearch"
        :buttonTextVisuallyHidden="true"
        :moveFocus="false"
      >
        <template slot="overflow">
          <SearchForm
            class="search-form--small hide-desktop"
            id="mobile-search"
            v-on:close-search-form="closeMobileSearchForm()"
          ></SearchForm>
        </template>
        <template slot="button-content">
          <svg
            width="20"
            height="20"
            viewport="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.842 17.158a.537.537 0 0 1 .158.396c0 .158-.053.29-.158.395a.556.556 0 0 1-.404.176.556.556 0 0 1-.405-.176l-5.449-5.484c-.621.539-1.324.96-2.11 1.265a6.838 6.838 0 0 1-2.495.457 6.847 6.847 0 0 1-2.743-.553 7.208 7.208 0 0 1-2.24-1.503A6.909 6.909 0 0 1 .491 9.898a6.942 6.942 0 0 1-.545-2.742c0-.972.182-1.886.545-2.742.363-.855.864-1.6 1.503-2.232A7.208 7.208 0 0 1 4.236.679 6.847 6.847 0 0 1 6.98.125c.96 0 1.869.185 2.724.554.856.369 1.603.87 2.241 1.503a7.027 7.027 0 0 1 1.512 2.232c.37.856.554 1.77.554 2.742 0 .856-.147 1.667-.44 2.435a7.299 7.299 0 0 1-1.195 2.065l5.467 5.502zM6.979 13.08c.808 0 1.573-.155 2.293-.466a5.9 5.9 0 0 0 1.881-1.274 6.11 6.11 0 0 0 1.266-1.881c.31-.715.466-1.482.466-2.303 0-.82-.156-1.588-.466-2.302a6.11 6.11 0 0 0-1.266-1.881 5.9 5.9 0 0 0-1.88-1.275 5.735 5.735 0 0 0-2.294-.466c-.82 0-1.591.156-2.312.466a5.9 5.9 0 0 0-1.88 1.275 6.11 6.11 0 0 0-1.266 1.88 5.716 5.716 0 0 0-.466 2.303c0 .82.155 1.588.466 2.303a6.11 6.11 0 0 0 1.265 1.88 5.9 5.9 0 0 0 1.881 1.275c.72.31 1.491.466 2.312.466z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>
        </template>
      </ShowMore>
      <RouterLink
        v-if="scope.isStaff"
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
          :closeWhenClickedOutside="true"
          :buttonTextVisuallyHidden="true"
        >
          <template slot="overflow">
            <UserMenu></UserMenu>
          </template>
          <template slot="button-content">
            <UserPicture
              :avatar="{
                picture: user.picture.value,
                username: user.primaryUsername.value,
              }"
              :size="40"
              :pictureSize="100"
              dinoType="Staff"
            ></UserPicture>
          </template>
        </ShowMore>
      </template>
      <template v-else>
        …
      </template>
      <Toast
        ref="toast"
        :content="toastContent"
        @reset-toast="toastContent = ''"
      ></Toast>
    </div>
    <SearchForm
      class="search-form--small hide-desktop"
      v-if="showMobileSearch"
      id="mobile-search"
      v-on:close-search-form="closeMobileSearchForm()"
    ></SearchForm>
  </header>
</template>

<script>
import ShowMore from '@/components/_functional/ShowMore.vue';
import Toast from '@/components/ui/Toast.vue';
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
  },
  methods: {
    closeMobileSearchForm() {
      this.showMobileSearch = false;
    },
    showToast(data) {
      this.toastContent = data.content;
    },
  },
  data() {
    return {
      showMobileSearch: false,
      showBanner: true,
      extraPadding: 0,
      toastContent: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    window.addEventListener('resize', this.updatePadding);

    this.$root.$on('toast', (data) => this.showToast(data));
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
.top-bar__search-toggle svg {
  margin-right: 0;
}
</style>
