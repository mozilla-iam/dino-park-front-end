<template>
  <div class="profile__external-accounts">
    <div v-for="(account, idx) in accounts" v-bind:key="idx">
      <h3>{{ account.title }}</h3>
      <IconBlockList class="external-accounts__list">
        <template v-for="(acc, index) in account.data">
          <ViewSlack
            v-if="isKeySlack(acc.key)"
            :slack="acc"
            v-bind:key="`acc-${account.key}-${index}`"
          />
          <IconBlock
            v-else
            :key="`acc-${account.key}-${index}`"
            :heading="acc.text"
            :icon="acc.icon"
          >
            <a
              v-if="acc.uri"
              :href="acc.uri"
              target="_blank"
              rel="noreferrer noopener"
              >{{ acc.value }}</a
            >
            <template v-else>{{ acc.value }}</template>
          </IconBlock>
        </template>
      </IconBlockList>
    </div>
  </div>
</template>

<script>
import AccountsMixin from '@/components/_mixins/AccountsMixin.vue';
import IconBlock from '@/components/ui/IconBlock.vue';
import IconBlockList from '@/components/ui/IconBlockList.vue';
import ViewSlack from '@/components/profile/view/ViewSlack.vue';

export default {
  name: 'ViewAccounts',
  props: {
    uris: Object,
    userOnOwnProfile: Boolean,
  },
  mixins: [AccountsMixin],
  components: {
    ViewSlack,
    IconBlock,
    IconBlockList,
  },
  computed: {
    accounts() {
      const wellKnown = this.getMozillaAccounts(this.uris);
      const returnAccounts = [
        {
          title: 'Mozilla',
          key: 'moz',
          data: wellKnown.filter(({ moz }) => moz),
        },
      ];
      const other = wellKnown.filter(({ moz }) => !moz);
      if (other.length > 0) {
        returnAccounts.push({ title: 'Elsewhere', key: 'other', data: other });
      }
      return returnAccounts;
    },
  },
};
</script>

<style>
@media (min-width: 57.5em) {
  .profile__external-accounts {
    display: flex;
    flex-direction: column;
  }
  .profile__external-accounts h3 {
    margin-top: 0; /* because grid item margins don't collapse */
  }

  .profile__external-accounts .external-accounts__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .profile__external-accounts .external-accounts__list .icon-block {
    width: 45%;
  }
}
</style>
