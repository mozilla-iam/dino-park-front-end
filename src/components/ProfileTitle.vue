<template>
  <template>
    <p class="profile__title">
      <span class="profile__hr-title">{{ businessTitle }}</span>
      <span class="profile__fun-title">{{ funTitle }}</span>
    </p>
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
    @media (min-width: 42em) {
      .profile__hr-title {
        font-size: 1.425em;
      }
    }
    .profile__fun-title {
      color: var(--gray-60);
      font-size: 1.125em;
    }
    @media (min-width: 57.5em) {
      .profile__title {
        text-align: left;
      }
    }
  </style>
</template>
