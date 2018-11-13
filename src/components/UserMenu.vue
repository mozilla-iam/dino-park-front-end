<template>
  <div class="user-menu" ref="userMenuEl">
    <div class="user-menu__header">
      <button class="user-menu__close-avatar" type="button" @click="sendCloseEvent()">
        <span class="visually-hidden">Close user menu</span>
        <UserPicture :picture="picture" :username="username" :size="40"></UserPicture>
      </button>
      <div class="user-menu__name">
        <span class="user-menu__header-name">{{ firstName }} {{ lastName }}</span>
        <span class="user-menu__header-email">{{ primaryEmail }}</span>
      </div>
      <button class="user-menu__close-button" type="button" @click="sendCloseEvent()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          role="presentation"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
    <ul class="user-menu__items">
      <li>
        <router-link :to="{ name: 'Profile', params: { userId: username } }">
          <span>My profile</span>
          <Icon id="user" :width="24" :height="24" />
        </router-link>
      </li>
      <li>
        <a href="https://sso.mozilla.com">
          <span>Dashboard</span>
          <Icon id="dashboard" :width="24" :height="24" />
        </a>
      </li>
      <li>
        <a href="https://sso.mozilla.com/notifications">
          <span>Notifications</span>
          <Icon id="bell" :width="24" :height="24" />
        </a>
      </li>
      <li>
        <a href="#">
          <span>Manage Auto-Login</span>
          <Icon id="sliders" :width="24" :height="24" />
        </a>
      </li>
    </ul>
    <a href="#" class="user-menu__log-out">
      <span>Log out</span>
      <Icon id="log-out" :width="24" :height="24" />
    </a>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import UserPicture from '@/components/UserPicture.vue';

export default {
  name: 'UserMenu',
  props: {
    firstName: String,
    lastName: String,
    picture: String,
    username: String,
    primaryEmail: String,
  },
  methods: {
    sendCloseEvent() {
      this.$parent.$emit('close-user-menu');
    },
    handleDocumentClick(event) {
      // closes user menu if clicked anywhere, except the
      // user menu element itself. Note this also closes
      // it when clicked in _children_ of the user menu,
      // including links (after they are followed)
      if (event.target !== this.$refs.userMenuEl) {
        this.sendCloseEvent();
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleDocumentClick);
  },
  destroyed() {
    document.removeEventListener('click', this.handleDocumentClick);
  },
  components: {
    Icon,
    UserPicture,
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
    z-index: calc(var(--layerModal) - 1);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: auto; /* have scrollbar when needed */
  }
  @media(min-width:30em) {
    .user-menu {
      left: auto;
      height: auto;
    }
  }
    .user-menu a {
      color: var(--white);
      display: flex;
      padding: 1em 1.75em;
      text-decoration: none;
    }
      .user-menu a svg {
        margin-left: auto;
      }
    .user-menu__header {
      padding: .675em 1.75em;
      border-bottom: 1px solid var(--gray-50);
      display: flex;
      position: relative;
    }
      .user-menu__close-avatar,
      .user-menu__close-button {
        border: 0;
        background: transparent;
        color: var(--white);
        border: 1px dotted transparent;
        padding: 0;
      }
      .user-menu__close-avatar:focus,
      .user-menu__close-button:focus {
        border: 1px dotted currentColor;
      }
      .user-menu__close-avatar {
        margin-right: 1em;
      }
      .user-menu__close-button {
        margin-left: auto;
      }
      .user-menu__close-button:hover {
        color: var(--gray-40);
      }
    .user-menu__log-out {
      border-top: 1px solid var(--gray-50);
      margin-top: auto; /* works because it is a flex item in a flex container */
    }
    .user-menu__log-out:hover {
      color: var(--gray-40);
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
    @media(min-width:30em) {
      .user-menu__items {
        margin: 2em 0;
      }
    }
      .user-menu__items li {
        list-style: none;
        padding: 0.125em;
      }
      .user-menu__items a:hover {
        color: var(--gray-40);
      }
</style>
