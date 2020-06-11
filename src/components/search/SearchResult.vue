<template>
  <li class="search-result">
    <UserPicture
      :avatar="{ picture, username }"
      class="search-result__image"
      :size="40"
      :showLabel="isStaff"
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
      <Icon id="org-chart" :width="24" :height="24" />
      <span class="visually-hidden">{{
        fluent('search_result_orgchart', { username })
      }}</span>
    </RouterLink>
  </li>
</template>

<script>
import UserPicture from '@/components/ui/UserPicture.vue';
import Icon from '@/components/ui/Icon.vue';

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
    Icon,
  },
  computed: {
    displayName() {
      if (this.firstName && this.lastName) {
        return `${this.firstName} ${this.lastName}`;
      }
      if (this.firstName) {
        return this.firstName;
      }
      if (this.lastName) {
        return this.lastName;
      }
      if (
        !this.username.startsWith('r--') &&
        !this.username.startsWith('p--')
      ) {
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
