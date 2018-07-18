<template>
  <div class="person">
    <div>{{ first_name }} {{ last_name }}</div>
    <div v-if="preferred_title">{{ preferred_title }}</div>
    <div v-if="team">{{ team }}</div>
    <div v-if="location">{{ location }}</div>
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
