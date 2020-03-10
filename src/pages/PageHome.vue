<template>
  <main class="home">
    <div class="home__intro">
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
          class="button"
        >
          <span class="button-text">
            {{ fluent('home_welcome', 'my-profile') }}
          </span>
          <Icon id="chevron-right" :width="24" :height="24" />
        </RouterLink>
      </p>
    </div>
    <CardRow>
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
  </main>
</template>

<script>
import Card from '@/components/ui/Card.vue';
import CardRow from '@/components/ui/CardRow.vue';
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';

export default {
  name: 'PageHome',
  mixins: [LinksMixin],
  components: {
    Card,
    CardRow,
    Icon,
    LoadingSpinner,
  },
  computed: {
    username() {
      return this.$store.state.user.primaryUsername.value;
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
.home__intro {
  background: var(--white);
  padding: 2em;
  margin-bottom: 2em;
  box-shadow: var(--shadowCard);
  border-radius: var(--cardRadius);
}
.home__intro > img {
  margin-bottom: 1em;
}
.home__intro h1 {
  margin-bottom: 0;
  font-size: 2.5em;
  line-height: 1.1;
}
.home__intro p {
  color: var(--gray-50);
}
.home__intro .button {
  display: inline-flex;
  margin-top: 2em;
  margin-bottom: 2em;
}

.home__intro .button svg {
  margin-left: 1em;
}
.home__intro p:last-child {
  margin-bottom: 0;
}
@media (min-width: 50em) {
  .home__intro {
    display: inline-block;
    width: 100%;
    padding: 4em 4em 2em;
  }
  .home__intro > img {
    float: right;
    margin-left: 8em;
    max-width: 50%;
    margin-bottom: 0;
  }
}
</style>
