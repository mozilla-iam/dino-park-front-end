<template>
  <main class="profile container">
    <div
      :class="
        'profile__section' +
          (this.editing === 'personal-info' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-personal-info" class="profile__anchor"></a>
      <EditPersonalInfo
        v-if="this.editing === 'personal-info'"
        v-bind="{
          staffInformation,
          initialValues: {
            alternativeName,
            description,
            firstName,
            lastName,
            funTitle,
            location,
            primaryUsername,
            picture,
            pronouns,
            timezone,
          },
        }"
      />
      <ViewPersonalInfo
        v-else
        v-bind="{
          alternativeName,
          staffInformation,
          primaryUsername,
          primaryEmail,
          phoneNumbers,
          timezone,
          firstName,
          lastName,
          pronouns,
          funTitle,
          picture,
          location,
          description,
          uris,
          userOnOwnProfile,
        }"
      />
    </div>
    <ProfileNav
      :links="profileNav"
      :onStaffProfile="staffInformation.staff.value"
    ></ProfileNav>

    <section v-if="staffInformation.staff.value" class="profile__section">
      <a id="nav-relations" class="profile__anchor"></a>
      <ViewRelations :username="primaryUsername.value"></ViewRelations>
    </section>

    <EmptyCard
      nav="identities"
      title="Identities"
      message="Identity editing capabilities are coming soon."
    >
    </EmptyCard>

    <section
      :class="
        'profile__section' +
          (this.editing === 'contact' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-contact" class="profile__anchor"></a>
      <EditContact
        v-if="this.editing === 'contact'"
        v-bind="{
          username: primaryUsername.value,
          initialPrimaryEmail: primaryEmail,
          initialPhoneNumbers: phoneNumbers,
          initialValues: {
            primaryEmail,
            phoneNumbers,
          },
        }"
      />
      <ViewContact
        v-else
        v-bind="{ primaryEmail, phoneNumbers, userOnOwnProfile }"
      ></ViewContact>
    </section>

    <section
      v-if="sections.accounts"
      :class="
        'profile__section' +
          (this.editing === 'accounts' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-accounts" class="profile__anchor"></a>
      <EditAccounts
        v-if="this.editing === 'accounts'"
        v-bind="{
          username: primaryUsername.value,
          initialValues: { uris },
          initialUris: uris,
        }"
      ></EditAccounts>
      <ViewAccounts v-else v-bind="{ uris, userOnOwnProfile }"></ViewAccounts>
    </section>
    <EmptyCard
      v-else
      nav="accounts"
      title="Accounts"
      message="You haven’t added any accounts yet."
    >
      <template v-slot:header>
        <EditButton
          v-if="userOnOwnProfile"
          section="accounts"
          sectionId="accounts"
        ></EditButton>
      </template>
    </EmptyCard>

    <section
      v-if="sections.languages"
      :class="
        'profile__section' +
          (this.editing === 'languages' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-languages" class="profile__anchor"></a>
      <EditLanguages
        v-if="this.editing === 'languages'"
        v-bind="{
          initialValues: {
            languages,
          },
        }"
      ></EditLanguages>
      <ViewLanguages
        v-else
        v-bind="{ languages, userOnOwnProfile }"
      ></ViewLanguages>
    </section>
    <EmptyCard
      v-else
      nav="languages"
      title="Languages"
      message="Language editing capabilities are coming soon."
    >
    </EmptyCard>

    <section
      v-if="sections.tags"
      :class="
        'profile__section' +
          (this.editing === 'tags' ? ' profile__section--editing' : '')
      "
    >
      <a id="nav-tags" class="profile__anchor"></a>
      <EditTags v-if="this.editing === 'tags'"></EditTags>
      <ViewTags v-else v-bind="{ tags, userOnOwnProfile }"></ViewTags>
    </section>
    <EmptyCard
      v-else
      nav="tags"
      title="Tags"
      message="Tag editing capabilities are coming soon."
    >
    </EmptyCard>

    <section class="profile__section" v-if="pgpPublicKeys || sshPublicKeys">
      <a id="nav-keys" class="profile__anchor"></a>
      <EditKeys v-if="this.editing === 'keys'"> </EditKeys>
      <ViewKeys
        v-bind="{ pgpPublicKeys, sshPublicKeys, userOnOwnProfile }"
      ></ViewKeys>
    </section>
    <EmptyCard
      v-else
      nav="keys"
      title="Keys"
      message="Syncing and editing capabilities for SSH / PGP keys are coming soon."
    >
    </EmptyCard>

    <section
      v-if="
        Object.keys(accessInformation.mozilliansorg.values || {}).length > 0
      "
      class="profile__section"
    >
      <a id="nav-access-groups" class="profile__anchor"></a>
      <ViewAccessGroups
        v-bind="(accessInformation, userOnOwnProfile)"
      ></ViewAccessGroups>
    </section>
    <EmptyCard
      v-else
      nav="access-groups"
      title="Access Groups"
      message="Support for Access Group management is coming soon."
    >
    </EmptyCard>
  </main>
</template>

<script>
import EditButton from '@/components/profile/edit/EditButton.vue';
import EditAccounts from './edit/EditAccounts.vue';
import EditContact from './edit/EditContact.vue';
import EditKeys from './edit/EditKeys.vue';
import EditLanguages from './edit/EditLanguages.vue';
import EditPersonalInfo from '@/components/profile/edit/EditPersonalInfo.vue';
import EditTags from './edit/EditTags.vue';
import EmptyCard from '@/components/profile/view/EmptyCard.vue';
import ProfileNav from './ProfileNav.vue';
import ViewAccounts from './view/ViewAccounts.vue';
import ViewContact from './view/ViewContact.vue';
import ViewKeys from './view/ViewKeys.vue';
import ViewLanguages from './view/ViewLanguages.vue';
import ViewPersonalInfo from './view/ViewPersonalInfo.vue';
import ViewRelations from './view/ViewRelations.vue';
import ViewTags from './view/ViewTags.vue';

export default {
  name: 'Profile',
  props: {
    alternativeName: Object,
    accessInformation: Object,
    description: Object,
    editing: String,
    firstName: Object,
    funTitle: Object,
    languages: Object,
    lastName: Object,
    location: Object,
    pgpPublicKeys: Object,
    phoneNumbers: Object,
    picture: Object,
    primaryEmail: Object,
    pronouns: Object,
    sshPublicKeys: Object,
    staffInformation: Object,
    tags: Object,
    timezone: Object,
    uris: Object,
    uuid: Object,
    primaryUsername: Object,
  },
  components: {
    EditAccounts,
    EditButton,
    EditContact,
    EditKeys,
    EditLanguages,
    EditPersonalInfo,
    EditTags,
    EmptyCard,
    ProfileNav,
    ViewAccounts,
    ViewContact,
    ViewKeys,
    ViewLanguages,
    ViewPersonalInfo,
    ViewRelations,
    ViewTags,
  },
  methods: {
    alphabetise(array) {
      return array ? array.sort() : null;
    },
  },
  computed: {
    sections() {
      return {
        relations: this.staffInformation.staff,
        contact: true,
        accounts:
          this.editing === 'accounts' ||
          (this.uris.values &&
            Object.entries(this.uris.values).length > 0 &&
            true) ||
          false,
        languages:
          (this.languages.values &&
            Object.entries(this.languages.values).length > 0 &&
            true) ||
          false,
        tags:
          (this.tags.values &&
            Object.entries(this.tags.values).length > 0 &&
            true) ||
          false,
      };
    },
    userOnOwnProfile() {
      return this.$store.state.user.uuid.value === this.uuid.value;
    },
  },
  data() {
    return {
      profileNav: [
        {
          id: 'nav-relations',
          iconId: 'org-chart',
          label: 'Colleagues',
          staffOnly: true,
        },
        {
          id: 'nav-identities',
          iconId: 'chain',
          label: 'Identities',
        },
        {
          id: 'nav-contact',
          iconId: 'envelope',
          label: 'Contact',
        },
        {
          id: 'nav-accounts',
          iconId: 'at-sign',
          label: 'Accounts',
        },
        {
          id: 'nav-languages',
          iconId: 'world',
          label: 'Languages',
        },
        {
          id: 'nav-tags',
          iconId: 'bookmark',
          label: 'Tags',
        },
        {
          id: 'nav-keys',
          iconId: 'keys',
          label: 'Keys',
        },
        {
          id: 'nav-access-groups',
          iconId: 'lock',
          label: 'Access Groups',
        },
      ],
    };
  },
};
</script>

<style>
@media (min-width: 57.5em) {
  .profile {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0 2em;
    align-items: start;
    padding: 2em;
  }
}

.profile__section {
  border: 4px solid var(--gray-50);
  background: #fff;
  padding: 1.5em;
  margin: 0 0 2em;
  grid-column: 2 / -1;
  overflow: visible;
  border-radius: var(--cardRadius);
  position: relative;
}
@supports (--key: value) {
  .profile__section {
    border-color: transparent;
    box-shadow: var(--shadowCard);
  }
}
.profile__section--disabled {
  background-color: var(--gray-20);
  color: var(--gray-50);
  border: 2px solid var(--gray-30);
}
.profile__section--editing {
  border-color: var(--blue-60);
}
.profile__section:first-child {
  grid-column: 1 / -1;
}
.profile__section h3 {
  margin: 1.5em 0 1em;
}
.profile__section .reporting-structure h3 {
  margin-top: 0;
}

.profile__section-header {
  padding: 1.5em;
  margin: -1.5em -1.5em 1.5em -1.5em;
  border-bottom: 1px solid var(--gray-30);
  display: flex;
  align-items: center;
}
.profile__section-header h2 {
  margin: 0;
}
.profile__section-header > a {
  margin-left: auto;
}
.profile__section-header > .privacy-setting {
  margin-left: auto;
}

.profile__anchor {
  top: -7em;
  position: relative;
}
</style>
