<template>
  <div class="person">
    <div class="person__name"><a :href="'/profile/'+ userId.value">{{ firstName.value }} {{ lastName.value }}</a></div>
    <div v-if="funTitle.value" class="person__preferred-title">{{ funTitle.value }}</div>
    <div v-if="officeLocation.value" class="person__location">{{ officeLocation.value }}</div>
  </div>
</template>

<script>
export default {
  name: 'Person',
  props: {
    userId: Object,
    firstName: Object,
    lastName: Object,
    officeLocation: Object,
    funTitle: Object,
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
