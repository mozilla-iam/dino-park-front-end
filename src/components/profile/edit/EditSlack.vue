<template>
  <div :class="{ 'slack-container': true, 'sign-in': slack.v === '' }">
    <a class="sign-in-link" v-if="slack.v === ''" href="/whoami/slack/add">
      <img
        alt="Sign in with Slack"
        src="@/assets/images/sign_in_with_slack.png"
        srcset="
          @/assets/images/sign_in_with_slack.png    1x,
          @/assets/images/sign_in_with_slack@2x.png 2x
        "
      />
    </a>
    <IconBlock v-else :heading="'Mozilla Slack'" :icon="'slack'">
      <a v-if="uri" :href="uri" target="_blank" rel="noreferrer noopener">
        {{ text }}
      </a>
      <template v-else>{{ text }}</template>
    </IconBlock>
  </div>
</template>
<script>
import IconBlock from '@/components/ui/IconBlock.vue';

export default {
  name: 'EditSlack',
  components: { IconBlock },
  props: {
    slack: Object,
  },
  computed: {
    uri() {
      return this.slack.v.substring(0, this.slack.v.indexOf('#'));
    },
    text() {
      return this.slack.v.substring(this.slack.v.indexOf('#') + 1);
    },
  },
};
</script>
<style>
.slack-container {
  display: block;
  width: 100%;
  align-self: center;
  grid-column: 2 / 4;
}

@media (min-width: 57.5em) {
  .slack-container {
    display: inline-block;
    align-self: center;
    grid-column: auto;
  }
}

.sign-in {
  height: 2.5em;
}

.slack-container .sign-in-link {
  display: inline-block;
  height: 100%;
}

.slack-container .sign-in-link img {
  display: block;
  height: 100%;
}

.slack-container .icon-block {
  margin-bottom: 0;
}
</style>
