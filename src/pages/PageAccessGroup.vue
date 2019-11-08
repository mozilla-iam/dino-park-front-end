<template>
  <main class="access-group">
    <section class="primary-area">
      <section class="primary-area__description">
        <AccessGroupDescription
          :title="groupid"
          :editable="!editing"
        ></AccessGroupDescription>
      </section>
      <aside class="primary-area__control">
        <PanelSection title="Membership Management">
          <template v-slot:content>
            <p>Panel slot</p>
          </template>
        </PanelSection>
        <PanelSection title="Curators">
          <template v-slot:content>
            <p>Panel slot</p>
          </template>
        </PanelSection>
      </aside>
    </section>
    <section class="secondary-area">
      <AccessGroupMembers />
    </section>
  </main>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import PanelSection from '@/components/ui/PanelSection.vue';
import AccessGroupDescription from '@/components/access_group/AccessGroupDescription.vue';
import AccessGroupMembers from '@/components/access_group/AccessGroupMembers.vue';

export default {
  name: 'AccessGroup',
  mixins: [LinksMixin],
  components: {
    Icon,
    LoadingSpinner,
    PanelSection,
    AccessGroupDescription,
    AccessGroupMembers,
  },
  props: {
    groupid: String,
  },
  computed: {
    editing() {
      if (
        this.$route.name === 'Edit Access Group' &&
        this.$route.query.section
      ) {
        return this.$route.query.section;
      }
      return null;
    },
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
    padding-top: 4em;
  }
  .access-group > img {
    float: right;
    margin-left: 8em;
    max-width: 50%;
    margin-bottom: 0;
  }
}

.primary-area {
  display: flex;
  flex-direction: column;
}

.primary-area__description {
  width: 100%;
}

@media (min-width: 57.5em) {
  .primary-area {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .primary-area__description {
    width: 55%;
    margin-right: 5%;
  }

  .primary-area__control {
    display: flex;
    flex-direction: column;
    width: 40%;
  }
}

.secondary-area {
  overflow: visible;
}
</style>
