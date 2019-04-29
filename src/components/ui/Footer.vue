<template>
  <footer class="footer">
    <a
      href="https://www.mozilla.org/en-US/about/governance/policies/participation/"
      class="footer__link"
      target="_blank"
      rel="noopener noreferrer"
      ><Icon id="cpg" :width="12" :height="12" />
      <abbr title="Community Participation Guidelines">CPG</abbr></a
    >
    <a
      href="https://discourse.mozilla.org/t/dinopark-faq/33564"
      class="footer__link"
      target="_blank"
      rel="noopener noreferrer"
      ><Icon id="faq" :width="12" :height="12" /> FAQ</a
    >
    <a
      href="https://github.com/mozilla-iam/dino-park-issues"
      class="footer__link"
      target="_blank"
      rel="noopener noreferrer"
      ><Icon id="github" :width="12" :height="12" /> GitHub</a
    >
    <a
      href="https://discourse.mozilla.org/c/iam/dinopark"
      class="footer__link"
      target="_blank"
      rel="noopener noreferrer"
      ><Icon id="envelope" :width="12" :height="12" /> Helpdesk</a
    >
    <a
      href="https://www.mozilla.org/en-US/legal"
      class="footer__link"
      target="_blank"
      rel="noopener noreferrer"
      ><Icon id="check" :width="12" :height="12" /> Legal</a
    >
    <a
      href="https://www.mozilla.org/en-US/privacy/"
      class="footer__link"
      target="_blank"
      rel="noopener noreferrer"
      ><Icon id="lock" :width="12" :height="12" /> Privacy</a
    >
  </footer>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'Footer',
  components: {
    Icon,
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
