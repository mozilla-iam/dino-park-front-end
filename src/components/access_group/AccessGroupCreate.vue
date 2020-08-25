<template>
  <section class="group-create-container">
    <main class="group-create">
      <RouterLink
        class="button group-create__back-action"
        :to="{ name: accessGroupListRoute }"
      >
        <Icon id="chevron-left" :width="17" :height="17" />
        {{ fluent('access-group_create', 'group-create__back-action') }}
      </RouterLink>
      <form
        class="primary-area"
        novalidate
        v-on:submit.prevent="handleCreateClicked"
        ref="createGroupForm"
      >
        <h1>{{ fluent('access-group_create') }}</h1>
        <AccessGroupEditPanel
          class="details-container"
          :title="fluent('access-group_details')"
        >
          <template v-slot:content>
            <div class="content-area__row">
              <label class="content-area__label">{{
                fluent('access-group_details', 'name')
              }}</label>
              <TextInput
                type="text"
                v-model="groupName"
                :maxlength="60"
                class="content-area__value"
                :pattern="groupNamePattern"
                :required="true"
                :highlightError="highlightError"
                :infoMsg="fluent('ag_api_errors', 'invalid_group_name')"
              />
            </div>
            <div class="content-area__row multi-line markdown-outer-container">
              <label class="content-area__label">{{
                fluent('access-group_details', 'description')
              }}</label>
              <TextArea
                :rows="5"
                :maxlength="1024"
                v-model="groupDescription"
                class="content-area__value"
              ></TextArea>
              <AccessGroupMarkdownGuide />
            </div>
          </template>
        </AccessGroupEditPanel>
        <AccessGroupEditPanel
          :title="fluent('access-group_type')"
          v-if="getFeature('editGroupType')"
        >
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
              <label class="description-label">{{
                fluent('access-group_type', 'reviewed-heading')
              }}</label>
              <p class="description-content">
                {{ fluent('access-group_type', 'reviewed-content') }}
              </p>
            </div>
            <div class="content-area__row radio-control__description">
              <label class="description-label">{{
                fluent('access-group_type', 'closed-heading')
              }}</label>
              <p class="description-content">
                {{ fluent('access-group_type', 'closed-content') }}
              </p>
            </div>
          </template>
        </AccessGroupEditPanel>
        <AccessGroupEditPanel :title="fluent('access-group_expiration')">
          <template v-slot:content>
            <div class="content-area__row group-expiration">
              <label class="description-label">
                {{
                  fluent('access-group_expiration', 'expiration__description')
                }}
              </label>
              <ExpirationSelect
                v-model="selectedExpiration"
                :highlightError="highlightError"
              />
              <aside class="container-info">
                <Icon
                  id="info"
                  class="container-info__icon"
                  :width="24"
                  :height="24"
                />
                <p class="container-info__description">
                  <Fluent id="access-group_expiration" attr="create-info" />
                </p>
              </aside>
            </div>
          </template>
        </AccessGroupEditPanel>
        <AccessGroupEditPanel :title="fluent('access-group_terms')">
          <template v-slot:content>
            <div class="content-area__row">
              <div class="radio-control">
                <input
                  id="tos"
                  type="checkbox"
                  v-model="groupTermsRequiredData"
                />
                <label id="tos-label" for="tos">{{
                  fluent('access-group_terms', 'terms-required')
                }}</label>
              </div>
            </div>
            <div
              :class="{
                'content-area__row': true,
                'multi-line': true,
                'markdown-outer-container': true,
                expanded: !lastMarkdownCollapsed,
              }"
              v-if="groupTermsRequiredData"
            >
              <label class="content-area__label">{{
                fluent('access-group_terms', 'terms-intro')
              }}</label>
              <TextArea
                :rows="5"
                :maxlength="5000"
                v-model="groupTermsData"
                class="content-area__value"
              ></TextArea>
              <AccessGroupMarkdownGuide
                :isCollapsed="true"
                v-on:collapse-toggled="onLastCollapseToggled"
              />
            </div>
          </template>
        </AccessGroupEditPanel>
        <footer class="group-create__footer">
          <button class="button button--primary" type="submit">
            {{ fluent('access-group_create', 'create-action') }}
          </button>
          <Button
            class="button button--secondary button--action"
            @click="handleBackClicked"
            >{{ fluent('access-group_create', 'cancel-action') }}</Button
          >
        </footer>
        <LoadingSpinner v-if="loading"></LoadingSpinner>
      </form>
    </main>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TextInput from '@/components/ui/TextInput.vue';
import TextArea from '@/components/ui/TextArea.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import ExpirationSelect from '@/components/ui/ExpirationSelect.vue';
import AccessGroupEditPanel from '@/components/access_group/AccessGroupEditPanel.vue';
import AccessGroupMarkdownGuide from '@/components/access_group/AccessGroupMarkdownGuide.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import { ACCESS_GROUP_PAGE, ACCESS_GROUP_INDEX_PAGE } from '@/router.js';
import {
  TYPE_INDEX,
  ACCESS_GROUP_TYPES,
  MEMBER_EXPIRATION_ONE_YEAR,
} from '@/view_models/AccessGroupViewModel.js';
import { Api } from '@/assets/js/access-groups-api';

const accessGroupApi = new Api();
export default {
  name: 'AccessGroupInformationEdit',
  components: {
    TextInput,
    TextArea,
    Button,
    Icon,
    ExpirationSelect,
    AccessGroupEditPanel,
    AccessGroupMarkdownGuide,
    LoadingSpinner,
  },
  data() {
    return {
      highlightError: false,
      groupNamePattern: '[a-z0-9\\-_]*',
      groupDescription: '',
      groupType: ACCESS_GROUP_TYPES[TYPE_INDEX.closed],
      groupName: '',
      groupTermsRequiredData: false,
      groupTermsData: '',
      selectedExpiration: MEMBER_EXPIRATION_ONE_YEAR,
      lastMarkdownCollapsed: true,
      accessGroupListRoute: ACCESS_GROUP_INDEX_PAGE,
    };
  },
  computed: {
    ...mapGetters({
      loading: 'getLoading',
    }),
    groupTypes() {
      return ACCESS_GROUP_TYPES.filter((type) => type !== 'Open');
    },
  },
  methods: {
    ...mapActions({
      setLoading: 'setLoading',
      completeLoading: 'completeLoading',
    }),
    async handleCreateClicked(ev) {
      this.groupNamePattern = '[a-z0-9\\-_]{3,}';
      this.highlightError = true;
      await this.$nextTick();
      const form = ev.target;
      if (!form.checkValidity()) {
        ev.preventDefault();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        try {
          this.setLoading();
          await accessGroupApi.execute({
            path: 'group/post',
            dataArguments: {
              name: this.groupName,
              type: this.groupType,
              description: this.groupDescription,
              group_expiration: this.selectedExpiration,
            },
          });
          this.completeLoading();
          this.tinyNotification('access-group-created', this.groupName);
          this.$router.push({
            name: ACCESS_GROUP_PAGE,
            params: {
              groupname: this.groupName,
            },
          });
        } catch (e) {
          this.$root.$emit('toast', {
            content: this.fluent('ag_api_errors', e.message),
          });
        }
      }
    },
    handleBackClicked() {
      this.$router.go(-1);
    },
    onLastCollapseToggled(toggleValue) {
      this.lastMarkdownCollapsed = toggleValue;
    },
  },
};
</script>

<style scoped>
.group-create .edit-panel-container {
  padding: 2em 0 1em;
  margin-left: 2em;
  margin-right: 2em;
}

@media (min-width: 57.5em) {
  .group-create .edit-panel-container {
    width: 65%;
  }
}

.group-create .group-create__back-action {
  background-color: var(--gray-30);
  color: var(--black);
  margin-bottom: 2em;
  display: inline-flex;
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
  overflow: auto;
  widows: 100%;
}
.primary-area .details-container {
  margin-top: 0;
}

.content-area__row.markdown-outer-container .markdown-guide-container {
  width: 100%;
}

@media (min-width: 57.5em) {
  .content-area__row.markdown-outer-container .markdown-guide-container {
    position: absolute;
    left: calc(100% + 1em);
    top: 2.9em;
    width: 20.5em;
  }
}

.content-area .content-area__row {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 2em 0;
  align-items: flex-start;
  justify-content: flex-start;
}

.content-area .content-area__row.expanded {
  height: 30em;
}

.content-area__row.group-expiration {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.content-area__row.group-expiration .description-label {
  color: var(--gray-50);
  margin-bottom: 1em;
}

.group-create .content-area__row.group-expiration .expiration-select {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 2.5em;
}

@media (min-width: 57.5em) {
  .group-create .content-area__row.group-expiration .expiration-select {
    flex-direction: row;
    padding-left: 0;
  }
}

.group-create
  .content-area__row.group-expiration
  .expiration-select
  >>> .expiration-select__option {
  margin: 1em 0;
}

.group-create
  .content-area__row.group-expiration
  .expiration-select
  >>> .expiration-select__option:first-child {
  margin-left: 0;
}

@media (min-width: 57.5em) {
  .group-create
    .content-area__row.group-expiration
    .expiration-select
    >>> .expiration-select__option {
    flex: none;
    margin: 1em;
  }

  .group-create
    .content-area__row.group-expiration
    .expiration-select
    >>> .expiration-select__option:first-child {
    margin-left: 0;
  }
}

.group-expiration .container-info {
  margin-top: 1em;
  display: flex;
  align-items: flex-start;
}

.container-info .container-info__icon {
  width: 5em;
  margin-right: 1em;
  margin-top: 2em;
}

@media (min-width: 57.5em) {
  .group-expiration .container-info {
    margin-top: 1em;
  }

  .container-info .container-info__icon {
    margin-top: 1.5em;
  }
}

.content-area__row.action-row {
  flex-direction: column;
  text-align: left;
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

.content-area .content-area__label {
  flex: 1;
  color: var(--gray-50);
  height: 1.5em;
  margin-bottom: 1em;
}

.content-area .content-area__value {
  width: 100%;
  position: relative;
}

.content-area p.content-area__value {
  color: var(--gray-50);
}
.content-area .content-area__row.multi-line {
  display: block;
}

.content-area .content-area__row.multi-line .content-area__label {
  width: 100%;
  margin-bottom: 1em;
  display: block;
}

.content-area .content-area__row.multi-line .content-area__value {
  width: 100%;
  flex: 10;
  margin-top: 0;
  display: block;
}

.content-area .content-area__value-description {
  color: var(--gray-50);
  flex: 10;
}

.group-create .group-create__footer {
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid var(--gray-50);
  margin: 1em 2em 2em 2em;
}

@media (min-width: 57.5em) {
  .group-create .group-create__footer {
    width: 65%;
    margin: 1em 0 2em 2em;
  }
}

.group-create__footer .button {
  margin-top: 2em;
  margin-left: 1em;
}

.primary-area > .loading {
  position: absolute;
  z-index: var(--layerOne);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-direction: row;
}

#tos-label {
  padding-left: 1em;
}
</style>
