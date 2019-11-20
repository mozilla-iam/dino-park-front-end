<template>
  <main class="group-edit">
    <a class="button group-edit__back-action" :href="backUrl" @click="handleBackClicked">
      <Icon id="chevron-left" :width="17" :height="17" />Back to group
    </a>
    <section class="edit-container">
      <nav class="edit-container__tabs">
        <ul class="tabs-container">
          <li
            :class="{ 'tab-item': true, active: isActive(tab) }"
            v-for="(tab, idx) in tabs"
            :key="idx"
            @click="handleTabClick(tab)"
          >
            <span class="item__icon">
              <Icon :id="tab.icon" :width="16" :height="16" />
            </span>
            <p class="item__label">{{ tab.label }}</p>
          </li>
        </ul>
      </nav>
      <section class="edit-container__content">
        <AccessGroupInformationEdit />
      </section>
    </section>
  </main>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Button from '@/components/ui/Button.vue';
import AccessGroupInformationEdit from '@/components/access_group/AccessGroupInformationEdit.vue';
import router from '@/router';

export default {
  name: 'AccessGroup',
  components: {
    Icon,
    Button,
    AccessGroupInformationEdit,
  },
  props: {
    groupid: String,
  },
  methods: {
    handleBackClicked() {
      console.log('Back clicked');
    },
    handleTabClick(tab) {
      router.push({
        name: 'Edit Access Group',
        query: {
          section: tab.key,
        },
      });
    },
    isActive(tab) {
      if (!this.$route.query.section) {
        return false;
      }
      return tab.key === this.$route.query.section;
    },
  },
  computed: {
    backUrl() {
      return this.$route.path.substr(0, this.$route.path.lastIndexOf('/'));
    },
  },
  data() {
    return {
      tabs: [
        {
          key: 'information',
          label: 'Information',
          icon: 'info',
        },
        {
          key: 'members',
          label: 'Members',
          icon: 'avatar', // Update this to the right icon
        },
        {
          key: 'invitations',
          label: 'Invitations',
          icon: 'mail',
        },
        {
          key: 'history',
          label: 'History',
          icon: 'zoom', // Update this to the right icon
        },
      ],
    };
  },
};
</script>

<style>
.group-edit {
  margin-top: 2em;
  padding-left: 3em;
  padding-right: 3em;
}
.group-edit .group-edit__back-action {
  background-color: var(--gray-30);
  color: var(--black);
  display: inline-block;
}

.group-edit .edit-container {
  margin-top: 2em;
}

.edit-container__tabs,
.edit-container__content {
  background: var(--white);
  box-shadow: var(--shadowCard);
}

.edit-container__tabs .tabs-container {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: stretch;
  justify-content: space-between;
}

.tab-item {
  display: flex;
  padding: 1em 2em;
  cursor: pointer;
  flex: 1;
  border-bottom: 2px solid transparent;
}

.tab-item.active {
  color: var(--blue-60);
  border-bottom: 2px solid var(--blue-60);
}

.item__icon {
  display: flex;
  align-items: center;
  margin-right: 1em;
}

.edit-container__content {
  margin-top: 1em;
}
</style>
