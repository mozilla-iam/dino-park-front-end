<template>
  <li class="search-result">
    <img v-if="picture" :src="picture" alt="" class="search-result__image">
    <div>
      <div class="search-result__name">{{ first_name }} {{ last_name }}</div>
      <div class="search-result__title">{{ fun_title }}</div>
    </div>
    <router-link :to="{ name: 'OrgchartHighlight', params: { userId: user_id } }" class="search-result__link">
      <img src="@/assets/images/org-chart.svg" width="30" alt="" aria-hidden="true" role="presentation" />
      <span class="visually-hidden">View {{ user_id }} in org chart</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'SearchResult',
  props: {
    first_name: String,
    last_name: String,
    fun_title: String,
    user_id: String,
    picture: String,
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
  }
    .search-result__image {
      width: 3em;
      height: 3em;
      margin-right: 1em;
      border-radius: var(--imageRadius);
    }
    .search-result__name {
      font-weight: 700;
    }
    .search-result__title {
      color: var(--gray-50);
    }
    .search-result__link {
      margin-left: auto;
    }
</style>
