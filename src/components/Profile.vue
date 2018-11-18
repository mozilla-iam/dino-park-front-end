<template>
  <main class="profile container">
    <section class="profile__section profile__intro">
      <div class="profile__intro-photo">
        <div class="profile__headshot">
          <UserPicture :picture="picture" :username="username" :size="230" :dinoType="staffInformation.staff ? 'Staff' : 'Mozillian'"></UserPicture>
        </div>
        <div class="hide-mobile">
          <ContactMe :primaryEmail="primaryEmail" :phoneNumbers="phoneNumbers"></ContactMe>
        </div>
      </div>
      <div class="profile__intro-main">
        <ProfileName :firstName="firstName" :lastName="lastName" :username="username" :pronouns="pronouns"></ProfileName>
        <ProfileTitle :businessTitle="staffInformation.title" :funTitle="funTitle"></ProfileTitle>
        <div class="hide-desktop">
          <ContactMe :primaryEmail="primaryEmail" :phoneNumbers="phoneNumbers"></ContactMe>
        </div>
        <ProfileTeamLocation :team="staffInformation.team" :entity="company(staffInformation, primaryEmail)" :location="location" :officeLocation="staffInformation.officeLocation" :timezone="timezone"></ProfileTeamLocation>
        <h2 class="visually-hidden">About</h2>
        <div class="profile__description">
          <p>{{ description }}</p>
        </div>
        <ShowMore buttonText="Show more" alternateButtonText="Show less" :expanded="false" buttonClass="button button--text-only button--less-padding" :transition="true">
          <template slot="overflow">
            <MetaList>
              <h3 class="visually-hidden">Meta</h3>
              <Meta metaKey="Worker type" :metaValue="staffInformation.workerType" />
              <Meta metaKey="Desk number" :metaValue="staffInformation.wprDeskNumber" />
              <Meta metaKey="Cost centre" :metaValue="staffInformation.costCenter" />
            </MetaList>
          </template>
          <template slot="icon-expanded">
            <Icon id="chevron-up" :width="24" :height="24" />
          </template>
          <template slot="icon-collapsed">
            <Icon id="chevron-down" :width="24" :height="24" />
          </template>
        </ShowMore>
      </div>
    </section>
    <ProfileNav :links="profileNav"></ProfileNav>
    <section v-if="staffInformation.staff" class="profile__section">
      <a id="nav-relations" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Relations</h2>
        <router-link :to="{ name: 'OrgchartHighlight', params: { username } }" class="button button--secondary button--small">
          Org Chart
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
      </header>
      <ReportingStructure v-if="manager || directs.length > 0" :manager="manager" :directs="directs">
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
        <IconBlock v-for="[key, value] in Object.entries(phoneNumbers || {})" :key="`phoneNumber-${key}`" heading="Phone" :subHeading="key" icon="phone">
          <a :href="value">{{ value }}</a>
        </IconBlock>
      </IconBlockList>
      <div v-if="pgpPublicKeys || sshPublicKeys">
        <h3>Keys</h3>
        <template v-if="pgpPublicKeys && Object.keys(pgpPublicKeys).length > 0">
          <h4 class="visually-hidden">PGP</h4>
          <Key v-for="[key, value] in Object.entries(pgpPublicKeys)"
               type="PGP"
               :title="key"
               :content="value"
               :key="`pgp-${key}`" />
        </template>
        <template v-if="sshPublicKeys && Object.keys(sshPublicKeys).length > 0">
          <h4 class="visually-hidden">SSH</h4>
          <Key v-for="[key, value] in Object.entries(sshPublicKeys)"
              type="SSH"
              :title="key"
              :content="value"
              :key="`ssh-${key}`" />
        </template>
      </div>
      <template v-if="languages && languages.length > 0">
        <div class="languages">
          <h3>Languages</h3>
          <Tag
            v-for="(language, index) in languages"
            :tag="language" :key="`language-${index}`" >
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
            <IconBlock v-for="(acc, index) in accounts.mozilla" :key="`acc-moz-${index}`" :heading="acc.text" :icon="acc.icon">
              <a href="#">{{ acc.value }}</a>
            </IconBlock>
          </IconBlockList>
        </div>
        <div v-if="accounts.other.length">
          <h3>Elsewhere</h3>
          <IconBlockList>
            <IconBlock v-for="(acc, index) in accounts.other" :key="`acc-other-${index}`" :heading="acc.text" :icon="acc.icon">
              <a href="#">{{ acc.value }}</a>
            </IconBlock>
          </IconBlockList>
        </div>
      </div>
    </section>
    <section v-if="Object.keys(accessInformation.mozilliansorg || {}).length > 0" class="profile__section">
      <a id="nav-access-groups" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Access Groups</h2>
      </header>
      <IconBlockList modifier="icon-block-list--multi-col">
        <IconBlock v-for="[group] in Object.entries(accessInformation.mozilliansorg)" :key="`group-${group}`" icon="dino">
          {{ group }}
        </IconBlock>
      </IconBlockList>
    </section>
    <section v-if="(tags || []).length > 0" class="profile__section">
      <a id="nav-tags" class="profile__anchor"></a>
      <header class="profile__section-header">
        <h2>Tags</h2>
      </header>
      <Tag v-for="(tag, index) in tags" :tag="tag" :key="`tag-${index}`" />
    </section>
  </main>
</template>

<script>
// components
import Button from '@/components/Button.vue';
import ContactMe from '@/components/ContactMe.vue';
import Icon from '@/components/Icon.vue';
import IconBlock from '@/components/IconBlock.vue';
import IconBlockList from '@/components/IconBlockList.vue';
import Key from '@/components/Key.vue';
import Meta from '@/components/Meta.vue';
import MetaList from '@/components/MetaList.vue';
import Modal from '@/components/functional/Modal.vue';
import Person from '@/components/Person.vue';
import UserPicture from '@/components/UserPicture.vue';
import ProfileName from '@/components/ProfileName.vue';
import ProfileTitle from '@/components/ProfileTitle.vue';
import ProfileTeamLocation from '@/components/ProfileTeamLocation.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import ReportingStructure from '@/components/ReportingStructure.vue';
import ShowMore from '@/components/functional/ShowMore.vue';
import Tag from '@/components/Tag.vue';
import Vouch from '@/components/Vouch.vue';

// mixins
import CompanyMixin from '@/components/mixins/CompanyMixin.vue';
import AccountsMixin from '@/components/mixins/AccountsMixin.vue';

// forms
import EditPersonalInfo from '@/components/forms/EditPersonalInfo.vue';

export default {
  mixins: [CompanyMixin, AccountsMixin],
  name: 'Profile',
  props: {
    staffInformation: Object,
    username: String,
    primaryEmail: String,
    phoneNumbers: Object,
    timezone: String,
    firstName: String,
    lastName: String,
    pronouns: String,
    funTitle: String,
    picture: String,
    location: String,
    description: String,
    pgpPublicKeys: Object,
    sshPublicKeys: Object,
    tags: Array,
    languages: Array,
    userId: String,
    manager: Object,
    directs: Array,
    accessInformation: Object,
    uris: Object,
  },
  components: {
    Button,
    ContactMe,
    EditPersonalInfo,
    Icon,
    IconBlock,
    IconBlockList,
    Key,
    Meta,
    MetaList,
    Modal,
    Person,
    UserPicture,
    ProfileName,
    ProfileNav,
    ProfileTeamLocation,
    ProfileTitle,
    ReportingStructure,
    ShowMore,
    Tag,
    Vouch,
  },
  computed: {
    accounts() {
      const wellKnown = Object.entries(this.uris || {})
        .map(kv => this.account(kv))
        .filter(a => a !== null);
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
  },
  data() {
    return {
      profileNav: [
        {
          id: 'nav-relations',
          iconId: 'org-chart',
          label: 'Relations',
        },
        {
          id: 'nav-contact',
          iconId: 'book',
          label: 'Contact',
        },
        {
          id: 'nav-other-accounts',
          iconId: 'at-sign',
          label: 'Other accounts',
        },
        {
          id: 'nav-access-groups',
          iconId: 'crown',
          label: 'Access groups',
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
  border: 1px solid #ccc;
  background: #fff;
  padding: 1.5em;
  margin: 0 0 2em;
  grid-column: 2 / -1;
  overflow: visible;
  border-radius: var(--cardRadius);
}
@supports (--key: value) {
  .profile__section {
    border: 0;
    box-shadow: var(--shadowCard);
  }
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
  border-bottom: 1px solid #cfcfcf;
  display: flex;
}
  .profile__section-header h2 {
    margin: 0;
  }
  .profile__section-header .button {
    margin-left: auto;
  }

.profile__intro {
  position: relative;
  padding-top: 5em;
  margin-top: 5em;
}
@media(min-width: 57.5em) {
  .profile__intro {
    padding: 3em;
    margin-top: 0;
    display: grid;
    grid-gap: 2em;
    grid-template-columns: 1fr 2fr;
  }
}

.profile__intro-photo {
  text-align: center;
}

.profile__headshot {
  width: 6.25em;
  height: 6.25em;
  position: absolute;
  top: -3.125em;
  left: 50%;
  margin-left: -3.125em;
  margin-bottom: 1em;
}
  .profile__headshot img {
    width: 100%;
    border-radius: var(--imageRadius);
  }
@supports(object-fit: cover) {
  .profile__headshot img {
    object-fit: cover;
    height: 100%;
  }
}
@media(min-width:57.5em) {
  .profile__headshot {
    position: static;
    width: 15em;
    height: 15em;
    margin-left: 0;
  }
  .profile__intro-photo .profile__headshot {
    margin: 0 auto 3em;
  }
}

.profile__flag {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
}

.profile__description {
  color: var(--gray-50);
}

.profile__anchor {
  top: -6.5em;
  position: relative;
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
