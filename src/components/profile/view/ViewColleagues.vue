<template>
  <div class="colleagues">
    <header class="profile__section-header">
      <h2>Colleagues</h2>
      <div v-if="canShowColleaguesToggle" class="colleagues__toggle">
        <button
          type="button"
          @click="setPreference('list')"
          :class="
            'colleagues__toggle-button' +
              (viewPreference === 'list'
                ? ' colleagues__toggle-button--current'
                : '')
          "
        >
          <Icon id="list" :width="18" :height="18" />
          <span class="visually-hidden">List</span>
        </button>
        <button
          type="button"
          @click="setPreference('grid')"
          :class="
            'colleagues__toggle-button' +
              (viewPreference === 'grid'
                ? ' colleagues__toggle-button--current'
                : '')
          "
        >
          <Icon id="grid" :width="18" :height="18" />
          <span class="visually-hidden">View as grid</span>
        </button>
      </div>
      <RouterLink
        :to="{
          name: 'OrgchartHighlight',
          params: { username },
        }"
        class="button button--secondary button--small"
      >
        <Icon id="org-chart" :width="16" :height="16" />Org Chart
        <Icon id="chevron-right" :width="18" :height="18" />
      </RouterLink>
    </header>
    <ReportingStructure
      :related="related"
      :viewAs="viewPreference"
    ></ReportingStructure>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Related from '@/assets/js/related';
import ReportingStructure from '@/components/profile/ReportingStructure.vue';

export default {
  name: 'ViewRelations',
  props: {
    username: String,
  },
  components: {
    Icon,
    ReportingStructure,
  },
  methods: {
    setPreference(preference) {
      this.$store.commit('setPersonViewPreference', preference);
    },
    update_user(u = this.username) {
      this.related.update(u);
    },
  },
  computed: {
    viewPreference() {
      return this.$store.state.personViewPreference;
    },
    canShowColleaguesToggle() {
      return this.related.directs.length > 1 || this.related.peers.length > 1;
    },
  },
  watch: {
    username(u) {
      this.update_user(u);
    },
  },
  created() {
    this.update_user();
  },
  data() {
    return {
      related: new Related(),
    };
  },
};
</script>

<style>
.colleagues__toggle-button {
  background-color: var(--white);
  color: var(--black);
  padding: 0.25em 0.4em;
  border: 2px solid var(--gray-20);
  font-size: inherit;
  line-height: 1;
  width: 2.25em;
  height: 2.25em;
  margin-left: -2px;
  display: inline-flex;
  align-items: center;
  position: relative;
}
.colleagues__toggle-button:first-child {
  border-top-left-radius: var(--imageRadius);
  border-bottom-left-radius: var(--imageRadius);
  margin-left: 0;
}
.colleagues__toggle-button:last-child {
  border-top-right-radius: var(--imageRadius);
  border-bottom-right-radius: var(--imageRadius);
}
.colleagues__toggle-button:not(.colleagues__toggle-button--current):hover {
  background-color: var(--gray-20);
}
.colleagues__toggle-button:focus {
  position: relative;
  z-index: var(--layerOne);
}
.colleagues__toggle-button--current {
  background-color: var(--gray-20);
}
</style>
