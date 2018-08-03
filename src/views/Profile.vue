<template>
  <main class="profile">
    <section id="intro" class="profile__intro">
      <h1>{{ profile.first_name }} {{ profile.last_name }}</h1>
      <p>{{ profile.title }} a.k.a. {{ profile.fun_title }} {{ profile.pronouns}}</p>
      <div class="profile__headshot">
        <img :src="profile.picture" alt="" />
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
        <div class="location"><strong>{{ profile.location_preference }} ({{ profile.office_location}})</strong> 1:10pm local time | +0h CEST</div>
      </div>
      <p>{{ profile.description }}</p>
      <div class="meta">
        <h3 class="visually-hidden">Meta</h3>
        <Meta metaKey="Worker type" :metaValue="todo.worker_type" />
        <Meta metaKey="Desk number" :metaValue="todo.desk_number" />
        <Meta metaKey="Cost centre" :metaValue="todo.cost_centre" />
        <Meta metaKey="Profile created date" :metaValue="profile.created" />
        <Meta metaKey="Last modified" :metaValue="profile.last_modified" />
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
              :key="person"
              v-bind="person" />
      <a href="/orgchart?focus_on=this_person@TODO">View Org Chart</a>
    </section>
    <section id="contact">
      <header>
        <h2>Contact</h2>
      </header>
      <h3 class="visually-hidden">Contact options</h3>
      <button type="button">Show less contact info</button>
      <hr>
      <div v-if="profile.pgp_public_keys || profile.ssh_public_keys">
        <h3>Keys</h3>
        <div v-if="profile.pgp_public_keys">
          <h4 class="visually-hidden">PGP</h4>
          <Key v-for="key in profile.pgp_public_keys" type="PGP" title="Title" :content="key" :key="key.id" />
        </div>
        <div v-if="profile.pgp_public_keys">
          <h4 class="visually-hidden">SSH</h4>
          <Key v-for="key in profile.ssh_public_keys" type="SSH" title="Title" :content="key" :key="key.id" />
        </div>
      </div>
      <template v-if="profile.preferred_languages.length > 0">
      <hr>
      <div class="languages">
        <h3>Languages</h3>
        <Tag v-for="language in profile.preferred_languages" v-bind="language" :key="language.id" />
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
      <Vouch v-for="vouch in todo.vouches" v-bind="vouch" :key="vouch.id" />
      <button type="button">Show all 6 received vouches</button>
    </section>
    <section id="tags">
      <h2>Tags</h2>
      <Tag v-for-object="tags in profile.tags" v-bind="tag" />
      <button type="button">Show all 6 received vouches</button>
    </section>
  </main>
</template>

<script>
import Button from '@/components/Button.vue';
import Key from '@/components/Key.vue';
import Meta from '@/components/Meta.vue';
import Person from '@/components/Person.vue';
import Relation from '@/components/Relation.vue';
import Tag from '@/components/Tag.vue';
import Vouch from '@/components/Vouch.vue';

export default {
  name: 'Profile',
  components: {
    Button,
    Key,
    Meta,
    Person,
    Relation,
    Tag,
    Vouch,
  },
  data() {
    return {
      profile: {
        last_name: 'Drake',
        office_location: 'Vancouver',
        ssh_public_keys: {
          'unit-claim': 'ssh-rsa NdaqTLQAgSSNjAKjiSUMkFvPPflfxdLRMbeqOpGwVxxzWZAlQCJozrmUGXpXhJAGsFTXLzFvOTDOLPFDoOBUQTpeGZTaixUPfBGBmmRgkfAWTzlliOLEBTPjFOoGYQwWbArUNxikxeelIpuFBTnPmCtyhUKIodtgJLKCGgkamJlHkZPAzQJqFdFJKHspWAwsxdTZwlDPhWADwRZdUSdPZprvXurnrBrbappCgelPVISyrWGhmevKaAMekWaCcVHiOnvCmRPzKzPjZCwpikuPgyGWPNfHzKEBmDsmnCGKjflPnoTceXBuOICRkPjfvhMztZEdQJlyHdDbPLaJyJUNlQueOmLneljvAHteQqBJIkmgngLArlPcNBLKojkvNwrhwKwvpJUteZsxevRmjpKUJWNhHvPyHuCEoeMVtBwvkrArmiPQFMCFA alexander19@gmail.com',
          'art-physical': 'ssh-rsa AYVQYlTZbOVdGgLiACASfgXGiQVUFThOTRlBUvcaRjrEJtDwjOYFHjCTfcdDDxXjkwJWvpbIekGHPgUchKTRjsDDiqdZxAVhnerANTqzdWWFjJclsgoBuJmCjLNrbkUjiFrmvMriRCOFAAUwHSsJquzxoZpeWdTtOpRyutSRnVmtkRPDtTvOmQFAIQBpQctktsSndLbAqCtPsWgflukeohGcUUiCHyOVrSRrKrPxHVMMlPqCbeuRKkXXkXlvOYbDzcsMYSJTrVBuoVrmKtUXxkRysIZNEfqFbvzfkkvJAlBzClmhmDUpxxleGjiHzLOUvzYqwBihAMuBSJJqIpZrbmrRXCJJmiYlVsuqMGfLIGeeQYfbkigLVdSKwtjsicoFVku tanner98@hotmail.com',
          'fire-who-mr-kid': 'ssh-rsa zNNRbvKUsPcfdpQAjPYcEYzCcCinfqvzxuQfFRNJcoOnooTEKRCPIHfhfWXdGMNjXXBqcoqbTsZwVcfuBdNECwXsIiUYkCnLINRsgsqNGAPlOkKNXssRrTJyCxEIZKdxJegkoLdQVbHQQfeheIlvHgsLcZqIqqWMUkYkfkmubPcWhfFgIlpWoPmrtuBEJdZiwcOiFNByLAMDznRWUUuytmZkXOrJSZKrjNuFlgjLZXONCXNTdaaiOvVySAAhfhHAwkJtaPwSRZogWPowjPkeFcroEEHjiaCfPtgNqZdrHrVJoWYnfBIttGuuTapXKWGarDQoljiNTEaJxoXZnkKfPYXgImMqbCUEPErdPpQDmPBzEVgjUJKKKmrtSJuYhglvkZJZDPZcthIYO david57@malone.com',
          'skill-from-else': 'ssh-rsa BPcWUnmsMDczRzdspovNnkBxgoDYktSoWuBNUktWDuJAPDJGYdTZPDtyPEXIACkJZADTGFtPyCHMcElHrTdYgqJJTSCuuBPpdMvIJQHTRvCyEHELgWroEDlnlYxerEmXByQoxnlUJIjXwASSJYqEVehfvuehaRldfvwpCqotlGbpPkkTQGXfctoUrexvHEVoOYEvdheewWFEwNHfciwzfsXQTzBVxxDtUOaEfhDHfjnOaADQDDOLSaxveLsEorCEpVmJAbniBTedidSeFQcHWNpDoIXwijozulKNhSjFFkPmzStAaTgZkVrdTCWfbPMdGlYq smithallen@gmail.com',
        },
        timezone: 'Africa/Maputo',
        $schema: 'https://person-api.sso.mozilla.com/schema/v2/profile',
        identities: {
          'career-part-despite': 'http://baker.com/home.php',
        },
        phone_numbers: {},
        usernames: {},
        user_id: 'email|tlSLZtACIaOAVcwLawEjyKMM',
        login_method: 'email',
        primary_email: 'mary28@stark-herman.com',
        pronouns: 'she/her',
        preferred_languages: [],
        uris: {
          'artist-rate-benefit': 'http://everett-gonzalez.com/wp-content/tags/main/home/',
          'add-there-measure': 'https://www.lopez-morris.net/terms.htm',
          'ago-choice-property': 'http://le-graves.com/',
          'my-moment': 'http://www.anderson.info/',
          'medical-tend-sound': 'http://gutierrez-green.com/app/privacy/',
        },
        picture: 'https://placeholdit.imgix.net/~text?txtsize=55&txt=497x360&w=497&h=360',
        description: 'Star point business itself. Property dream author past factor. Here sound example during break toward eat. Authority real change key continue follow these something.',
        tags: [
          'water',
          'size',
          'detail',
        ],
        access_information: {
          mozilliansorg: {},
          ldap: {
            'almost-what-upon': true,
            'sister-ever-for': false,
            'if-public-surface': false,
            'short-song-house': true,
          },
        },
        first_name: 'Catherine',
        fun_title: 'It history world.',
        last_modified: '2014-08-18T08:25:33',
        active: false,
        pgp_public_keys: {
          'close-better-guy': '-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nuzBaPBSRANhjqegbLERDTtSNpwREVEJzCdTdWTDKoeRsoRjMaWesRyNwSlOwRGlEfQuCLfOaLsTICcyiutahYNnUuXvBYTaYWHYlSisuxsmUXDfVqmolxrVXRsGejAdWVmwXIssYstziJqRkeBzoeWfolJAjnMnfiGBjeTJWToFYIcwuITLYbmROiAsQUWeRPbZRpkILmYDyHiECZpnSlyLxhkCoJoTLJfkAhaQeFYkpYQpMVQkZPEWGncEMSrYokLzZDvPCGVwSMXlNEsqvTdHTTwKpgfBEmOAPvKABvrppqiQWLhvSZMTJEZgYjvMBulsnBUEllOr\n-----END PGP PUBLIC KEY BLOCK-----\n',
          'nation-development': '-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nakfQWWLkPBzxtkrAnsGDkrFVTIABOAluIxxMnNgZPruRlnihqdPFalmrQWSSEJtlmStSgmEESKpdOHidvXSotUuHPswcnMlEoDzwIOTIQGKvZCJuFYddcxLwootnRHnoLLDrjlDSWdILMzVqnjNGYCBzKRYtpohIuIfiixfyAfrLSaFKXmBRSLgySaCddxTzGfzeQCMsUIBGkWeJNHkjmzxadSkOkeKjlPiiricMFPUZhWRKomLhIDTEpNIBuxOpXiomWHJmfllZ\n-----END PGP PUBLIC KEY BLOCK-----\n',
          'store-around-media': '-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nPsKakcdgiqpmnljxcIwGwcgzmPhAJYWUMDJeFpVadKqpetPkzGwvtEwvjmBVvBbnmbGjmveuBhSPcDJKqJLApQYosbSvFRyXRQSYULAcWoIIarzXwmfnKxrESuvpNXBubXgutPZtNgpRbRcJIzxRxXGSmHeDyXXMucjHsEOoxALhsnguGXAJtLDMAfIepVrtXOYiJmQxalSyZkrcfgUdcBnGuljknrxemRCKBUrMmOOxljafvMUZmrVqugqLwepuZOhcWnmGrixVCeogSsiQHNvTwDCHsyhGZVIFwYocZEYCdASDUwyEZFKHQbtQLACQSklcvHHxWnObceLDhosEVJEoTcBgBmtGVIismpEJfxVHrtDtZLlbBgWGeaGofqvCGCFydQSxUPFEQnylycTLLbTYBXTucwvGQrDZcpILIITpweVfEe\n-----END PGP PUBLIC KEY BLOCK-----\n',
          'color-green-claim': '-----BEGIN PGP PUBLIC KEY BLOCK-----\n\npIbjHjabZYQSvLdbaVrjZYmavAqrtGibqoYYkkYoJYtpeHXVZspAieQDhtvVPdLrEpmKNOQzcwohHbSFajzyqVQnawqrAetjjQgMpkuCgCuwPdwynXiUDMyNvPbtxtkkJlGNVOSEzynvuuOcMtxjloURPLCvPEgLELdiRFuOWlCRBJHbafjRVMXVsXKcXrvtspEHSGosfpEXXHwiiqdTUEkWLeUnsibsSgtFgRHtGLQXMUsJiSpKAFmoaWADXBlwvzfOPNBRExVyjdbLf\n-----END PGP PUBLIC KEY BLOCK-----\n',
        },
        location_preference: 'Lao People\'s Democratic Republic',
        alternative_name: 'Lisa Simon',
        created: '2005-07-20T19:44:31',
      },
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
              first_name: 'Katharina',
              last_name: 'Borchert',
              team: 'Open Innovation',
              location: 'San Francisco',
            },
            {
              id: 2,
              first_name: 'Florian',
              last_name: 'Merz',
              team: 'Open Innovation',
              location: 'San Francisco',
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
            },
          },
          {
            id: 2,
            content: 'Henrik is an active Mozilla Rep, organizing events and working a lot with the community. Thank you for all the work',
            voucher: {
              first_name: 'Emma',
              last_name: 'Irwin',
              preferred_title: 'Open Innovation',
            },
          },
        ],
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
@media ( min-width: 50em ) {
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
