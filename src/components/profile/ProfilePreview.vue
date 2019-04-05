<template>
  <div class="profile-preview" ref="profilePreviewElement" tabindex="-1">
    <button
      @click="closeProfile"
      class="button button--icon-only button--secondary profile-preview__close"
    >
      <span class="visually-hidden">Close profile</span>
      <svg
        aria-hidden="true"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        focusable="false"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
    <div class="profile-preview__image">
      <UserPicture
        :picture="picture.value"
        :username="primaryUsername.value"
        :size="100"
        :isStaff="staffInformation.staff"
      />
    </div>
    <ProfileName
      :firstName="firstName.value"
      :lastName="lastName.value"
      :username="primaryUsername.value"
      :pronouns="pronouns.value"
    ></ProfileName>
    <ProfileTitle
      :businessTitle="staffInformation.title.value"
      :funTitle="funTitle.value"
    ></ProfileTitle>
    <div class="hide-desktop">
      <ContactMe
        :primaryEmail="primaryEmail.value"
        :phoneNumbers="phoneNumbers.values"
      ></ContactMe>
    </div>
    <ProfileTeamLocation
      :team="staffInformation.team.value"
      :entity="company(staffInformation.value, primaryEmail.value)"
      :location="location.value"
      :officeLocation="staffInformation.officeLocation.value"
      :timezone="timezone.value"
    ></ProfileTeamLocation>
    <ProfileDescription :description="description.value"></ProfileDescription>
    <hr class="profile-preview__divider" />
    <div class="profile-preview__buttons">
      <div class="hide-mobile">
        <ContactMe
          :primaryEmail="primaryEmail.value"
          :phoneNumbers="phoneNumbers.value"
        ></ContactMe>
      </div>
      <RouterLink
        :to="{ name: 'Profile', params: { username: primaryUsername.value } }"
        class="button button--text-only"
      >
        View full profile
        <svg
          aria-hidden="true"
          role="presentation"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          focusable="false"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import CompanyMixin from '@/components/_mixins/CompanyMixin.vue';
import ContactMe from '@/components/ui/ContactMe.vue';
import UserPicture from '@/components/ui/UserPicture.vue';
import ProfileDescription from './ProfileDescription.vue';
import ProfileName from './ProfileName.vue';
import ProfileTitle from './ProfileTitle.vue';
import ProfileTeamLocation from './ProfileTeamLocation.vue';

export default {
  mixins: [CompanyMixin],
  name: 'ProfilePreview',
  props: {
    staffInformation: Object,
    primaryUsername: Object,
    primaryEmail: Object,
    phoneNumbers: Object,
    timezone: Object,
    firstName: Object,
    lastName: Object,
    pronouns: Object,
    funTitle: Object,
    picture: Object,
    location: Object,
    description: Object,
    userId: Object,
  },
  components: {
    ContactMe,
    UserPicture,
    ProfileDescription,
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
    if (this.$refs.profilePreviewElement) {
      const firstButton = this.$refs.profilePreviewElement.querySelector(
        'button',
      );
      firstButton.focus();
    }
  },
};
</script>

<style>
.profile-preview {
  background: var(--white);
  padding: 2em;
  box-shadow: var(--shadowCard);
  position: relative;
  border-radius: var(--cardRadius);
}
.profile-preview .profile__name {
  display: block;
  margin-bottom: 0.5em;
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
  border-radius: 0.25em;
  overflow: hidden;
  object-fit: cover;
  margin-bottom: 1em;
}
.profile-preview__buttons {
  display: flex;
  align-items: start;
  justify-content: center;
}
@media (min-width: 57.5em) {
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
  padding: 2em 1em 0;
  box-shadow: none;
}
.org-chart__preview .modal__header {
  border-bottom: 0;
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
