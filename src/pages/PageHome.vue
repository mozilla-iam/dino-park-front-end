<template>
  <main class="home">
    <div class="home__large-card">
      <h1>{{ fluent('home_welcome') }}</h1>
      <img
        src="@/assets/images/people-dots.png"
        srcset="@/assets/images/people-dots@2x.png 2x"
      />
      <p>{{ fluent('home_welcome', 'description-public') }}</p>
      <RouterLink
        v-if="loggedIn"
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
      <ExternalButtonLink
        v-else
        href="/_/login"
        iconRight="chevron-right"
        class="home__button-link"
        :text="fluent('log_in')"
      >
      </ExternalButtonLink>
    </div>
    <p class="home__paragraph">
      {{ fluent('home_paragraph') }}
      <a target="_blank" rel="noopener noreferrer" :href="globalLinks.iamFaq">
        {{ fluent('home_paragraph', 'link') }}
      </a>
    </p>
    <section
      class="home__large-card large-card--no-bottom large-card--23 large-card--quad-bg"
    >
      <h1>{{ fluent('contribute_header') }}</h1>
      <div class="contribute__image"></div>
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
import ExternalButtonLink from '@/components/ui/ExternalButtonLink.vue';
import Icon from '@/components/ui/Icon.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';

export default {
  name: 'PageHome',
  mixins: [LinksMixin],
  components: {
    ExternalButtonLink,
    Icon,
  },
  computed: {
    loggedIn() {
      return this.$store.state.scope.isLoggedIn;
    },
    username() {
      return this.$store.state.scope.username;
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
  height: max-content;
  align-self: flex-start;
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
  justify-content: flex-end;
  align-items: center;
  grid-column: 1;
  grid-row: 4;
  background-image: url(~@/assets/images/tricrowd.png);
  background-repeat: no-repeat;
  background-size: 18em;
  background-position: bottom -7em right 0em;
  min-height: 14em;
}

.large-card--quad-bg {
  background-image: url('~@/assets/images/quad.svg');
  background-repeat: no-repeat;
  background-size: calc(100% - 120px) 8em;
  background-position: left 0em bottom 1.5em;
}

@media (min-width: 50em) {
  .contribute__image {
    justify-self: center;
    justify-content: center;
    grid-column: 1;
    grid-row: 1/4;
    align-items: start;
    background-size: 22em;
    background-position: bottom -7em right 0em;
    min-height: 18em;
    min-width: 22em;
  }
  .large-card--quad-bg {
    background-size: 18em 9.5em;
    background-position: left 0em bottom 3.5em;
  }
}

@media (min-width: 57.5em) {
  .large-card--quad-bg {
    background-size: 27% 9.5em;
  }
}

@media (min-resolution: 120dpi), (-webkit-min-device-pixel-ratio: 1.5) {
  .contribute__image {
    background-image: url(~@/assets/images/tricrowd@2x.png);
  }
}
</style>
