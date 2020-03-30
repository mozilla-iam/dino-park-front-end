<template>
  <footer class="footer">
    <section class="footer__contribute" v-if="showContribute">
      <h1>{{ fluent('contribute_header') }}</h1>
      <div class="footer__contribute-img">
        <img
          src="@/assets/images/crowd.png"
          srcset="@/assets/images/crowd@2x.png 2x"
        />
      </div>
      <p>{{ fluent('contribute_text') }}</p>
      <ExternalButtonLink
        class="footer__contribute__link button--invert"
        href="https://www.mozilla.org/contribute/"
        iconRight="chevron-right"
        :text="fluent('contribute')"
      >
      </ExternalButtonLink>
    </section>
    <section class="footer__links">
      <a
        v-for="(single, index) in links"
        v-bind:key="index"
        v-bind:href="single.link"
        class="footer__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon v-bind:id="single.icon" :width="12" :height="12" />
        <abbr v-if="single.abbr" v-bind:title="single.abbr">
          {{ single.label }}
        </abbr>
        {{ !single.abbr ? single.label : '' }}
      </a>
      <select v-if="languages.length > 1" v-on:change="updateLocale">
        <option
          v-for="[locale, language] in languages"
          :key="locale"
          :value="locale"
          :selected="locale === currentLocale ? true : false"
          >{{ language }}</option
        >
      </select>
    </section>
  </footer>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import Fluent from '@/assets/js/fluent';
import ExternalButtonLink from '@/components/ui/ExternalButtonLink.vue';

export default {
  name: 'Footer',
  mixins: [LinksMixin],
  components: {
    Icon,
    ExternalButtonLink,
  },
  computed: {
    showContribute() {
      return !this.$store.state.scope.isLoggedIn && this.$route.name === 'Home';
    },
    links() {
      return [
        {
          link: this.globalLinks.participationGuidelines,
          icon: 'cpg',
          label: this.fluent('footer_cpg'),
          abbr: this.fluent('footer_cpg', 'abbr'),
        },
        {
          link:
            this.scope.isStaff || this.scope.isNdaed
              ? this.globalLinks.faqNda
              : this.globalLinks.faqPublic,
          icon: 'faq',
          label: this.fluent('footer_faq'),
        },
        {
          link: this.globalLinks.githubIssues,
          icon: 'github',
          label: this.fluent('footer_github'),
        },
        {
          link: this.globalLinks.legal,
          icon: 'check',
          label: this.fluent('footer_legal'),
        },
        {
          link: this.globalLinks.privacy,
          icon: 'lock',
          label: this.fluent('footer_privacy'),
        },
      ];
    },
    languages() {
      return Fluent.languages();
    },
    currentLocale() {
      return Fluent.locales[1];
    },
  },
  methods: {
    updateLocale(e) {
      window.localStorage.locale = e.target.selectedOptions[0].value;
      window.location.reload(false);
    },
  },
};
</script>

<style>
.footer {
  margin-top: 2em;
}
.footer__contribute {
  padding: 2em 2em 0em;
  background-color: var(--white);
  display: grid;
  grid-template-columns: 1fr;
}
.footer__contribute > h1 {
  font-size: 2.5em;
}
.footer__contribute__link {
  margin-top: 1em;
  margin-bottom: 4em;
}
.footer__contribute-img {
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

.footer__contribute-img > img {
  padding-bottom: 3em;
}
@media (min-width: 50em) {
  .footer__contribute {
    --contribute-pad: calc(((100% - 74em) / 2) + 4em);
    padding: 1em max(4em, var(--contribute-pad)) 0em;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 2em;
  }
  .footer__contribute-img {
    justify-self: center;
    justify-content: center;
    grid-column: 1;
    grid-row: 1/4;
  }
  .footer__contribute-img > img {
    padding-bottom: 0em;
  }
}
.footer__links {
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  padding: 2em 0;
}
.footer__link {
  color: var(--gray-40);
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  padding: 0.9em 1.5em;
  margin: 1em 0.5em;
  border-radius: 2em;
  line-height: 1;
}
.footer__link:hover {
  color: inherit;
}
.focus-styles .footer__link:focus {
  box-shadow: 0px 0 0 1px var(--white), 0 0 0 3px var(--transparentWhite);
}
.footer__link svg {
  margin-right: 0.75em;
  display: inline-block;
  vertical-align: middle;
  background: var(--gray-40);
  border-radius: 100%;
  color: var(--black);
  padding: 0.25em;
  box-sizing: content-box;
}
.footer__link:hover svg {
  background-color: var(--white);
}
</style>
