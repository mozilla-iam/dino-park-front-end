<template>
  <main class="profile">
    <section id="intro" class="profile__intro">
      <div class="profile__name">
        <h1>{{ firstName.value }} {{ lastName.value }} </h1>
        <span class="profile__user-name">@phlsa</span>
          <span class="profile__pronoun">{{ pronouns.value }}</span>
      </div>
      <p><span class="profile__title">Senior Service Designer</span> <span class="profile__fun-title">{{ funTitle.value }}</span></p>
      <div class="profile__headshot">
        <img :src="picture.value" alt="" />
        <p>Mozillan for 4 years</p>
      </div>
      <h2 class="visually-hidden">About</h2>
      <div class="team">
        <h3 class="visually-hidden">Team</h3>
        <strong>{{ todo.team.name }}</strong>
        {{ todo.team.members.length }} team members
      </div>
      <div class="location">
        <h3 class="visually-hidden">Location</h3>
        <div class="location"><strong>{{ locationPreference.value }} ({{ officeLocation.value }})</strong> 1:10pm local time | +0h CEST</div>
      </div>
      <p>{{ description.value }}</p>
      <div class="meta">
        <h3 class="visually-hidden">Meta</h3>
        <Meta metaKey="Worker type" :metaValue="todo.worker_type" />
        <Meta metaKey="Desk number" :metaValue="todo.desk_number" />
        <Meta metaKey="Cost centre" :metaValue="todo.cost_centre" />
        <Meta metaKey="Profile created date" :metaValue="created.value" />
        <Meta metaKey="Last modified" :metaValue="lastModified.value" />
        <Meta metaKey="Employee ID" :metaValue="todo.employee_id" />
      </div>
      <div class="actions">
        <h3 class="visually-hidden">Actions</h3>
        <ul>
          <li><Button text="Show more" modifier="button--text-only" /></li>
          <li><Button text="Vouch" modifier="button--secondary" /></li>
          <li><Button text="Report" modifier="button--secondary"/></li>
        </ul>
      </div>
    </section>
    <nav>
      <ul>
        <li><a href="#relations">Relations</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#elsewhere">Find me elsewhere</a></li>
        <li><a href="#access-groups">Access groups</a></li>
        <li><a href="#vouches">Vouches</a></li>
        <li><a href="#tags">Tags</a></li>
      </ul>
    </nav>
    <section id="relations">
      <header>
        <h2>Relations</h2>
      </header>
      <Person v-for="person in todo.team.members"
              v-bind="person"
              v-bind:key="person.id" />
      <a href="/orgchart?focus_on=this_person@TODO">View Org Chart</a>
    </section>
    <section id="contact">
      <header>
        <h2>Contact</h2>
      </header>
      <h3 class="visually-hidden">Contact options</h3>
      <button type="button">Show less contact info</button>
      <hr>
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
    <section id="elsewhere">
      <header>
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
      <Button type="button" text="Show all groups" modifier="button--full-width button--secondary" />
    </section>
    <section id="access-groups">
      <h2>Access Groups</h2>
      <Relation category="NDA">
        Invited by <a href="#">Rubén Martin</a>
      </Relation>
    </section>
    <section id="vouches">
      <h2>Vouches</h2>
      <ShowMore buttonText="Show more" alternateButtonText="Show less" :initial="2" :items="4" :collapsed="true">
        <Vouch v-for="vouch in todo.vouches" v-bind="vouch" :key="vouch.id" />
      </ShowMore>
    </section>
    <section id="tags">
      <h2>Tags</h2>
      <Tag tag="HTML" />
      <Tag tag="GraphQL" />
      <Tag tag="Kubernetes" />
    </section>
  </main>
</template>

<script>
import Button from '@/components/Button.vue';
import Key from '@/components/Key.vue';
import Meta from '@/components/Meta.vue';
import Person from '@/components/Person.vue';
import Relation from '@/components/Relation.vue';
import ShowMore from '@/components/functional/ShowMore.vue';
import Tag from '@/components/Tag.vue';
import Vouch from '@/components/Vouch.vue';

export default {
  name: 'Profile',
  props: {
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
    preferredLagnuage: Object,
  },
  components: {
    Button,
    Key,
    Meta,
    Person,
    Relation,
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
              firstName: 'Katharina',
              lastName: 'Borchert',
              funTitle: 'Open Innovation',
              officeLocation: 'San Francisco',
            },
            {
              id: 2,
              first_name: 'Florian',
              last_name: 'Merz',
              funTitle: 'Open Innovation',
              officeLocation: 'Berlin',
            },
          ],
        },
        vouches: [
          {
            id: 1,
            content: 'An automatic vouch for being a Mozilla employee.',
            voucher: {
              first_name: 'Dino',
              last_name: 'McVouch',
              preferred_title: 'Mozillians.org bot',
            }
          },
          {
            id: 2,
            content: 'Henrik is an active Mozilla Rep, organizing events and working a lot with the community. Thank you for all the work',
            voucher: {
              first_name: 'Emma',
              last_name: 'Irwin',
              preferred_title: 'Open Innovation',
            }
          },
          {
            id: 3,
            content: 'Henrik is an active Mozilla Rep, organizing events and working a lot with the community. Thank you for all the work',
            voucher: {
              first_name: 'Andrew',
              last_name: 'Krug',
              preferred_title: 'InfoSec',
            }
          },
          {
            id: 4,
            content: 'Henrik is an active Mozilla Rep, organizing events and working a lot with the community. Thank you for all the work',
            voucher: {
              first_name: 'Emma',
              last_name: 'Irwin',
              preferred_title: 'Open Innovation',
            },
          },
        ],
        languages: [
          {
            id: 1,
            tag: 'German'
          },
          {
            id: 2,
            tag: 'English'
          },
          {
            id: 3,
            tag: 'Italian'
          },
        ]
      },
    };
  },
};
</script>

<style>
.profile {
  max-width: 60em;
  margin: 0 auto;
}
@media ( min-width: 50em )     {
  .profile {
    display: grid;
    grid-template-columns: repeat( 4, 1fr );
    grid-gap: 0 2em;
  }
}

.profile nav {
  grid-column: 1 / 2;
  grid-row: 2;
  margin-bottom: 2em;
}
  .profile nav ul {
    padding: 0;
    margin: 0;
  }
  .profile nav li {
    list-style: none;
  }
  .profile nav a {
    display: block;
    padding: 1em;
    background: var( --white );
    text-decoration: none;
    margin-bottom: 1px;
    color: var( --darkGrey );
  }
    .profile nav a:hover {
      color: var( --blue );
    }

.profile section {
  border: 1px solid #cfcfcf;
  background: #fff;
  padding: 1.5em;
  margin: 0 0 2em;
  grid-column: 2 / -1;
}

.profile section:first-child {
  grid-column: 1 / -1;
}

.profile section header {
  padding: 1.5em;
  margin: -1.5em -1.5em 1.5em -1.5em;
  border-bottom: 1px solid #cfcfcf;
}

.profile section header h2 {
  margin: 0;
}

.profile__name {
  display: block;
}
  .profile__name h1 {
    display: inline;
  }
  .profile__user-name,
  .profile__pronoun {
    font-size: 1.5em;
    margin-left: 1em;
  }
  .profile__pronoun {
    color: var( --darkGrey );
  }

.profile__title,
.profile__fun-title {
  display: block;
}

.profile__title {
  font-weight: 700;
}

@media( min-width: 50em ) {
  .profile .profile__intro {
    padding-left: 20em;
    position: relative;
  }
  .profile__headshot {
    position: absolute;
    top: 2em;
    left: 2em;
    width: 15em;
  }
}

@media( min-width: 60em ) {
  .profile .profile__intro {
    padding-left: 22em;
  }
  .profile__headshot {
    top: 3em;
    left: 3em;
  }
}
</style>
