<template>
  <div class="profile-preview">
    <h1>{{ firstName.value }} {{ lastName.value }} </h1>
    <div>Mozillian for 4 years</div>
    <div>Philipp Sackl</div>
    <div>@phlsa he/him</div>
    <div>Senior manager, product design</div>
    <div>Senior Manager, Product Design</div>
    <div>Philipp is the lead designer of Firefox Desktop. Prior to that, he’s been a co-founder of the design agency envis precisely and an interaction designer at BMW. He enjoys good food, good beer and bad jokes.</div>
    <div><button>Contact me</button></div>
    <div><a href="#">View full profile</a></div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePreview',
  props: {
    type: String,
    title: String,
    content: String,
    accessInformation: Object,
    firstName: Object,
    lastName: Object,
    pronouns: Object,
    funTitle: Object,
    picture: Object,
    locationPreference: Object,
    officeLocation: Object,
    description: Object,
    created: Object,
  },
};
</script>

<style>
.profile-preview {
  background: var(--white);
  padding: 1em;
}
</style>
