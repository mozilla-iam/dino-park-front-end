<template>
  <aside class="preview-as">
    <Button v-if="viewAsActive" class="preview-as__button" @click="deactivate">
      <Icon id="chevron-left" :width="17" :height="17"></Icon>Back
    </Button>
    <div v-if="viewAsActive" class="preview-as__select-container">
      <span>Previewing profile as</span>
      <Select
        class="privacy-select privacy-select--blue privacy-select--large"
        :label="'Preview Profile As'"
        :id="'preview-profile-selection'"
        v-model="viewAs"
        :options="viewAsOptions"
        :expanededShowIcon="true"
        :collapsedShowIcon="true"
        @input="$emit('input', $event)"
      />
    </div>
    <Button
      v-else
      @click="activate"
      class="preview-as__button preview-as__activate-button"
    >
      <Icon id="eye" :width="17" :height="17"></Icon>
      <span>Preview As</span>
      <Icon id="chevron-right" :width="17" :height="17"></Icon>
    </Button>
  </aside>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import Select from '@/components/ui/Select.vue';

const PERMISSIONS = {
  private: 'PRIVATE',
  staff: 'STAFF',
  ndaed: 'NDAED',
  authenticated: 'AUTHENTICATED',
  public: 'PUBLIC',
};

export default {
  name: 'PreviewAs',
  components: { Select, Button, Icon },
  props: {
    viewAsFilter: Object,
    viewAsActive: Boolean,
  },
  methods: {
    activate() {
      this.viewAs = this.$route.query.pa || PERMISSIONS.private;
      this.updateFilter();
    },

    deactivate() {
      this.viewAs = null;
    },
    updateFilter() {
      if (this.viewAs) {
        this.$router.push({ query: { pa: this.viewAs } });
      } else {
        const rQuery = Object.assign({}, this.$route.query);
        if ('pa' in rQuery) {
          delete rQuery.pa;
        }
        this.$router.push({ query: rQuery });
      }
      this.viewAsFilter.filter = this.viewAs;
    },
  },
  destroyed() {
    this.deactivate();
  },
  watch: {
    viewAs() {
      this.updateFilter();
    },
  },
  data() {
    this.viewAsFilter.filter = this.$route.query.pa || PERMISSIONS.private;
    return {
      viewAs: this.viewAsFilter.filter,
      viewAsOptions: [
        { label: 'Myself', value: PERMISSIONS.private, icon: 'avatar' },
        { label: 'Staff', value: PERMISSIONS.staff, icon: 'staff' },
        { label: "Ndae'd", value: PERMISSIONS.ndaed, icon: 'triangle' },
        { label: 'Registered', value: PERMISSIONS.authenticated, icon: 'lock' },
        { label: 'Public', value: PERMISSIONS.public, icon: 'world' },
      ],
    };
  },
};
</script>

<style>
.preview-as {
  display: flex;
  flex-wrap: wrap;
  padding: 2em 1em 0em 1em;
  justify-content: space-between;
}
@media (min-width: 57.5em) {
  .preview-as {
    padding: 2em 3em 0em 3em;
  }
}
.preview-as__button {
  background-color: var(--gray-30);
  color: var(--black);
}
.preview-as__button:hover {
  background-color: var(--gray-30);
  color: var(--black);
  border-color: var(--black);
}
.preview-as__select-container {
  border-radius: 2.5em;
  background-color: var(--white);
}
.preview-as__select-container > span {
  display: none;
}
@media (min-width: 35em) {
  .preview-as__select-container > span {
    display: inline;
    padding-right: 1em;
    padding-left: 1em;
  }
}
.preview-as__activate-button {
  margin-left: auto;
  padding-left: 1em;
  padding-right: 0.5em;
}
.preview-as__activate-button > span {
  padding-left: 1em;
  padding-right: 1em;
}
</style>
