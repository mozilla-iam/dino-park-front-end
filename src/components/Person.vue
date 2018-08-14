<template>
  <div class="person">
    <img v-if="picture" :src="picture.value" class="person__photo" alt="">
    <div class="person__name"><a v-if="userId" :href="'/profile/'+ userId.value">{{ firstName.value }} {{ lastName.value }}</a></div>
    <div v-if="funTitle" class="person__preferred-title">{{ funTitle.value }}</div>
    <div v-if="officeLocation" class="person__location">{{ officeLocation.value }}</div>
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
    picture: Object,
  },
};
</script>

<style>
  .person {
    border: 1px solid var( --midGrey );
    margin-left: 1em;
    padding: 1em 1.5em;
    position: relative;
    overflow: hidden;
  }
  .person__name {
    font-weight: 700;
  }
  .person__preferred-title {
    color: var( --darkGrey );
  }
  .person__photo {
    position: absolute;
    top: 1em;
    left: -1em;
    width: 2em;
  }
</style>
