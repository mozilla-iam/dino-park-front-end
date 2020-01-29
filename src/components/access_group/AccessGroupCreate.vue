<template>
  <main class="group-create">
    <Button class="button group-create__back-action" @click="handleBackClicked">
      <Icon id="chevron-left" :width="17" :height="17" />Back
    </Button>
    <section class="primary-area">
      <h1>Create Access Group</h1>
      <AccessGroupEditPanel class="details-container" title="Group details">
        <template v-slot:content>
          <div class="content-area__row">
            <label class="content-area__label">Group name</label>
            <TextInput
              type="text"
              v-model="groupName"
              :maxlength="50"
              class="content-area__value"
            />
          </div>
          <div class="content-area__row multi-line">
            <label class="content-area__label">Group description</label>
            <TextArea
              :rows="5"
              :maxlength="5000"
              v-model="groupDescription"
              class="content-area__value"
            ></TextArea>
            <p class="content-area__value-description">
              Use
              <a href="#">Markdown</a> for bold, italics, lists, and links.
            </p>
          </div>
        </template>
      </AccessGroupEditPanel>
      <!-- <AccessGroupEditPanel title="Group type">
        <template v-slot:content>
          <div class="content-area__row">
            <div
              class="radio-control"
              v-for="(type, idx) in groupTypes"
              :key="idx"
            >
              <input type="radio" :value="type" v-model="groupType" />
              {{ type }}
            </div>
          </div>
          <div class="content-area__row radio-control__description">
            <label class="description-label">Reviewed</label>
            <p class="description-content">
              When a group is set to "Reviewed", Mozillians are presented with a
              "Request to Join" button on the group page. Once clicked, Group
              Curators will receive a pending rquest notification, prompting
              them to review and accept or deny the membership. Group Curators
              can invite and/or remove people from the group if needed.
            </p>
          </div>
          <div class="content-area__row radio-control__description">
            <label class="description-label">Closed</label>
            <p class="description-content">
              "Closed" groups provide more tight control over a group.
              Mozillians cannot request membership, and can only be invited to
              join the group by Group Curators. Group Curators can, of course,
              remove people from the group if needed. Avoid using this group
              type unless you are absolutely sure it is necessary.
            </p>
          </div>
        </template>
      </AccessGroupEditPanel>-->
      <footer class="group-create__footer">
        <Button
          class="button--primary"
          @click="handleCreateClicked"
          :disabled="!createEnabled"
          >Create Access Group</Button
        >
        <Button
          class="button button--secondary button--action"
          @click="handleBackClicked"
          >Leave</Button
        >
      </footer>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'vuex';
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';
import { ACCESS_GROUP_PAGE } from '@/router.js';
import {
  TYPE_INDEX,
  ACCESS_GROUP_TYPES,
} from '@/view_models/AccessGroupViewModel.js';

export default {
  name: 'AccessGroupInformationEdit',
  components: { TextInput, TextArea, Button, Icon, AccessGroupEditPanel },
  props: [],
  mounted() {},
  data() {
    return {
      groupDescription: '',
      groupType: ACCESS_GROUP_TYPES[TYPE_INDEX.closed],
      groupName: '',
    };
  },
  computed: {
    createEnabled() {
      return this.groupName.length > 0;
    },
    groupTypes() {
      return ACCESS_GROUP_TYPES.filter(type => type !== 'Open');
    },
  },
  methods: {
    ...mapActions({
      createGroup: 'accessGroup/createGroup',
    }),
    handleCreateClicked() {
      this.createGroup({
        name: this.groupName,
        type: this.groupType,
        description: this.groupDescription,
      }).then(() => {
        this.$root.$emit('toast', {
          content: `Access Group ${this.groupName} created`,
        });
        this.$router.push({
          name: ACCESS_GROUP_PAGE,
          params: {
            groupname: this.groupName,
          },
        });
      });
    },
    handleBackClicked() {
      this.$router.go(-1);
      return;
    },
  },
};
</script>

<style>
.group-create .group-create__back-action {
  background-color: var(--gray-30);
  color: var(--black);
  margin-bottom: 2em;
}

.group-create h1 {
  margin: 0.5em 1.5rem 0;
  line-height: 1.1;
}

.group-create .primary-area {
  background: var(--white);
  box-shadow: var(--shadowCard);
  margin: 0 0 2em;
  position: relative;
}
.primary-area .details-container {
  margin-top: 0;
}

.content-area__row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 2em 0;
  align-items: center;
}

.content-area__row .radio-control {
  margin: 0 1em 0 0;
  color: var(--gray-40);
}

.content-area__row .radio-control > input {
  margin: 0 0.5em 0 0;
}

.content-area__row.action-row {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.content-area__row.radio-control__description {
  flex-direction: column;
  align-items: flex-start;
}

.radio-control__description .description-label {
  font-weight: bold;
  margin-bottom: 0.5em;
}

.radio-control__description .description-content {
  margin: 0;
}

.content-area__row.multi-line {
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
}

.content-area .content-area__label {
  flex: 1;
  color: var(--gray-40);
  height: 1.5em;
}

.content-area .content-area__value {
  width: 70%;
}

.content-area p.content-area__value {
  color: var(--gray-40);
}
.content-area .content-area__row.multi-line .content-area__value {
  width: 100%;
  margin-top: 1em;
}

.content-area .content-area__value-description {
  color: var(--gray-40);
}

.group-create .group-create__footer {
  display: flex;
  width: 70%;
  flex-direction: row-reverse;
  border-top: 1px solid var(--gray-40);
  margin: 1em 0 2em 2em;
}

.group-create__footer .button {
  margin-top: 2em;
  margin-left: 1em;
}
</style>
