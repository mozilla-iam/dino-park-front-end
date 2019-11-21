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
      <h1>Welcome to the Mozilla People Directory</h1>
      <p v-if="scope.isStaff">
        A secure place to quickly find your team members and easily discover new ones.
      </p>
      <p v-else>
        A secure place to quickly find your fellow Mozillians and share information about
        yourself!
      </p>
      <p>
        <RouterLink
          :to="{
            name: 'Profile',
            params: { username },
          }"
          class="button"
        >
          <span class="button-text">My profile</span>
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
      const getLink = (url, text) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      };
      return [
        {
          link: this.globalLinks.feedback,
          icon: 'irc',
          headline: 'Your Feedback Matters',
          description: `Let us know how we can make the Mozilla Directory even better.`,
        },
        {
          link: this.globalLinks.profilePrivacy,
          icon: 'lock',
          headline: 'Your Privacy is Protected',
          description: this.scope.isStaff
            ? `Your Staff profile data is only visible to Staff and NDA’d people by default. You can edit this via your profile privacy settings. Read our ${getLink(
                this.globalLinks.profilePrivacy,
                'Discourse post'
              )} for details.`
            : `You control how and with whom your data is being shared. Read our ${getLink(
                this.globalLinks.profilePrivacy,
                'Discourse post'
              )} for further details.`,
        },
        {
          link: this.globalLinks.groupsAnnouncement,
          icon: 'idcard',
          headline: 'Recent Additions',
          description: `LDAP and Mozillians.org access groups are now displayed under the <i>Access groups</i> section. Read more about this and all newly added functionality in our ${getLink(
            this.globalLinks.groupsAnnouncement,
            'Discourse post'
          )}.`,
        },
      ];
    },
  },
};
</script>

<style>
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
  .home-container .container {
    max-width: 74em;
  }
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
