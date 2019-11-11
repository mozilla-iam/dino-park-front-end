<template>
  <article class="description-container">
    <header class="description-container-area description-header">
      <div class="description-container__meta">
        <div class="label-container">
          <p class="label-container__text">Access Group</p>
          <span class="label-container__icon">
            <Icon id="info" :width="16" :height="16" />
          </span>
        </div>
        <EditButton
          v-if="editable"
          :sendTo="{
            name: 'Edit Access Group',
            query: {
              section,
            },
          }"
          :section="section"
          :sectionId="section"
        ></EditButton>
      </div>
      <h1 class="description-container__title">{{ title }}</h1>
    </header>
    <section class="description-container-area description-content">
      <p class="description-content__sub">{{ membersCountText }}</p>
      <p class="description-content__main">{{ model.group.description }}</p>
      <ul class="description-content__link-list">
        <li
          class="link-list__item"
          v-for="(link, idx) in linksDisplay"
          :key="idx"
        >
          <span class="item-icon">
            <Icon :id="link.icon" :width="16" :height="16" />
          </span>
          <p class="item-text">{{ link.label }}</p>
          <a target="_blank" :href="link.url" class="item-url">{{
            link.url
          }}</a>
        </li>
      </ul>
      <a href="#" class="description-content__tos-link">Terms of service</a>
      <aside class="privilege-container">
        <Button
          class="privilege-toggle-action"
          v-on:click="handleShowPrivilegeHistoryClicked"
          v-if="!privilegeHistoryVisible"
        >
          <Icon id="chevron-down" :width="16" :height="16"></Icon>Show Privilege
          History
        </Button>
        <table
          class="privilege-container__display"
          v-if="privilegeHistoryVisible"
        >
          <thead>
            <tr>
              <td class="label-cell">Privilege</td>
              <td>Date Added</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, idx) in model.group.history" :key="idx">
              <td class="label-cell">{{ event.privilege }}</td>
              <td>{{ formatDate(event.date_added) }}</td>
            </tr>
          </tbody>
        </table>
        <Button
          class="privilege-toggle-action hide"
          v-on:click="handleHidePrivilegeHistoryClicked"
          v-if="privilegeHistoryVisible"
        >
          <Icon id="chevron-up" :width="16" :height="16"></Icon>Hide Privilege
          History
        </Button>
      </aside>
    </section>
    <footer class="description-container-area description-footer">
      <Button class="primary-action" v-on:click="handleLeaveClick"
        >Leave</Button
      >
    </footer>
  </article>
</template>

<script>
import EditButton from '@/components/ui/EditButton.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import { link } from 'fs';

const linkSources = {
  discourse: {
    icon: 'discourse',
    label: 'Discourse',
  },
  website: {
    icon: 'world',
    label: 'Website',
  },
  wiki: {
    icon: 'info',
    label: 'Wiki',
  },
  slack: {
    icon: 'slack',
    label: 'Slack',
  },
  other: {
    icon: 'world',
    label: 'Other',
  },
};
export default {
  name: 'AccessGroupDescription',
  components: { EditButton, Button, Icon },
  props: {
    title: String,
    editable: {
      type: Boolean,
      default: true,
    },
    model: Object,
  },
  methods: {
    handleLeaveClick() {
      console.log('Leave clicked');
    },
    handleShowPrivilegeHistoryClicked() {
      this.privilegeHistoryVisible = true;
    },
    handleHidePrivilegeHistoryClicked() {
      this.privilegeHistoryVisible = false;
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US');
    },
  },
  computed: {
    membersCountText() {
      let fullText = '';
      if (this.model.member_count === 1) {
        fullText += '1 member';
      } else {
        fullText += `${this.model.member_count} members`;
      }
      if (this.model.visible_member_count !== this.model.member_count) {
        fullText += ` (${this.model.visible_member_count} viewable by you)`;
      }
      return fullText;
    },
    linksDisplay() {
      if (!this.model.group.links.length) {
        return [];
      }
      return this.model.group.links.reduce((acc, curr) => {
        if (!(curr.type in linkSources)) {
          return;
        }
        acc.push({
          icon: linkSources[curr.type].icon,
          label: linkSources[curr.type].label,
          url: curr.value,
        });
        return acc;
      }, []);
    },
  },
  data() {
    return {
      section: 'description',
      privilegeHistoryVisible: false,
    };
  },
};
</script>

<style>
.description-container {
  background: var(--white);
  box-shadow: var(--shadowCard);
  margin: 0 0 2em;
  position: relative;
}

.description-container__meta {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.description-container__meta .edit-button {
  text-align: right;
}

.description-container-area {
  padding: 1.5em;
}

.description-header {
  padding-bottom: 0;
}

.description-content {
  padding-top: 0;
}

.label-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.label-container .label-container__text {
  margin: 0;
  margin-right: 0.5em;
  text-transform: uppercase;
  color: var(--black);
}

.label-container .label-container__icon {
  color: var(--gray-50);
  display: flex;
}

.label-container .label-container__icon svg {
  display: inline-block;
  vertical-align: middle;
}

.description-container .description-container__title {
  margin-top: 0.25em;
  font-size: 3.5em;
}

.description-content .description-content__sub {
  font-size: 1.25em;
}

.description-content .description-content__main {
  font-size: 1.25em;
  color: var(--black);
}

.description-content__link-list {
  margin: 0;
  padding: 0;
}

.description-content__link-list .link-list__item {
  display: flex;
  flex-direction: row;
}

.link-list__item .item-text {
  margin: 0;
}

.link-list__item .item-icon,
.link-list__item .item-text,
.link-list__item .item-url {
  margin: 0.25em 0;
}

.link-list__item .item-icon,
.link-list__item .item-text {
  margin-right: 0.5em;
}
.link-list__item .item-url {
  text-decoration: underline;
}

.description-content .description-content__tos-link {
  margin-top: 1em;
  display: block;
}

.privilege-container__display {
  width: 100%;
  border-spacing: 0 0.5em;
  border-top: 2px solid var(--gray-20);
  border-bottom: 2px solid var(--gray-20);
  margin: 1.5em 0;
  padding: 1em 0;
  color: var(--gray-60);
}

.privilege-container__display thead td {
  text-transform: uppercase;
  font-size: 1em;
}

.privilege-container .privilege-toggle-action {
  background: var(--white);
  color: var(--gray-60);
  padding-left: 0;
}

.privilege-container .privilege-toggle-action.hide {
  margin: 0;
}

.privilege-container .privilege-toggle-action:hover {
  border: 1px solid transparent;
}

.description-container .description-footer {
  border-top: 2px solid var(--gray-20);
  display: flex;
  flex-flow: row-reverse;
}

.description-container .description-footer > .button {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
