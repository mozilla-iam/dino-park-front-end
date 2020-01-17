<template>
  <div>
    <template
      v-if="pgpPublicKeys && Object.keys(pgpPublicKeys.values || {}).length > 0"
    >
      <h4 class="visually-hidden">PGP</h4>
      <Key
        v-for="[key, value] in Object.entries(pgpPublicKeys.values || {}).slice(
          0,
          this.initiallyShown,
        )"
        type="PGP"
        :title="key"
        :content="value"
        :key="`pgp-${key}`"
      />
      <ShowMore
        v-if="
          Object.entries(pgpPublicKeys.values || {}).length >
            this.initiallyShown
        "
        :buttonText="fluent('more')"
        :alternateButtonText="fluent('less')"
        class="keys__show-more"
        buttonClass="button button--text-only button--less-padding keys__show-more-button"
        :transition="true"
      >
        <template slot="overflow">
          <Key
            v-for="[key, value] in Object.entries(
              pgpPublicKeys.values || {},
            ).slice(this.initiallyShown)"
            type="PGP"
            :title="key"
            :content="value"
            :key="`pgp-${key}`"
          />
        </template>
        <template slot="icon-expanded">
          <Icon id="chevron-up" :width="24" :height="24" />
        </template>
        <template slot="icon-collapsed">
          <Icon id="chevron-down" :width="24" :height="24" />
        </template>
      </ShowMore>
    </template>
    <template
      v-if="sshPublicKeys && Object.keys(sshPublicKeys.values || {}).length > 0"
    >
      <h4 class="visually-hidden">SSH</h4>
      <Key
        v-for="[key, value] in Object.entries(sshPublicKeys.values || {}).slice(
          0,
          this.initiallyShown,
        )"
        type="SSH"
        :title="key"
        :content="value"
        :key="`ssh-${key}`"
      />
      <ShowMore
        v-if="
          Object.entries(sshPublicKeys.values || {}).length >
            this.initiallyShown
        "
        :buttonText="fluent('more')"
        :alternateButtonText="fluent('less')"
        class="keys__show-more"
        buttonClass="button button--text-only button--less-padding keys__show-more-button"
        :transition="true"
      >
        <template slot="overflow">
          <Key
            v-for="[key, value] in Object.entries(
              sshPublicKeys.values || {},
            ).slice(this.initiallyShown)"
            type="SSH"
            :title="key"
            :content="value"
            :key="`ssh-${key}`"
          />
        </template>
        <template slot="icon-expanded">
          <Icon id="chevron-up" :width="24" :height="24" />
        </template>
        <template slot="icon-collapsed">
          <Icon id="chevron-down" :width="24" :height="24" />
        </template>
      </ShowMore>
    </template>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Key from '@/components/ui/Key.vue';
import ShowMore from '@/components/_functional/ShowMore.vue';

export default {
  name: 'ViewKeys',
  props: {
    pgpPublicKeys: Object,
    sshPublicKeys: Object,
    userOnOwnProfile: Boolean,
  },
  components: {
    Icon,
    Key,
    ShowMore,
  },
  data() {
    return {
      initiallyShown: 1,
    };
  },
};
</script>

<style>
.keys__show-more {
  padding: 0.5em 0;
}
.keys__show-more-button {
  font-size: 1em;
  margin: 0 auto;
  color: var(--gray-50);
}
</style>
