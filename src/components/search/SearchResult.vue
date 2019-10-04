<template>
  <li class="search-result">
    <UserPicture
      :avatar="{ picture, username }"
      class="search-result__image"
      :size="40"
      :isStaff="isStaff"
    ></UserPicture>
    <RouterLink
      :to="{ name: 'Profile', params: { username: username } }"
      class="search-result__profile-link"
    >
      <div class="search-result__name">{{ displayName }}</div>
      <div class="search-result__title">{{ title || funTitle }}</div>
    </RouterLink>
    <RouterLink
      v-if="scope.isStaff && isStaff"
      :to="{ name: 'OrgchartHighlight', params: { username: username } }"
      class="search-result__orgchart-link"
    >
      <svg
        width="22"
        height="22"
        viewport="0 0 22 22"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="presentation"
        focusable="false"
      >
        <path
          d="M11.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 2a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm7 8a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.5 7a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3 7h1v1H3V7zm0 2h1v1H3V9zm1 3h-.5a.5.5 0 0 1-.5-.5V11h1v1zm1 0v-1h1v1H5zm2 0v-1h1v1H7zm4 2h1v1h-1v-1zm0 2h1v1h-1v-1zm1 3h-.5a.5.5 0 0 1-.5-.5V18h1v1zm1 0v-1h1v1h-1z"
          fill="currentColor"
          fill-rule="nonzero"
        />
      </svg>
      <span class="visually-hidden">View {{ username }} in org chart</span>
    </RouterLink>
  </li>
</template>

<script>
import UserPicture from '@/components/ui/UserPicture.vue';

export default {
  name: 'SearchResult',
  props: {
    firstName: String,
    lastName: String,
    funTitle: String,
    title: String,
    username: String,
    picture: String,
    isStaff: Boolean,
  },
  components: {
    UserPicture,
  },
  computed: {
    displayName() {
      if (this.firstName || this.lastName) {
        return `${this.firstName} ${this.lastName}`;
      }
      if (!this.username.startsWith('r--')) {
        return this.username;
      }
      return 'Anonymous User';
    },
  },
};
</script>

<style>
.search-result {
  background: var(--white);
  padding: 1em;
  box-shadow: var(--shadowCard);
  margin: 0 auto 1em;
  max-width: 45em;
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: var(--cardRadius);
  position: relative;
}
.search-result .user-picture {
  margin-right: 1em;
  z-index: var(--layerOne);
}
.search-result__profile-link {
  text-decoration: none;
}
.search-result .user-picture,
.search-result__org-chart-link {
  flex: none;
}
.search-result__profile-link::before {
  content: '';
  display: block;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: background-color 0.2s ease-in-out;
  border: 1px solid transparent;
}
.search-result__profile-link:hover::before {
  background-color: var(--lightBlue);
  border-color: var(--blue-60);
}
.search-result__profile-link div {
  position: relative;
}
.search-result__name {
  font-weight: 700;
  color: var(--black);
}
.search-result__title {
  color: var(--gray-50);
  text-decoration: none;
}
.search-result__orgchart-link {
  margin-left: auto;
  position: relative; /* so that it stacks on top of search result link */
  line-height: 0.75; /* avoid extra space underneath image */
  border-radius: var(--imageRadius);
  padding: 0.72em;
  color: var(--black);
}
.search-result__orgchart-link:hover {
  background-color: var(--gray-20);
}
</style>
