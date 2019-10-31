<template>
  <main class="access-group">
    <h1>Access Group: {{ groupid }}</h1>
    <PanelSection title="Test">
      <template v-slot:view>
        <p>Panel slot</p>
      </template>
    </PanelSection>
  </main>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import PanelSection from '@/components/ui/PanelSection.vue';

export default {
  name: 'AccessGroup',
  mixins: [LinksMixin],
  components: {
    Icon,
    LoadingSpinner,
    PanelSection,
  },
  props: {
    groupid: String,
  },
};
</script>

<style>
.home {
  padding-top: 2em;
}

.access-group > img {
  margin-bottom: 1em;
}
.access-group h1 {
  margin-bottom: 0;
  font-size: 2.5em;
  line-height: 1.1;
}
.access-group p {
  color: var(--gray-50);
}
.access-group .button {
  display: inline-flex;
  margin-top: 2em;
  margin-bottom: 2em;
}

.access-group .button svg {
  margin-left: 1em;
}
.access-group p:last-child {
  margin-bottom: 0;
}
@media (min-width: 50em) {
  .access-group {
    display: inline-block;
    width: 100%;
    padding: 4em 4em 2em;
  }
  .access-group > img {
    float: right;
    margin-left: 8em;
    max-width: 50%;
    margin-bottom: 0;
  }
}
</style>
