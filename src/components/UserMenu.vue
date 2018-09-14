<template>
  <div class="user-menu">
    <div class="user-menu__header">
      <button class="user-menu__close-button" type="button" @click="sendCloseEvent()">
        <span class="visually-hidden">Close user menu</span>
        <img src="@/assets/images/user-demo.png" alt="" width="40" aria-hidden="true" />
      </button>
      <div class="user-menu__name">
        <span class="user-menu__header-name">Henrik Mitsch</span><br>
        <span class="user-menu__header-email">hmitsch@mozilla.com</span>
      </div>
    </div>
    <ul class="user-menu__items">
      <li><a href="#">My profile</a></li>
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Notifications</a></li>
      <li><a href="#">Identity Settings</a></li>
      <li><a href="#">Manage Auto-Login</a></li>
    </ul>
    <a href="#" class="user-menu__log-out">Log out</a>
  </div>
</template>

<script>
export default {
  name: 'UserMenu',
  methods: {
    sendCloseEvent() {
      this.$parent.$emit('close-user-menu');
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
    z-index: calc(var(--layerModal) - 1);
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  @media(min-width:20em) {
    .user-menu {
      left: auto;
    }
  }
    .user-menu a {
      color: var(--white);
    }
    .user-menu__header {
      padding: 1em;
      border-bottom: 1px solid var(--darkGrey);
      display: flex;
      position: relative;
    }
      .user-menu__close-button {
        border: 0;
        background: transparent;
        margin-right: 1em;
        border: 1px dotted transparent;
      }
      .user-menu__close-button:focus {
        border: 1px dotted var(--white);
      }
    .user-menu__log-out {
      border-top: 1px solid var(--darkGrey);
      padding: 1em;
      margin-top: auto; /* works because it is a flex item in a flex container */
    }
    .user-menu__header-name,
    .user-menu__header-email,
    .user-menu__items {
      font-size: .9em;
    }
    .user-menu__header-email {
      color: var(--lightGrey);
    }
    .user-menu__items {
      padding: 0;
      margin: 1em 0;
    }
      .user-menu__items li {
        list-style: none;
        padding: 0.125em;
      }
      .user-menu__items a {
        padding: 2em;
        display: block;
        text-decoration: none;
      }
      .user-menu__items a:hover {
        color: inherit;
        background-color: rgba(0,0,0,0.5);
      }
</style>
