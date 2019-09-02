<template>
  <div class="profile__name">
    <h1>
      {{ firstName }} {{ lastName }}
      <span class="profile__alternative-name" v-if="alternativeName">
        {{ alternativeName }}</span
      >
    </h1>
    <span class="profile__user-name" v-if="prettierUsername"
      >@{{ prettierUsername }}</span
    >
    <span class="profile__pronoun" v-if="pronouns">{{ pronouns }}</span>
  </div>
</template>

<script>
export default {
  name: 'ProfileName',
  props: {
    firstName: String,
    lastName: String,
    alternativeName: String,
    username: String,
    pronouns: String,
  },
  computed: {
    prettierUsername() {
      if (this.username && this.username.startsWith('r--')) {
        return null;
      }
      return this.username;
    },
  },
};
</script>

<style>
.profile__name {
  display: block;
  text-align: center;
}
.profile__name h1 {
  margin-bottom: 0.125em;
}
.profile__pronoun {
  color: var(--gray-50);
}
.profile__user-name + .profile__pronoun {
  margin-left: 1em;
  padding-left: 1em;
  border-left: 1px solid var(--gray-30);
}
.profile__user-name,
.profile__pronoun {
  display: inline-block;
  font-size: 1.25em;
  color: var(--gray-50);
}
.profile__alternative-name {
  display: block;
  font-family: 'Open Sans', sans-serif;
  color: var(--gray-50);
  font-size: 0.5em;
  margin: 0.25em 0;
}
@media (min-width: 57.5em) {
  .profile__name {
    text-align: left;
  }
  .profile__name h1 {
    margin-bottom: 0;
  }
  .profile__user-name + .profile__pronoun {
    margin-left: 1.5em;
    padding-left: 1.5em;
  }
  .profile__user-name,
  .profile__pronoun {
    font-size: 1.75em;
  }
}
</style>
