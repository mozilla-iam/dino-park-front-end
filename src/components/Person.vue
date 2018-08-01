<template>
  <div class="person">
    <div class="person__name">{{ first_name }} {{ last_name }}</div>
    <div v-if="preferred_title" class="person__preferred-title">{{ preferred_title }}</div>
    <div v-if="team" class="person_team">{{ team }}</div>
    <div v-if="location" class="person__location">{{ location }}</div>
  </div>
</template>

<script>
export default {
  name: 'Person',
  props: {
    first_name: String,
    last_name: String,
    preferred_title: String,
    team: String,
    location: String,
  },
};
</script>

<style>
  .person {
    border: 1px solid var( --midGrey );
    margin-left: 1em;
    padding: 1em 1.5em;
  }
  .person__name {
    font-weight: 700;
  }
  .person__preferred-title {
    color: var( --darkGrey );
  }
</style>
