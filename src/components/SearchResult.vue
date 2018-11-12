<template>
  <li class="search-result">
    <UserPicture :picture="picture" :username="user_id" cls="search-result__image" :size="40"></UserPicture>
    <router-link :to="{ name: 'Profile', params: { userId: user_id } }" class="search-result__profile-link">
      <div class="search-result__name">{{ first_name }} {{ last_name }}</div>
      <div class="search-result__title">{{ fun_title }}</div>
    </router-link>
    <router-link :to="{ name: 'OrgchartHighlight', params: { userId: user_id } }" class="search-result__orgchart-link">
      <img src="@/assets/images/org-chart.svg" width="26" alt="" aria-hidden="true" role="presentation" />
      <span class="visually-hidden">View {{ user_id }} in org chart</span>
    </router-link>
  </li>
</template>

<script>
import UserPicture from '@/components/UserPicture.vue';

export default {
  name: 'SearchResult',
  props: {
    first_name: String,
    last_name: String,
    fun_title: String,
    user_id: String,
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
    margin-bottom: 1em;
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
  }
    .search-result__image {
      width: 3em;
      height: 3em;
      margin-right: 1em;
      border-radius: var(--imageRadius);
      position: relative;
      z-index: 1;
    }
    .search-result__profile-link {
      text-decoration: none;
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
    }
</style>
