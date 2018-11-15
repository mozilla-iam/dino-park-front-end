<template>
  <div class="profile__name">
    <h1>{{ firstName }} {{ lastName }} </h1>
    <span class="profile__user-name">@phlsa</span>
      <span class="profile__pronoun">{{ pronouns }}</span>
  </div>
</template>

<script>
export default {
  name: 'ProfileName',
  props: {
    firstName: String,
    lastName: String,
    pronouns: String,
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
    margin-left: .5em;
  }
  .profile__user-name,
  .profile__pronoun {
    font-size: 1.25em;
    color: var(--gray-50);
  }
@media(min-width:57.5em) {
  .profile__name {
    text-align: left;
  }
  .profile__name h1 {
    margin-bottom: 0;
  }
  .profile__pronoun {
    margin-left: 1em;
  }
  .profile__user-name,
  .profile__pronoun {
    font-size: 1.75em;
  }
}
</style>
