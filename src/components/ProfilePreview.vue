<template>
  <div class="profile-preview" ref="profilePreviewElement" tabindex="-1">
    <ProfileName :firstName="firstName.value" :lastName="lastName.value" :pronouns="pronouns.value"></ProfileName>
    <div>Mozillian for 4 years</div>
    <ProfileTitle :businessTitle="accessInformation.hris.values.businessTitle || null" :funTitle="funTitle.value"></ProfileTitle>
    <ProfileTeamLocation :team="accessInformation.hris.values.team || null" :entity="accessInformation.hris.values.entity || null" :locationDescription="accessInformation.hris.values.locationDescription || null" :timeZone="accessInformation.hris.values.timeZone || null"></ProfileTeamLocation>

    <h2 class="visually-hidden">About</h2>
    <div class="profile__description">
      <p>{{ description.value }}</p>
    </div>
    <div><a href="#">View full profile</a></div>

    <button type="button" @click="closeProfile">Close profile</button>
    <ContactMe></ContactMe>
  </div>
</template>

<script>
import ContactMe from '@/components/ContactMe.vue';
import ProfileName from '@/components/ProfileName.vue';
import ProfileTitle from '@/components/ProfileTitle.vue';
import ProfileTeamLocation from '@/components/ProfileTeamLocation.vue';

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
  components: {
    ContactMe,
    ProfileName,
    ProfileTitle,
    ProfileTeamLocation,
  },
  methods: {
    closeProfile() {
      const elementToReturnFocusTo = this.$store.state.profilePreview.lastTrigger;

      this.$store.commit('updatePreviewProfileId', {
        newId: null,
        lastTrigger: null,
      });
      
      if (elementToReturnFocusTo) {
        elementToReturnFocusTo.focus();
      }
    },
  },
  mounted: function() {
    this.$refs.profilePreviewElement.focus();
  },
};
</script>

<style>
.profile-preview {
  background: var(--white);
  padding: 1em;
  box-shadow: var(--shadowCard);
}
  .profile-preview .profile__name {
    display: block;
  }
  .profile-preview .profile__user-name {
    margin-left: 0;
  }
</style>
