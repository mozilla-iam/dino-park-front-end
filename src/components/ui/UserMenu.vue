<template>
  <div class="user-menu" ref="userMenuEl">
    <div class="user-menu__header">
      <button class="user-menu__close-avatar" type="button">
        <span class="visually-hidden">{{ fluent('user-menu_close') }}</span>
        <UserPicture
          v-if="scope.isReady"
          :avatar="{
            picture: user.picture.value,
            username: user.primaryUsername.value,
          }"
          :size="40"
          :useSrcset="true"
          :showLabel="scope.isStaff"
        ></UserPicture>
        <UserPicture
          v-else
          :size="40"
          :useSrcset="true"
          :showLabel="scope.isStaff"
        ></UserPicture>
      </button>
      <div class="user-menu__name">
        <RouterLink
          v-if="scope.isReady"
          :to="{
            name: 'Profile',
            params: { username: user.primaryUsername.value },
          }"
        >
          <span class="user-menu__header-name"
            >{{ user.firstName.value }} {{ user.lastName.value }}</span
          >
          <span class="user-menu__header-email">{{
            user.primaryEmail.value
          }}</span>
        </RouterLink>
      </div>
      <button
        class="user-menu__close-button"
        id="user-menu-close-button"
        type="button"
      >
        <Icon id="x" :width="24" :height="24" />
      </button>
    </div>
    <ul class="user-menu__items">
      <li>
        <RouterLink
          v-if="scope.isReady"
          id="link-usermenu-my-profile"
          :to="{
            name: 'Profile',
            params: { username: user.primaryUsername.value },
          }"
        >
          <span>{{ fluent('user-menu_my-profile') }}</span>
          <Icon id="user" :width="24" :height="24" />
        </RouterLink>
      </li>
      <li>
        <a href="https://sso.mozilla.com" id="link-usermenu-sso-dashboard">
          <span>{{ fluent('user-menu_dashboard') }}</span>
          <Icon id="dashboard" :width="24" :height="24" />
        </a>
      </li>
    </ul>
    <a href="/_/logout" class="user-menu__log-out">
      <span>{{ fluent('user-menu_logout') }}</span>
      <Icon id="log-out" :width="24" :height="24" />
    </a>
  </div>
</template>

<script>
import Modal from '@/components/_functional/Modal.vue';

import Icon from './Icon.vue';
import UserPicture from './UserPicture.vue';

export default {
  name: 'UserMenu',
  mounted() {
    if (matchMedia('(min-width: 50em)').matches === false) {
      Modal.methods.preventBackgroundScrolling();
    }
  },
  destroyed() {
    if (matchMedia('(min-width: 50em)').matches === false) {
      Modal.methods.enableBackgroundScrolling();
    }
  },
  components: {
    Icon,
    UserPicture,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
.user-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--black);
  color: var(--white);
  z-index: var(--layerUserMenu);
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto; /* have scrollbar when needed */
}
@media (min-width: 30em) {
  .user-menu {
    position: absolute;
    left: auto;
    height: auto;
  }
}
.user-menu__header a {
  display: block;
}
.user-menu a {
  color: var(--white);
  text-decoration: none;
  margin: 0 2px;
}
.user-menu a:hover {
  color: var(--white);
}
a.user-menu__log-out,
.user-menu__items a,
.user-menu__faux-link {
  display: flex;
  padding: 1em 1.75em;
}
.focus-styles .user-menu a:focus,
.focus-styles .user-menu button:focus {
  box-shadow: 0px 0 0 1px var(--white), 0 0 0 3px var(--transparentWhite);
}
a.user-menu__log-out svg,
.user-menu__items a svg,
.user-menu__faux-link svg {
  margin-left: auto;
}
.user-menu__faux-link {
  color: var(--gray-50);
  cursor: not-allowed;
}
.user-menu__header {
  padding: 1.5em 1.75em; /* :'( */
  border-bottom: 1px solid var(--gray-50);
  display: flex;
  position: relative;
  flex: none;
  align-items: center;
}
.user-menu__close-avatar,
.user-menu__close-button {
  border: 0;
  background: transparent;
  color: var(--white);
  border: 1px dotted transparent;
  padding: 0;
}
.focus-styles .user-menu__close-avatar:focus,
.focus-styles .user-menu__close-button:focus {
  border: 1px dotted currentColor;
}
.user-menu__close-avatar {
  margin-right: 1em;
  font-size: 1em;
}
.user-menu__close-button {
  margin-left: auto;
}
.user-menu__close-button:hover {
  color: var(--gray-40);
}
.user-menu__close-button svg {
  vertical-align: middle;
}
.user-menu__log-out {
  border-top: 1px solid var(--gray-50);
  margin-top: auto; /* works because it is a flex item in a flex container */
}
.user-menu__header-name,
.user-menu__header-email,
.user-menu a span {
  margin-right: 2em;
  max-width: 12em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.user-menu__header-email {
  color: var(--gray-40);
}
.user-menu__items {
  padding: 0;
  margin: auto 0;
}
@media (min-width: 30em) {
  .user-menu__items {
    margin: 2em 0;
  }
}
a.user-menu__log-out:hover,
.user-menu__items a:hover {
  color: var(--gray-40);
}
.user-menu__items li {
  list-style: none;
  padding: 0.125em;
}
</style>
