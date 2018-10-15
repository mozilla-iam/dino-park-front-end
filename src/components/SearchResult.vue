<template>
  <li class="search-result">
    <div>
      <div class="search-result__name">{{ first_name.value }} {{ last_name.value }}</div>
      <div class="search-result__title">{{ fun_title.value }}</div>
    </div>
    <a :href="'/org/' + user_id.value" class="search-result__link">
      <img src="@/assets/images/org-chart.svg" width="30" alt="" aria-hidden="true" role="presentation" />
      <span class="visually-hidden">View {{ user_id.value }} in org chart</span>
    </a>
  </li>
</template>

<script>
export default {
  name: 'SearchResult',
  props: {
    first_name: Object,
    last_name: Object,
    fun_title: Object,
    user_id: Object,
    picture: Object,
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
    .search-result__link {
      margin-left: auto;
    }
</style>
