<template>
  <footer class="footer">
    <a href="/" class="footer__link"><Icon id="mail" :width="18" :height="18" /> Help desk</a>
    <a href="https://www.mozilla.org/en-US/legal" class="footer__link"><Icon id="legal" :width="18" :height="18" /> Legal</a>
    <a href="https://www.mozilla.org/en-US/privacy/" class="footer__link"><Icon id="privacy" :width="18" :height="18" /> Privacy</a>
    <a href="https://github.com/mozilla-iam/dino-park-issues" class="footer__link"><Icon id="github" :width="18" :height="18" /> GitHub</a>
    <a href="https://www.mozilla.org/en-US/about/governance/policies/participation/" class="footer__link footer__link--cpg">Community Participation Guidelines</a>
  </footer>
</template>

<script>
import Icon from '@/components/Icon.vue';

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
      padding: 1.5em 2em;
      line-height: 1;
    }
    .footer__link:hover {
      color: inherit;
    }
    .footer__link svg {
      margin-right: .75em;
      display: inline-block;
      vertical-align: middle;
    }
    .footer__link--cpg {
      display: block;
      margin: 0 auto;
      padding-top: 0;
      text-decoration: underline;
    }
</style>
