<template>
  <div class="profile-preview" ref="profilePreviewElement" tabindex="-1">
    <button
      v-if="desktopView"
      @click="$emit('close')"
      class="button button--icon-only button--secondary profile-preview__close"
    >
      <span class="visually-hidden">{{ fluent('profile_preview_close') }}</span>
      <Icon id="x" :width="24" :height="24" />
    </button>
    <div class="profile-preview__image">
      <UserPicture
        :avatar="{ picture: picture.value, username: primaryUsername.value }"
        :size="100"
        :showLabel="staffInformation.staff.value"
        :useSrcset="false"
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
        :identities="identities"
        :primaryEmail="primaryEmail.value"
        :phoneNumbers="phoneNumbers"
        :uris="uris"
      ></ContactMe>
    </div>
    <ProfileTeamLocation
      :team="staffInformation.team.value"
      :entity="company(staffInformation.value, primaryEmail.value)"
      :location="location.value"
      :officeLocation="staffInformation.officeLocation.value"
      :timezone="timezone.value"
    ></ProfileTeamLocation>
    <ProfileDescription
      class="profile-description--faded"
      :description="description.value"
    ></ProfileDescription>
    <div class="profile-preview__actions">
      <div class="hide-mobile">
        <ContactMe
          :identities="identities"
          :primaryEmail="primaryEmail.value"
          :phoneNumbers="phoneNumbers"
          :uris="uris"
        ></ContactMe>
      </div>
      <footer class="profile-preview__footer">
        <RouterLink
          :to="{ name: 'Profile', params: { username: primaryUsername.value } }"
          class="button button--text-only"
        >
          {{ fluent('orgchart_full-profile') }}
          <Icon id="chevron-right" :width="16" :height="16" />
        </RouterLink>
      </footer>
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
import Icon from '@/components/ui/Icon.vue';

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
    uris: Object,
    identities: Object,
    userId: Object,
    desktopView: Boolean,
  },
  components: {
    ContactMe,
    UserPicture,
    ProfileDescription,
    ProfileName,
    ProfileTitle,
    ProfileTeamLocation,
    Icon,
  },
  deactivated() {
    this.lastActive.focus();
    this.lastActive = document.body;
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
.profile-preview__actions {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2em;
}
@media (min-width: 57.5em) {
  .profile-preview__actions {
    flex-direction: column;
    justify-content: flex-start;
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

.profile-preview .profile-preview__footer {
  width: 100%;
  border-top: 1px solid var(--gray-30);
  padding-top: 2em;
}

.profile-preview__footer .button--text-only {
  padding: 0;
}
</style>
