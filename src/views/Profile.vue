<template>
  <main class="profile">
    <section id="intro">
      <h1>{{ profile.first_name }} {{ profile.last_name }}</h1>
      <p>{{ profile.title }} a.k.a. {{ profile.fun_title }} {{ profile.pronouns}}</p>
      <h2 class="visually-hidden">About</h2>
      <h3 class="visually-hidden">Team</h3>
  <!--       <div class="team"><strong>{{ profile.team.title }}</strong> {{ profile.team.members }} team members</div>
 -->      
      <h2 class="visually-hidden">Location</h2>
      <div class="location"><strong>{{ profile.office_location}}, DEI Remote</strong> 1:10pm local time | +0h CEST</div>
      <p>{{ profile.description }}</p>
      <h3 class="visually-hidden">Actions</h3>
      <ul>
        <li><a href="/orgchart?highlighted=henrik">View org</a></li>
        <li><button type="button">Show more about me</button></li>
      </ul>
    </section>
    <section id="relations">
      <h2>Relations</h2>
      <Person v-for="person in profile.team" v-bind="person" />
      <button type="button">Show more</button>
    </section>
    <section id="contact">
      <h2>Contact</h2>
      <button type="button">Show less contact info</button>
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

export default {
  name: 'Profile',
  components: {
    Person,
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
        team: [
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
            location: 'Berlin',
          },
        ],
      },
    };
  },
};
</script>
