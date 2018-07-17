<template>
  <div class="person">
    <h3>{{ first_name }} {{ last_name }}</h3>
    <div>{{ preferred_title }}</div>
    <div>{{ team }}</div>
    <div>{{ location }}</div>
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

<style scoped>
  img {
    float: left;
  }
</style>
