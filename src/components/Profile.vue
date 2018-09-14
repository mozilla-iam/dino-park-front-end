<template>
  <main class="profile">
    <section id="intro" class="profile__section profile__intro">
      <div class="profile__name">
        <h1>{{ firstName.value }} {{ lastName.value }} </h1>
        <span class="profile__user-name">@phlsa</span>
          <span class="profile__pronoun">{{ pronouns.value }}</span>
      </div>
      <p class="profile__title"><span class="profile__hr-title">{{ accessInformation.hris.values.businessTitle }}</span> <span class="profile__fun-title">{{ funTitle.value }}</span></p>
      <div class="profile__headshot">
        <img :src="picture.value" alt="" />
        <p>Mozillan for 4 years</p>
      </div>
      <h2 class="visually-hidden">About</h2>
      <div class="profile__team-location">
        <div class="profile__team">
          <h3 class="visually-hidden">Team</h3>
          <strong>{{ accessInformation.hris.values.team }}</strong>
          {{ accessInformation.hris.values.entity }}
        </div>
        <div class="profile__location">
          <h3 class="visually-hidden">Location</h3>
          <div class="location"><strong>{{ accessInformation.hris.values.locationDescription }} ({{ accessInformation.hris.values.locationDescription }})</strong>{{ accessInformation.hris.timeZone}}</div>
        </div>
      </div>
      <div class="profile__description">
        <p>{{ description.value }}</p>
      </div>
      <ShowMore buttonText="Show more" alternateButtonText="Show less" :expanded="false" buttonModifier="button--text-only">
        <template slot="overflow">
          <MetaList>
            <h3 class="visually-hidden">Meta</h3>
            <Meta metaKey="Worker type" :metaValue="accessInformation.hris.values.workerType" />
            <Meta metaKey="Desk number" :metaValue="accessInformation.hris.values.wprDeskNumber" />
            <Meta metaKey="Cost centre" :metaValue="accessInformation.hris.values.costCenter" />
          </MetaList>
        </template>
        <template slot="icon-expanded">
          <img src="@/assets/images/chevron-up.svg" alt="" width="16" aria-hidden="true" />
        </template>
        <template slot="icon-collapsed">
          <img src="@/assets/images/chevron-down.svg" alt="" width="16" aria-hidden="true" />
        </template>
      </ShowMore>
      <button @click="$refs.flagProfile.isOpen=true" class="button button--secondary button--icon-only flag"><img src="@/assets/images/flag.svg" alt="" width="16" aria-hidden="true" /><span class="visually-hidden">Flag this profile</span></button>
      <Modal ref="flagProfile" heading="Flag this profile">
        <FlagProfile/>
      </Modal>
    </section>
    <ProfileNav></ProfileNav>
    <section id="relations" class="profile__section">
      <header class="profile__section-header">
        <h2>Relations</h2>
        <a href="/orgchart?focus_on=this_person@TODO" class="button button--secondary">View Org Chart</a>
      </header>
      <ReportingStructure>
        <template slot="reports-to">
          <h3>Reports to:</h3>
          <Person v-bind="todo.team.members[0]" />
        </template>
        <template slot="manages">
          <h3>Manages:</h3>
          <Person v-bind="todo.team.members[1]" />
        </template>
      </ReportingStructure>
    </section>
    <section id="contact" class="profile__section">
      <header class="profile__section-header">
        <h2>Contact</h2>
      </header>
      <h3 class="visually-hidden">Contact options</h3>
      <div v-if="pgpPublicKeys || sshPublicKeys">
        <h3>Keys</h3>
        <div v-if="pgpPublicKeys">
          <h4 class="visually-hidden">PGP</h4>
          <Key v-for="key in pgpPublicKeys.values"
               type="PGP"
               title="Title"
               :content="key"
               :key="key" />
        </div>
        <div v-if="sshPublicKeys">
          <h4 class="visually-hidden">SSH</h4>
          <Key
            v-for="key in sshPublicKeys.values"
            type="SSH"
            title="Title"
            :content="key"
            :key="key" />
        </div>
      </div>
      <template v-if="todo.languages.length > 0">
      <hr>
      <div class="languages">
        <h3>Languages</h3>
        <Tag
          v-for="language in todo.languages"
          v-bind="language"
          :key="language.id" />
      </div>
      </template>
    </section>
    <section id="elsewhere" class="profile__section">
      <header class="profile__section-header">
        <h2>Find me elsewhere</h2>
      </header>
      <h3>Mozilla</h3>
      <ul class="relation-list">
        <Relation category="Email" label="Mozilla Reps ReMo">
          <a href="#">philipp@mozilla.com</a>
        </Relation>
        <Relation category="Email" label="Mozilla Discourse">
          <a href="#">@phls</a>
        </Relation>
      </ul>
      <h3>Elsewhere</h3>
      <ul class="relation-list">
        <Relation category="Email" label="GitHub">
          <a href="#">@phls</a>
        </Relation>
        <Relation category="Email" label="LinkedIn">
          <a href="#">philipp@mozilla.com</a>
        </Relation>
      </ul>
      <Button type="button" modifier="button--full-width button--secondary">Show all groups</Button>
    </section>
    <section id="access-groups" class="profile__section">
      <header class="profile__section-header">
        <h2>Access Groups</h2>
      </header>
      <ul class="relation-list">
        <Relation category="NDA">
          Invited by <a href="#">Rubén Martin</a>
        </Relation>
      </ul>
    </section>
    <section id="vouches" class="profile__section">
      <header class="profile__section-header">
        <h2>Vouches</h2>
      </header>
      <ShowMore buttonText="Show more" alternateButtonText="Show less" :expanded="false">
        <template slot="base">
          <Vouch v-bind="todo.vouches[3]" />
        </template>
        <template slot="overflow">
          <Vouch v-for="vouch in todo.vouches" v-bind="vouch" :key="vouch.id" />
        </template>
      </ShowMore>
    </section>
    <section id="tags" class="profile__section">
      <header class="profile__section-header">
        <h2>Tags</h2>
      </header>
      <Tag tag="HTML" />
      <Tag tag="GraphQL" />
      <Tag tag="Kubernetes" />
    </section>
    <section class="profile__section">
      <button class="button button--secondary" @click="$refs.changeInfo.isOpen = true">Change info</button>
      <Modal ref="changeInfo">
        <h2>Edit personal info</h2>
        <p>This is a demo of opening a form in an overlay.</p>
        <EditPersonalInfo/>
      </Modal>
    </section>
  </main>
</template>

<script>
// components
import Button from '@/components/Button.vue';
import Key from '@/components/Key.vue';
import Meta from '@/components/Meta.vue';
import MetaList from '@/components/MetaList.vue';
import Modal from '@/components/functional/Modal.vue';
import Person from '@/components/Person.vue';
import ProfileNav from '@/components/ProfileNav.vue';
import Relation from '@/components/Relation.vue';
import ReportingStructure from '@/components/ReportingStructure.vue';
import ShowMore from '@/components/functional/ShowMore.vue';
import Tag from '@/components/Tag.vue';
import Vouch from '@/components/Vouch.vue';

// forms
import EditPersonalInfo from '@/components/forms/EditPersonalInfo.vue';
import FlagProfile from '@/components/forms/FlagProfile.vue';

export default {
  name: 'Profile',
  props: {
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
    lastModified: Object,
    pgpPublicKeys: Object,
    sshPublicKeys: Object,
    tags: Object,
    preferredLanguage: Object,
  },
  components: {
    Button,
    EditPersonalInfo,
    FlagProfile,
    Key,
    Meta,
    MetaList,
    Modal,
    Person,
    ProfileNav,
    Relation,
    ReportingStructure,
    ShowMore,
    Tag,
    Vouch,
  },
  data() {
    return {
      todo: {
        worker_type: 'Contractor',
        desk_number: 'SF4908',
        cost_centre: '1003 - Office of CIO',
        employee_id: '12345',
        team: {
          name: 'Open Innovation',
          members: [
            {
              id: 1,
              userId: {
                value: 'katharina',
              },
              firstName: {
                value: 'Katharina',
              },
              lastName: {
                value: 'Borchert',
              },
              funTitle: {
                value: 'Open Innovation',
              },
              officeLocation: {
                value: 'San Francisco',
              },
              picture: {
                value: 'https://placekitten.com/100/100',
              },
            },
            {
              id: 2,
              userId: {
                value: 'florian',
              },
              firstName: {
                value: 'Florian',
              },
              lastName: {
                value: 'Merz',
              },
              funTitle: {
                value: 'Open Innovation',
              },
              officeLocation: {
                value: 'Berlin',
              },
              picture: {
                value: 'https://placekitten.com/100/100',
              },
            },
          ],
        },
        vouches: [
          {
            id: 1,
            content: 'An automatic vouch for being a Mozilla employee.',
            voucher: {
              userId: {
                value: 'dino',
              },
              firstName: {
                value: 'Dino',
              },
              lastName: {
                value: 'McVouch',
              },
              funTitle: {
                value: 'The Vouching Bot',
              },
              officeLocation: {
                value: 'The internet',
              },
              picture: {
                value: 'https://placekitten.com/100/100',
              },
            },
          },
          {
            id: 2,
            content: 'Henrik is an active Mozilla Rep, organizing events and working a lot with the community. Thank you for all the work',
            voucher: {
              userId: {
                value: 'florian',
              },
              firstName: {
                value: 'Florian',
              },
              lastName: {
                value: 'Merz',
              },
              funTitle: {
                value: 'Open Innovation',
              },
              officeLocation: {
                value: 'Berlin',
              },
              picture: {
                value: 'https://placekitten.com/100/100',
              },
            },
          },
          {
            id: 3,
            content: 'Henrik is an active Mozilla Rep, organizing events and working a lot with the community. Thank you for all the work',
            voucher: {
              userId: {
                value: 'andrew',
              },
              firstName: {
                value: 'Andrew',
              },
              lastName: {
                value: 'Krug',
              },
              funTitle: {
                value: 'InfoSec',
              },
              officeLocation: {
                value: 'Portland',
              },
              picture: {
                value: 'https://placekitten.com/100/100',
              },
            },
          },
          {
            id: 4,
            content: 'Henrik is an active Mozilla Rep, organizing events and working a lot with the community. Thank you for all the work',
            voucher: {
              userId: {
                value: 'megan',
              },
              firstName: {
                value: 'Megan',
              },
              lastName: {
                value: 'Branson',
              },
              funTitle: {
                value: 'Open Innovation',
              },
              officeLocation: {
                value: 'Portland',
              },
              picture: {
                value: 'https://placekitten.com/100/100',
              },
            },
          },
        ],
        languages: [
          {
            id: 1,
            tag: 'German',
          },
          {
            id: 2,
            tag: 'English',
          },
          {
            id: 3,
            tag: 'Italian',
          },
        ],
      },
      navItems: {

      },
    };
  },
};
</script>

<style>
.profile {
  max-width: 60em;
  margin: 0 auto;
  padding: 0 1em;
}
@media (min-width: 50em)     {
  .profile {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0 2em;
    padding: 0;
  }
}

.profile__section {
  border: 1px solid var(--midGrey);
  background: #fff;
  padding: 1.5em;
  margin: 0 0 2em;
  grid-column: 2 / -1;
  overflow: visible;
}
.profile__section:first-child {
  grid-column: 1 / -1;
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

.profile__name {
  display: block;
  text-align: center;
}
  .profile__name h1 {
    margin-bottom: 0.125em;
  }
  .profile__pronoun {
    color: var(--darkGrey);
  }
@media(min-width:50em) {
  .profile__name {
    text-align: left;
  }
  .profile__name h1 {
    display: inline;
    margin-bottom: 0;
  }
  .profile__user-name,
  .profile__pronoun {
    font-size: 1.5em;
    margin-left: 1em;
  }
}


.profile__title {
  text-align: center;
}
  .profile__hr-title,
  .profile__fun-title {
    display: block;
  }
  .profile__hr-title {
    font-weight: 400;
    font-size: 1.25em;
  }
  .profile__fun-title {
    color: var(--darkerGrey);
  }
@media(min-width:50em) {
  .profile__title {
    text-align: left;
  }
}

.profile__intro {
  position: relative;
  padding-top: 10em;
  margin-top: 5em;
}
@media(min-width: 50em) {
  .profile__intro {
    padding-top: inherit;
    padding-left: 20em;
    margin-top: 0;
  }
}
@media(min-width:60em) {
  .profile__intro {
    padding-left: 22em;
    padding-top: 3em;
  }
}


.profile__headshot {
  width: 6.25em;
  height: 6.25em;
  position: absolute;
  top: -3.125em;
  left: 50%;
  margin-left: -3.125em;
}
  .profile__headshot img {
    width: 100%;
  }
@supports(object-fit: cover) {
  .profile__headshot img {
    object-fit: cover;
    height: 100%;
  }
}
@media(min-width:50em) {
  .profile__headshot {
    top: 2em;
    left: 2em;
    width: 15em;
    height: 15em;
    margin-left: 0;
  }
}
@media(min-width:60em) {
  .profile__headshot {
    top: 3em;
    left: 3em;
  }
}

.profile__intro .flag {
  position: absolute;
  top: 1.5em;
  right: 1.5em;
}

.profile__location,
.profile__team,
.profile__description {
  font-size: .875em;
  color: var(--darkGrey);
}
.profile__team {
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid var(--midGrey);
}
    .profile__team-location strong {
      display: block;
      color: var(--darkGrey);
      text-transform: uppercase;
    }
@media(min-width: 60em) {
  .profile__team {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .profile__team-location {
    display: flex;
  }
    .profile__team-location div {
      padding-left: 0;
    }
    .profile__team-location div:first-child {
      border-right: 1px solid var(--midGrey);
      margin-right: 1em;
      padding-right: 1em;
      padding-left: 0;
    }
}
</style>
