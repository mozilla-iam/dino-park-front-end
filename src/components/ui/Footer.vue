<template>
  <footer class="footer">
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
  </footer>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';

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
          label: 'CPG',
          abbr: 'Community Participation Guidelines',
        },
        {
          link: this.globalLinks.faq,
          icon: 'faq',
          label: 'FAQ',
        },
        {
          link: this.globalLinks.githubIssues,
          icon: 'github',
          label: 'GitHub',
        },
        {
          link: this.globalLinks.legal,
          icon: 'check',
          label: 'Legal',
        },
        {
          link: this.globalLinks.privacy,
          icon: 'lock',
          label: 'Privacy',
        },
      ];
    },
  },
};
</script>

<style>
.footer {
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  margin-top: 2em;
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
