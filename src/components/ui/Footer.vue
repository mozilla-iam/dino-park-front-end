<template>
  <footer class="footer">
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

export default {
  name: 'Footer',
  mixins: [LinksMixin],
  components: {
    Icon,
  },
  computed: {
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
          link: this.globalLinks.githubIssues,
          icon: 'irc',
          label: this.fluent('footer_feedback'),
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
