<template>
  <p class="profile__title"><span class="profile__hr-title">{{ businessTitle }}</span> <span class="profile__fun-title">{{ funTitle }}</span></p>
</template>

<script>
export default {
  name: 'ProfileTitle',
  props: {
    businessTitle: String,
    funTitle: String,
  },
};
</script>

<style>
.profile__title {
  text-align: center;
}
  .profile__hr-title,
  .profile__fun-title {
    display: block;
  }
  .profile__hr-title {
    font-weight: 400;
    font-size: 1.25em;
  }
  .profile__fun-title {
    color: var(--gray-60);
  }
@media(min-width:50em) {
  .profile__title {
    text-align: left;
  }
}
</style>
