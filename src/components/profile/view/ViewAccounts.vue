<template>
  <div>
    <header class="profile__section-header">
      <h2>Accounts</h2>
    </header>
    <div class="profile__external-accounts">
      <div v-if="accounts.mozilla.length">
        <h3>Mozilla</h3>
        <IconBlockList>
          <IconBlock
            v-for="(acc, index) in accounts.mozilla"
            :key="`acc-moz-${index}`"
            :heading="acc.text"
            :icon="acc.icon"
          >
            <a :href="acc.value" target="_blank" rel="noreferrer noopener">{{
              acc.value
            }}</a>
          </IconBlock>
        </IconBlockList>
      </div>
      <div v-if="accounts.other.length">
        <h3>Elsewhere</h3>
        <IconBlockList>
          <IconBlock
            v-for="(acc, index) in accounts.other"
            :key="`acc-other-${index}`"
            :heading="acc.text"
            :icon="acc.icon"
          >
            <a :href="acc.value" target="_blank" rel="noreferrer noopener">{{
              acc.value
            }}</a>
          </IconBlock>
        </IconBlockList>
      </div>
    </div>
  </div>
</template>

<script>
import AccountsMixin from '@/components/_mixins/AccountsMixin.vue';
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';

export default {
  name: 'ViewAccounts',
  props: {
    uris: Object,
  },
  mixins: [AccountsMixin],
  components: {
    IconBlock,
    IconBlockList,
  },
  computed: {
    accounts() {
      const wellKnown = Object.entries(this.uris.values || {})
        .map((kv) => this.account(kv))
        .filter((a) => a !== null && typeof a !== 'undefined');
      const mozilla = wellKnown.filter(({ moz }) => moz);
      const other = wellKnown.filter(({ moz }) => !moz);
      return { mozilla, other };
    },
  },
};
</script>

<style>
@media (min-width: 57.5em) {
  .profile__external-accounts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2em;
  }
  .profile__external-accounts h3 {
    margin-top: 0; /* because grid item margins don't collapse */
  }
}
</style>
