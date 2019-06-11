<template>
  <div v-if="this.related.show" class="reporting-structure">
    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <div v-if="this.related.manager" class="reporting-structure__reports-to">
      <h3>Reports to:</h3>
      <div>
        <Person class="person--borderless" v-bind="this.related.manager" />
      </div>
    </div>
    <div
      v-if="this.related.directs.length > 0"
      class="reporting-structure__manages"
    >
      <h3>Manages:</h3>
      <div
        ref="gridContainer"
        :class="
          'reporting-structure__directs' +
            (viewAs === 'grid' ? ' reporting-structure__directs--grid' : '') +
            (managesExpanded
              ? ' reporting-structure__directs--grid-expanded'
              : '') +
            (managesExpandable
              ? ' reporting-structure__directs--expandable'
              : '')
        "
      >
        <div ref="grid" class="reporting-structure__directs-list">
          <Person
            v-for="(direct, index) in this.related.directs"
            :class="directsView"
            :key="`direct-${index}`"
            v-bind="direct"
          />
          <button
            type="button"
            class="button button--text-only button--less-padding"
            v-if="managesExpandable"
            @click="managesExpanded = !managesExpanded"
          >
            <template v-if="managesExpanded">
              <Icon id="chevron-up" :width="24" :height="24" />
              Show less
            </template>
            <template v-else>
              <Icon id="chevron-down" :width="24" :height="24" />
              Show more
            </template>
          </button>
        </div>
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
  mounted() {
    window.setTimeout(() => {
      const { grid, gridContainer } = this.$refs;

      if (
        grid &&
        gridContainer &&
        grid.clientHeight > gridContainer.clientHeight
      ) {
        this.managesExpandable = true;
      }
    }, 700);
  },
  data() {
    return {
      related: new Related(),
      managesExpanded: false,
      managesExpandable: false,
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
.reporting-structure__directs {
  min-width: 0;
}
.reporting-structure__directs--grid {
  max-height: 3em;
  overflow: hidden;
}
.reporting-structure__directs--grid .person--avatar-only {
  margin: 0;
}
.reporting-structure__directs--grid-expanded {
  max-height: none;
  overflow: visible;
}
.reporting-structure__directs--expandable {
  margin-bottom: 2em;
}
.reporting-structure__directs--grid .reporting-structure__directs-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 3em);
  justify-content: space-between;
  grid-gap: 1.4em; /* ~ 20px */
}
.reporting-structure__directs--grid button {
  position: absolute;
  bottom: 0;
  width: calc(100% - 3.5em);
}
@media (min-width: 57.5em) {
  .reporting-structure__directs--grid button {
    left: 10.5em;
    right: 0;
    width: calc(100% - 12.5em);
  }
}
</style>
