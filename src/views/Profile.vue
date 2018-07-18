<template>
  <main class="profile">
    <section id="intro">
      <h1>{{ profile.first_name }} {{ profile.last_name }}</h1>
      <p>{{ profile.title }} a.k.a. {{ profile.fun_title }} {{ profile.pronouns}}</p>
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
        <dl>
          <dt>Worker type</dt>
          <dd>{{ todo.worker_type }}</dd>
        </dl>
        <dl>
          <dt>Desk number</dt>
          <dd>{{ todo.desk_number }}</dd>
        </dl>
        <dl>
          <dt>Cost centre</dt>
          <dd>{{ todo.cost_centre }}</dd>
        </dl>
        <dl>
          <dt>Profile created date</dt>
          <dd>{{ profile.created }}</dd>
        </dl>
        <dl>
          <dt>Last modified</dt>
          <dd>{{ profile.last_modified }}</dd>
        </dl>
        <dl>
          <dt>User ID</dt>
          <dd>{{ profile.user_id }}</dd>
        </dl>
        <dl>
          <dt>Employee ID</dt>
          <dd>{{ todo.employee_id }}</dd>
        </dl>
      </div>
      <div class="actions">
        <h3 class="visually-hidden">Actions</h3>
        <ul>
          <li><button type="button">Show more about me</button></li>
          <li><button type="button">Vouch</button></li>
          <li><button type="button">Report</button></li>
        </ul>
      </div>
    </section>
    <section id="relations">
      <h2>Relations</h2>
      <Person v-for="person in todo.team.members" v-bind="person" :key="person.id" />
      <a href="/orgchart?focus_on=this_person@TODO">View Org Chart</a>
    </section>
    <section id="contact">
      <h2>Contact</h2>
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
      <hr>
      <div v-if="profile.preferred_languages.length > 0" class="languages">
        <h3>Languages</h3>
        <Tag v-for="language in profile.preferred_languages" v-bind="language" :key="language.id" />
      </div>
    </section>
    <section id="contact">
      <h2>Find me elsewhere</h2>
      <h3>Mozilla</h3>
      <ul>
        <li>
          <h4>Email <span>Mozilla Reps ReMo</span></h4>
          <div><a href="#">@hmitsch</a></div>
        </li>
        <li>
          <h4>Email <span>Mozilla Discourse</span></h4>
          <div><a href="#">@hmitsch</a></div>
        </li>
      </ul>
      <h3>Elsewhere</h3>
      <ul>
        <li>
          <h4>Email <span>Mozilla Reps ReMo</span></h4>
          <div><a href="#">@hmitsch</a></div>
        </li>
        <li>
          <h4>Email <span>Mozilla Discourse</span></h4>
          <div><a href="#">@hmitsch</a></div>
        </li>
      </ul>
      <button type="button">Show all groups</button>
    </section>
    <section id="access-groups">
      <h2>Access Groups</h2>
    </section>
    <section id="vouches">
      <h2>Vouches</h2>
      <Vouch v-for="vouch in todo.vouches" v-bind="vouch" :key="vouch.id" />
      <button type="button">Show all 6 received vouches</button>
    </section>
  </main>
</template>

<style>
  section {
    background: #fff;
    max-width: 50em;
    margin: 2em auto;
    border: 1px solid #cfcfcf;
    padding: 2em;
  }
</style>

<script>
import Person from '@/components/Person.vue';
import Key from '@/components/Key.vue';
import Tag from '@/components/Tag.vue';
import Vouch from '@/components/Vouch.vue';

export default {
  name: 'Profile',
  components: {
    Person,
    Key,
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
