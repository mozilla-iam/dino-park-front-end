<template>
  <main class="home">
    <div v-if="loggedIn" class="home__large-card large-card--23">
      <img
        v-if="scope.isStaff"
        src="@/assets/images/laptop-phone.png"
        srcset="@/assets/images/laptop-phone@2x.png 2x"
      />
      <img
        v-else
        src="@/assets/images/laptop-phone-community.png"
        srcset="@/assets/images/laptop-phone-community@2x.png 2x"
      />
      <h1>{{ fluent('home_welcome') }}</h1>
      <p v-if="scope.isStaff">
        {{ fluent('home_welcome', 'description-staff') }}
      </p>
      <p v-else>{{ fluent('home_welcome', 'description') }}</p>
      <p>
        <RouterLink
          :to="{
            name: 'Profile',
            params: { username },
          }"
          class="home__button-link button"
        >
          <span class="button-text">
            {{ fluent('home_welcome', 'my-profile') }}
          </span>
          <Icon id="chevron-right" :width="24" :height="24" />
        </RouterLink>
      </p>
    </div>
    <div class="home__large-card" v-else>
      <h1>{{ fluent('home_welcome') }}</h1>
      <img
        src="@/assets/images/people-dots.png"
        srcset="@/assets/images/people-dots@2x.png 2x"
      />
      <p>{{ fluent('home_welcome', 'description-public') }}</p>
      <ExternalButtonLink
        href="/_/login"
        iconRight="chevron-right"
        class="home__button-link"
        :text="fluent('log_in')"
      >
      </ExternalButtonLink>
    </div>
    <CardRow v-if="loggedIn">
      <Card v-for="(card, idx) in cards" :key="idx">
        <div class="card__icon">
          <Icon v-bind:id="card.icon" :width="64" :height="64"></Icon>
        </div>
        <h2>
          <a
            v-bind:href="card.link"
            target="_blank"
            rel="noopener noreferrer"
            class="card__link"
            >{{ card.headline }}</a
          >
        </h2>
        <p v-html="card.description"></p>
      </Card>
    </CardRow>
    <p class="home__paragraph" v-if="!loggedIn">
      {{ fluent('home_paragraph') }}
      <a target="_blank" rel="noopener noreferrer" :href="globalLinks.iamFaq">
        {{ fluent('home_paragraph', 'link') }}
      </a>
    </p>
    <section class="home__large-card large-card--no-bottom" v-if="!loggedIn">
      <h1>{{ fluent('contribute_header') }}</h1>
      <div class="contribute__image">
        <img
          src="@/assets/images/crowd.png"
          srcset="@/assets/images/crowd@2x.png 2x"
        />
      </div>
      <p>{{ fluent('contribute_text') }}</p>
      <ExternalButtonLink
        class="contribute__link button--invert"
        href="https://www.mozilla.org/contribute/"
        iconRight="chevron-right"
        :text="fluent('contribute')"
      >
      </ExternalButtonLink>
    </section>
  </main>
</template>

<script>
import Card from '@/components/ui/Card.vue';
import CardRow from '@/components/ui/CardRow.vue';
import ExternalButtonLink from '@/components/ui/ExternalButtonLink.vue';
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';

export default {
  name: 'PageHome',
  mixins: [LinksMixin],
  components: {
    Card,
    CardRow,
    ExternalButtonLink,
    Icon,
    LoadingSpinner,
  },
  computed: {
    loggedIn() {
      return this.$store.state.scope.isLoggedIn;
    },
    username() {
      return this.$store.state.scope.username;
    },
    cards() {
      const privacyLink =
        this.scope.isStaff || this.scope.isNdaed
          ? this.globalLinks.profilePrivacyNda
          : this.globalLinks.profilePrivacyPublic;
      const updatesLink =
        this.scope.isStaff || this.scope.isNdaed
          ? this.globalLinks.groupsAnnouncement
          : this.globalLinks.ldapContributorsAnnouncement;
      return [
        {
          link: this.globalLinks.feedback,
          icon: 'irc',
          headline: this.fluent('home_links_feedback'),
          description: this.fluent('home_links_feedback', 'description'),
        },
        {
          link: privacyLink,
          icon: 'lock',
          headline: this.fluent('home_links_privacy'),
          description: this.fluent({
            id: 'home_links_privacy',
            attr: this.scope.isStaff ? 'description-staff' : 'description',
            tags: { discourse: { tag: 'a', href: privacyLink } },
          }),
        },
        {
          link: updatesLink,
          icon: 'idcard',
          headline: this.fluent('home_links_updates'),
          description: this.fluent({
            id: 'home_links_updates',
            attr:
              this.scope.isStaff || this.scope.isNdaed
                ? 'description-groups-announcement'
                : 'description-ldap-contributor-announcement',
            tags: { discourse: { tag: 'a', href: updatesLink } },
          }),
        },
      ];
    },
  },
};
</script>

<style>
.home {
  padding-top: 2em;
}
.home__large-card {
  background: var(--white);
  padding: 2em;
  margin-bottom: 2em;
  box-shadow: var(--shadowCard);
  border-radius: var(--cardRadius);
  display: grid;
  grid-template-rows: max-content max-content minmax(max-content, 1fr);
  grid-template-columns: 1fr;
}
.home__large-card > img {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
}
.home__large-card h1 {
  margin-bottom: 0.5em;
  font-size: 2.5em;
  line-height: 1.1;
}
.home__large-card p {
  color: var(--gray-50);
}
.home__button-link {
  display: inline-flex;
  margin-top: 2em;
  margin-bottom: 2em;
  width: max-content;
}

.home__button-link svg {
  margin-left: 1em;
}
.home__large-card p:last-child {
  margin-bottom: 0;
}

.home__paragraph {
  padding: 0em 3em 3em;
  color: var(--gray-50);
}

@media (min-width: 50em) {
  .home__large-card {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 2em;
    width: 100%;
    padding: 4em 4em 2em;
  }
  .large-card--23 {
    grid-template-columns: 2fr 3fr;
    grid-gap: 0 4em;
  }
  .home__large-card > img {
    grid-column: 2;
    grid-row: 1/4;
  }
}

.large-card--no-bottom {
  padding-bottom: 0em;
}

.contribute__link {
  margin-top: 1em;
  margin-bottom: 4em;
}
.contribute__image {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  grid-column: 1;
  grid-row: 4;
  background-image: url(~@/assets/images/skewed-triangle.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top 2em left 0em;
}

.contribute__image > img {
  padding-top: 1em;
  width: 70%;
  padding-bottom: 3em;
}

@media (min-width: 50em) {
  .contribute__image {
    justify-self: center;
    justify-content: center;
    grid-column: 1;
    grid-row: 1/4;
    align-items: start;
  }
  .contribute__image > img {
    max-width: 50%;
    padding-bottom: 0em;
  }
}
</style>
