<template>
  <div class="profile-preview" ref="profilePreviewElement" tabindex="-1">
    <div class="profile-preview__image">
      <img v-if="picture" :src="picture.value" alt="" />
    </div>
    <div class="profile-preview__since">Mozillian for 4 years <span class="visually-hidden">since </span><span class="profile-preview__since-start-date">July, 2016</span></div>
    <ProfileName :firstName="firstName.value" :lastName="lastName.value" :pronouns="pronouns.value"></ProfileName>
    <ProfileTitle :businessTitle="accessInformation.hris.values.businessTitle || null" :funTitle="funTitle.value"></ProfileTitle>
    <ProfileTeamLocation :team="accessInformation.hris.values.team || null" :entity="accessInformation.hris.values.entity || null" :locationDescription="accessInformation.hris.values.locationDescription || null" :timeZone="accessInformation.hris.values.timeZone || null"></ProfileTeamLocation>

    <h2 class="visually-hidden">About</h2>
    <div class="profile__description">
      <p>{{ description.value }}</p>
    </div>
    <hr class="profile-preview__divider">
    <div class="profile-preview__buttons">
      <ContactMe></ContactMe>
      <a :href="'/profile/' + userId.value" class="button button--text-only">View full profile <img src="@/assets/images/chevron-right.svg" alt="" width="16" aria-hidden="true" /></a>
      <button @click="closeProfile" class="button button--icon-only button--secondary profile-preview__close"><span class="visually-hidden">Close profile</span><img src="@/assets/images/x.svg" alt="" width="24" aria-hidden="true" /></button>
    </div>
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
    userId: Object,
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
  padding: 2em;
  box-shadow: var(--shadowCard);
  position: relative;
}
  .profile-preview .profile__name {
    display: block;
    margin-bottom: .5em;
  }
  .profile-preview .profile__user-name {
    margin-left: 0;
  }
  .profile-preview .profile__title,
  .profile-preview .profile__team-location {
    margin-bottom: 1.5em;
  }
  .profile-preview__image {
    width: 6.5em;
    height: 6.5em;
    border-radius: .25em;
    overflow: hidden;
    object-fit: cover;
  }
  .profile-preview__since {
    position: relative;
    margin-bottom: 1em;
  }
    .profile-preview__since-start-date {
      position: absolute;
      left: -9999em;
    }
    .profile-preview__since:hover .profile-preview__since-start-date {
      position: absolute;
      top: -1em;
      left: 0;
    }
  .profile-preview__buttons {
    display: flex;
    justify-content: space-around;
    align-items: start;
  }
  .profile-preview__close {
    position: absolute;
    top: 2em;
    right: 2em;
    border-color: transparent;
  }
  .profile-preview__divider {
    margin: 2em 0;
  }
</style>
