<template>
  <li class="search-result">
    <UserPicture :picture="picture" :username="username" cls="search-result__image" :size="40" dinoType="Staff"></UserPicture>
    <RouterLink :to="{ name: 'Profile', params: { username: username } }" class="search-result__profile-link">
      <div class="search-result__name">{{ firstName }} {{ lastName }}</div>
      <div class="search-result__title">{{ title || funTitle }}</div>
    </RouterLink>
    <RouterLink :to="{ name: 'OrgchartHighlight', params: { username: username } }" class="search-result__orgchart-link">
      <img src="@/assets/images/org-chart.svg" width="20" alt="" aria-hidden="true" role="presentation" />
      <span class="visually-hidden">View {{ username }} in org chart</span>
    </RouterLink>
  </li>
</template>

<script>
import UserPicture from '@/components/UserPicture.vue';

export default {
  name: 'SearchResult',
  props: {
    firstName: String,
    lastName: String,
    funTitle: String,
    title: String,
    username: String,
    picture: String,
  },
  components: {
    UserPicture,
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
      z-index: 1;
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
    }
    .search-result__profile-link:hover::before {
      background-color: var(--lightBlue);
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
      line-height: 1; /* avoid extra space underneath image */
      border-radius: var(--cardRadius);
      padding: .72em;
    }
    .search-result__orgchart-link:hover {
      background-color: var(--gray-20);
    }
</style>
