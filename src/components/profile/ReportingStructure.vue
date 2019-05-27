<template>
  <div v-if="this.related.show" class="reporting-structure">
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <div v-if="this.related.manager" class="reporting-structure__reports-to">
      <h3>Reports to:</h3>
      <div>
        <Person modifier="person--borderless" v-bind="this.related.manager" />
      </div>
    </div>
    <div
      v-if="this.related.directs.length > 0"
      class="reporting-structure__manages"
    >
      <h3>Manages:</h3>
      <div>
        <Person
          v-for="(direct, index) in this.related.directs.slice(
            0,
            this.initiallyShown,
          )"
          :modifier="directsView"
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
              :modifier="directsView"
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
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import Person from '@/components/ui/Person.vue';
import Related from '@/assets/js/related';
import ShowMore from '@/components/_functional/ShowMore.vue';

export default {
  name: 'ReportingStructure',
  props: {
    username: String,
    loading: false,
    viewAs: {
      type: String,
      default: 'grid',
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
  },
  watch: {
    username(u) {
      this.update_user(u);
    },
  },
  methods: {
    update_user(u = this.username) {
      this.related.update(u);
    },
  },
  created() {
    this.update_user();
  },
  data() {
    return {
      related: new Related(),
      initiallyShown: 10,
    };
  },
};
</script>

<style>
.reporting-structure h3 {
  font-weight: 400;
}
.reporting-structure__manages {
  margin-left: -1.5em;
  margin-right: -1.5em;
  padding: 0 1.5em;
}
.reporting-structure__reports-to + .reporting-structure__manages {
  margin-top: 2em;
  border-top: 1px solid var(--gray-30);
  padding-top: 1.5em;
}
@media (min-width: 50em) {
  .reporting-structure__reports-to,
  .reporting-structure__manages {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: 6em 1fr;
  }
}
.reporting-structure__show-more {
  max-width: 37.5em;
}
.reporting-structure__show-more-button {
  margin: 0 auto;
  font-size: 1em;
  color: var(--gray-50);
}
</style>
