<template>
  <header class="top-bar">
    <a href="/" class="top-bar__link top-bar__link--logo"><img src="@/assets/images/mozilla.svg" alt="Mozilla logo" width="90" /></a>
    <a href="/orgchart" class="top-bar__link">Org chart</a>
    <ShowMore buttonText="Open user menu" alternateButtonText="Close user menu" buttonClass="top-bar__user-menu-toggle" :expanded="false" v-on:close-user-menu="closeUserMenu()" ref="showMoreEl">
      <template slot="overflow">
        <UserMenu></UserMenu>
      </template>
      <template slot="button-content">
        <img src="@/assets/images/user-demo.png" alt="Avatar" width="40" />
      </template>
    </ShowMore>
  </header>
</template>

<script>
import ShowMore from '@/components/functional/ShowMore.vue';
import UserMenu from '@/components/UserMenu.vue';

export default {
  name: 'TopBar',
  components: {
    ShowMore,
    UserMenu,
  },
  methods: {
    closeUserMenu() {
      this.$refs.showMoreEl.expanded = false;
    },
  },
};
</script>

<style>
  .top-bar {
    background-color: var(--white);
    border-bottom: 1px solid var(--midGrey);
    display: flex;
    align-items: center;
    margin-bottom: 2em;
  }
    .top-bar__link {
      border-left: 1px solid var(--midGrey);
      padding: 1.25em;
    }
    .top-bar__link--logo {
      margin-right: auto;
      margin-left: 0;
      padding: 1em;
      border-right: 1px solid var(--midGrey);
      max-width: none; /* don't shrink on small screens */
    }
    .top-bar__link--logo img {
      vertical-align: middle;
    }
    .top-bar .show-more {
      padding: .5em;
      border-left: 1px solid var(--midGrey);
    }
    .top-bar__user-menu-toggle {
      border: 0;
      background-color: none;
    }
      .top-bar__user-menu-toggle .show-more__button-text {
        position: absolute;
        left: -9999em;
        top: -9999em;
      }
</style>
