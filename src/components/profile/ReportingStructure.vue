<template>
  <div v-if="this.related.show" class="reporting-structure">
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <div
      v-if="this.related.manager"
      class="reporting-structure__container reporting-structure__reports-to"
    >
      <h3>Reports to:</h3>
      <Person class="person--borderless" v-bind="this.related.manager" />
    </div>
    <div
      v-if="this.related.directs.length > 0"
      class="reporting-structure__container reporting-structure__manages"
    >
      <h3>Manages:</h3>
      <div class="reporting-structure__content">
        <Person
          v-for="(direct, index) in this.related.directs.slice(
            0,
            this.initiallyShown,
          )"
          :class="directsView"
          :key="`direct-${index}`"
          v-bind="direct"
        />
        <ShowMore
          v-if="this.related.directs.length > this.initiallyShown"
          buttonText="Show More"
          alternateButtonText="Show Less"
          class="reporting-structure__show-more"
          buttonClass="button button--text-only button--less-padding reporting-structure__show-more-button"
          :transition="true"
        >
          <template slot="overflow">
            <Person
              v-for="(direct, index) in this.related.directs.slice(
                this.initiallyShown,
              )"
              :class="directsView"
              :key="`direct-${index}`"
              v-bind="direct"
            />
          </template>
          <template slot="icon-expanded">
            <Icon id="chevron-up" :width="24" :height="24" />
          </template>
          <template slot="icon-collapsed">
            <Icon id="chevron-down" :width="24" :height="24" />
          </template>
        </ShowMore>
      </div>
    </div>
    <div
      v-if="this.related.peers.length > 0"
      :class="{
        'reporting-structure__container': true,
        'reporting-structure__peers': true,
        'has-more': this.related.peers.length > this.initiallyShown,
      }"
    >
      <h3>Peers:</h3>
      <div class="reporting-structure__content">
        <Person
          v-for="(peer, index) in this.related.peers.slice(
            0,
            this.initiallyShown,
          )"
          :class="peersView"
          :key="`peer-${index}`"
          v-bind="peer"
        />
        <ShowMore
          v-if="this.related.peers.length > this.initiallyShown"
          buttonText="Show More"
          alternateButtonText="Show Less"
          class="reporting-structure__show-more"
          buttonClass="button button--text-only button--less-padding reporting-structure__show-more-button"
          :transition="true"
        >
          <template slot="overflow">
            <Person
              v-for="(peer, index) in this.related.peers.slice(
                this.initiallyShown,
              )"
              :class="peersView"
              :key="`peer-${index}`"
              v-bind="peer"
            />
          </template>
          <template slot="icon-expanded">
            <Icon id="chevron-up" :width="24" :height="24" />
          </template>
          <template slot="icon-collapsed">
            <Icon id="chevron-down" :width="24" :height="24" />
          </template>
        </ShowMore>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import Person from '@/components/ui/Person.vue';
import ShowMore from '@/components/_functional/ShowMore.vue';

export default {
  name: 'ReportingStructure',
  props: {
    related: Object,
    loading: false,
    viewAs: {
      type: String,
      default: 'list',
    },
  },
  components: {
    Icon,
    LoadingSpinner,
    Person,
    ShowMore,
  },
  computed: {
    directsView() {
      return this.related.directs.length > 1 && this.viewAs === 'grid'
        ? 'person--borderless person--avatar-only'
        : 'person--borderless';
    },
    peersView() {
      return this.related.peers.length > 1 && this.viewAs === 'grid'
        ? 'person--borderless person--avatar-only'
        : 'person--borderless';
    },
    initiallyShown() {
      return this.viewAs === 'grid' ? undefined : 8;
    },
  },
};
</script>

<style>
.reporting-structure h3 {
  font-weight: 400;
  margin: 1.5em 0 0 1.5em;
  padding: 0;
  width: 6em;
}
.reporting-structure__container {
  display: flex;
  border-top: 1px solid var(--gray-30);
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}

.reporting-structure__container:first-child {
  border-top: none;
  padding-top: 0;
}

.reporting-structure__container.has-more {
  padding-bottom: 0;
}

@media (min-width: 50em) {
  .reporting-structure__reports-to,
  .reporting-structure__manages,
  .reporting-structure__peers {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: 6em 1fr;
  }
  .reporting-structure__manages > div {
    min-width: 0; /* defaults to auto, which allows people's name/title to grow the grid column */
  }
  .reporting-structure__peers > div {
    min-width: 0; /* defaults to auto, which allows people's name/title to grow the grid column */
  }
}
.reporting-structure__show-more {
  max-width: 37.5em;
}
.reporting-structure__show-more-button {
  margin: 1em auto 0.5em auto;
  font-size: 1em;
  color: var(--gray-50);
}
</style>
