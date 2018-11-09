<template>
  <div class="profile-preview" ref="profilePreviewElement" tabindex="-1">
    <div class="profile-preview__image">
      <UserPicture :picture="picture.value" :username="userId.value" size="100"></UserPicture>
    </div>
    <ProfileName :firstName="firstName.value" :lastName="lastName.value" :pronouns="pronouns.value"></ProfileName>
    <ProfileTitle :businessTitle="businessTitle.value || null" :funTitle="funTitle.value"></ProfileTitle>
    <div class="hide-desktop">
      <ContactMe></ContactMe>
    </div>
    <ProfileTeamLocation :team="team.value || null" :entity="entity.value || null" :locationPreference="locationPreference.value || null" :officeLocation="officeLocation.value || null" :timezone="timezone.value || null"></ProfileTeamLocation>
    <h2 class="visually-hidden">About</h2>
    <div class="profile__description">
      <p>{{ description.value }}</p>
    </div>
    <hr class="profile-preview__divider">
    <div class="profile-preview__buttons">
      <div class="hide-mobile">
        <ContactMe></ContactMe>
      </div>
      <router-link :to="{ name: 'Profile', params: { userId: userId.value } }" class="button button--text-only">
        View full profile
        <svg
          aria-hidden="true"
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </router-link>
      <button @click="closeProfile" class="button button--icon-only button--secondary profile-preview__close">
        <span class="visually-hidden">Close profile</span>
        <svg
          aria-hidden="true"
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import ContactMe from '@/components/ContactMe.vue';
import UserPicture from '@/components/UserPicture.vue';
import ProfileName from '@/components/ProfileName.vue';
import ProfileTitle from '@/components/ProfileTitle.vue';
import ProfileTeamLocation from '@/components/ProfileTeamLocation.vue';

export default {
  name: 'ProfilePreview',
  props: {
    businessTitle: Object,
    locationPreference: Object,
    team: Object,
    timezone: Object,
    entity: Object,
    type: String,
    title: String,
    content: String,
    firstName: Object,
    lastName: Object,
    pronouns: Object,
    funTitle: Object,
    picture: Object,
    officeLocation: Object,
    description: Object,
    created: Object,
    userId: Object,
  },
  components: {
    ContactMe,
    UserPicture,
    ProfileName,
    ProfileTitle,
    ProfileTeamLocation,
  },
  methods: {
    closeProfile() {
      this.$router.push({ name: 'Orgchart' });
      this.lastActive.focus();
      this.lastActive = document.body;
    },
  },
  mounted() {
    this.lastActive = document.activeElement;
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
    margin-bottom: 1em;
  }
  .profile-preview__buttons {
    display: flex;
    align-items: start;
    justify-content: center;
  }
  @media(min-width:50em) {
    .profile-preview__buttons {
      justify-content: space-around;
    }
  }
  .profile-preview__close {
    position: absolute;
    top: 1em;
    right: 1em;
    left: auto;
    bottom: auto;
    color: var(--black);
    border-color: transparent;
    background-color: transparent;
  }
  .profile-preview__close:hover {
    background-color: transparent;
    color: var(--blue-60);
  }
  .profile-preview__divider {
    margin: 2em 0;
  }

 .modal .profile-preview {
    padding: 2em 0 0;
    box-shadow: none;
 }
 .modal .profile-preview__image {
    margin: 0 auto 1em;
 }
 .modal .profile-preview__close {
    position: fixed;
    top: 2em;
    right: 2em;
    z-index: var(--layerModal);
  }
  .modal .profile-preview__since {
    text-align: center;
  }
 </style>
