<template>
  <main class="profile container">
    <div
      :class="
        'profile__section' + (this.editMode ? ' profile__section--editing' : '')
      "
    >
      <Toast :content="toastContent" @reset-toast="toastContent = ''"></Toast>
      <ViewPersonalInfo
        v-if="!editMode"
        v-bind="{
          staffInformation,
          username,
          primaryEmail,
          phoneNumbers,
          timezone,
          firstName,
          lastName,
          manager,
          pronouns,
          funTitle,
          picture,
          location,
          description,
        }"
        @toggle-edit-mode="toggleEditMode"
      />
      <EditPersonalInfo
        v-else
        v-bind="{
          username: username.value,
          initialValues: {
            alternativeName,
            description,
            firstName,
            lastName,
            funTitle,
            location,
            pronouns,
            timezone,
          },
        }"
        @toggle-edit-mode="toggleEditMode"
        @toast="showToast"
      />
    </div>
    <ProfileNav
      :links="profileNav"
      :onStaffProfile="staffInformation.staff.value"
    ></ProfileNav>
    <section v-if="staffInformation.staff.value" class="profile__section">
      <a id="nav-relations" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Colleagues</h2>
        <RouterLink
          :to="{
            name: 'OrgchartHighlight',
            params: { username: username.value },
          }"
          class="button button--secondary button--small"
        >
          <Icon id="org-chart" :width="16" :height="16" />
          Org Chart
          <Icon id="chevron-right" :width="18" :height="18" />
        </RouterLink>
      </header>
      <ReportingStructure
        v-if="manager || directs.length > 0"
        :manager="manager"
        :directs="directs"
      >
      </ReportingStructure>
    </section>
    <section class="profile__section">
      <a id="nav-contact" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Contact</h2>
      </header>
      <h3 class="visually-hidden">Contact options</h3>
      <IconBlockList modifier="icon-block-list--multi-col">
        <IconBlock heading="Email" subHeading="primary" icon="email">
          <a :href="`mailto:${primaryEmail}`">{{ primaryEmail }}</a>
        </IconBlock>
        <IconBlock
          v-for="[key, value] in Object.entries(phoneNumbers || {})"
          :key="`phoneNumber-${key}`"
          heading="Phone"
          :subHeading="key"
          icon="phone"
        >
          <a :href="`tel:${value}`">{{ value }}</a>
        </IconBlock>
      </IconBlockList>
      <div v-if="pgpPublicKeys || sshPublicKeys">
        <hr />
        <h3>Keys</h3>
        <template
          v-if="pgpPublicKeys && Object.keys(pgpPublicKeys.values).length > 0"
        >
          <h4 class="visually-hidden">PGP</h4>
          <Key
            v-for="[key, value] in Object.entries(pgpPublicKeys.values)"
            type="PGP"
            :title="key"
            :content="value"
            :key="`pgp-${key}`"
          />
        </template>
        <template
          v-if="sshPublicKeys && Object.keys(sshPublicKeys.values).length > 0"
        >
          <h4 class="visually-hidden">SSH</h4>
          <Key
            v-for="[key, value] in Object.entries(sshPublicKeys.values)"
            type="SSH"
            :title="key"
            :content="value"
            :key="`ssh-${key}`"
          />
        </template>
      </div>
      <template v-if="languagesSorted && languagesSorted.length > 0">
        <hr />
        <div class="languages">
          <h3>Languages</h3>
          <Tag
            v-for="(language, index) in languagesSorted"
            :tag="language"
            :key="`language-${index}`"
          >
          </Tag>
        </div>
      </template>
    </section>
    <section v-if="sections.accounts" class="profile__section">
      <a id="nav-other-accounts" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Other accounts</h2>
      </header>
      <div class="profile__external-accounts">
        <div v-if="accounts.mozilla.length">
          <h3>Mozilla</h3>
          <IconBlockList>
            <IconBlock
              v-for="(acc, index) in accounts.mozilla"
              :key="`acc-moz-${index}`"
              :heading="acc.text"
              :icon="acc.icon"
            >
              <a :href="acc.value" target="_blank" rel="noreferrer noopener">{{
                acc.value
              }}</a>
            </IconBlock>
          </IconBlockList>
        </div>
        <div v-if="accounts.other.length">
          <h3>Elsewhere</h3>
          <IconBlockList>
            <IconBlock
              v-for="(acc, index) in accounts.other"
              :key="`acc-other-${index}`"
              :heading="acc.text"
              :icon="acc.icon"
            >
              <a :href="acc.value" target="_blank" rel="noreferrer noopener">{{
                acc.value
              }}</a>
            </IconBlock>
          </IconBlockList>
        </div>
      </div>
    </section>
    <section v-else class="profile__section profile__section--disabled">
      <a id="nav-other-accounts" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Other Accounts</h2>
      </header>
      <p>No other accounts have been added</p>
    </section>
    <section
      v-if="
        Object.keys(accessInformation.mozilliansorg.values || {}).length > 0
      "
      class="profile__section"
    >
      <a id="nav-access-groups" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Access Groups</h2>
      </header>
      <IconBlockList modifier="icon-block-list--multi-col">
        <IconBlock
          v-for="[group] in Object.entries(
            accessInformation.mozilliansorg.values,
          )"
          :key="`group-${group}`"
          icon="dino"
        >
          {{ group }}
        </IconBlock>
      </IconBlockList>
    </section>
    <section v-else class="profile__section profile__section--disabled">
      <a id="nav-access-groups" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Access Groups</h2>
      </header>
      <p>No access groups available</p>
    </section>
    <section v-if="(tagsSorted || []).length > 0" class="profile__section">
      <a id="nav-tags" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Tags</h2>
      </header>
      <Tag
        v-for="(tag, index) in tagsSorted"
        :tag="tag"
        :key="`tag-${index}`"
      />
    </section>
    <section v-else class="profile__section profile__section--disabled">
      <a id="nav-tags" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Tags</h2>
      </header>
      <p>No tags have been added</p>
    </section>
  </main>
</template>

<script>
// components
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import IconBlock from '@/components/IconBlock.vue';
import IconBlockList from '@/components/IconBlockList.vue';
import Key from '@/components/Key.vue';
import Modal from '@/components/functional/Modal.vue';
import Person from '@/components/Person.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import ReportingStructure from '@/components/ReportingStructure.vue';
import ShowMore from '@/components/functional/ShowMore.vue';
import Tag from '@/components/Tag.vue';
import Toast from '@/components/Toast.vue';
import Vouch from '@/components/Vouch.vue';

// mixins
import AccountsMixin from '@/components/mixins/AccountsMixin.vue';

// forms
import EditPersonalInfo from '@/components/forms/EditPersonalInfo.vue';

// views
import ViewPersonalInfo from '@/components/ViewPersonalInfo.vue';

export default {
  mixins: [AccountsMixin],
  name: 'Profile',
  props: {
    alternativeName: Object,
    accessInformation: Object,
    description: Object,
    directs: Array,
    firstName: Object,
    funTitle: Object,
    languages: Object,
    lastName: Object,
    location: Object,
    manager: Object,
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
    username: Object,
  },
  components: {
    Button,
    EditPersonalInfo,
    Icon,
    IconBlock,
    IconBlockList,
    Key,
    Modal,
    Person,
    ProfileNav,
    ReportingStructure,
    ShowMore,
    Tag,
    Toast,
    ViewPersonalInfo,
    Vouch,
  },
  methods: {
    alphabetise(array) {
      return array ? array.sort() : null;
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    showToast(data) {
      this.toastContent = data.content;
    },
  },
  computed: {
    accounts() {
      const wellKnown = Object.entries(this.uris || {})
        .map((kv) => this.account(kv))
        .filter((a) => a !== null && typeof a !== 'undefined');
      const mozilla = wellKnown.filter(({ moz }) => moz);
      const other = wellKnown.filter(({ moz }) => !moz);
      return { mozilla, other };
    },
    sections() {
      return {
        relations: this.staffInformation.staff,
        contact: true,
        accounts: this.accounts.mozilla.length + this.accounts.other.length > 0,
      };
    },
    tagsSorted() {
      return this.alphabetise(this.tags.values);
    },
    languagesSorted() {
      return this.alphabetise(['Dutch', 'German', 'Polish']);
    },
  },
  data() {
    return {
      editMode: false,
      toastContent: '',
      profileNav: [
        {
          id: 'nav-relations',
          iconId: 'org-chart',
          label: 'Colleagues',
          staffOnly: true,
        },
        {
          id: 'nav-contact',
          iconId: 'book',
          label: 'Contact',
        },
        {
          id: 'nav-other-accounts',
          iconId: 'at-sign',
          label: 'Other Accounts',
        },
        {
          id: 'nav-access-groups',
          iconId: 'lock',
          label: 'Access Groups',
        },
        {
          id: 'nav-tags',
          iconId: 'bookmark',
          label: 'Tags',
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
  border: 3px solid var(--gray-50);
  background: #fff;
  padding: 1.5em;
  margin: 0 0 2em;
  grid-column: 2 / -1;
  overflow: visible;
  border-radius: var(--cardRadius);
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
}
.profile__section-header h2 {
  margin: 0;
}
.profile__section-header > a {
  margin-left: auto;
}

@media (min-width: 57.5em) {
  .profile__external-accounts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2em;
  }
  .profile__external-accounts h3 {
    margin-top: 0; /* because grid item margins don't collapse */
  }
}
</style>
