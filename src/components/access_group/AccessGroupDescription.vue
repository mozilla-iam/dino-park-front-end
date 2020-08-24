<template>
  <article class="description-container">
    <header class="description-container-area description-header">
      <div class="description-container__meta">
        <div class="label-container">
          <p class="label-container__text">
            {{ fluent('access-group_description') }}
          </p>
          <Tooltip
            :buttonText="fluent('access-group_description', 'tooltip-open')"
            :alternateButtonText="
              fluent('access-group_description', 'tooltip-close')
            "
          >
            {{ fluent('access-group_description', 'tooltip') }}
            <a href="#">{{
              fluent('access-group_description', 'tooltip_link')
            }}</a>
          </Tooltip>
        </div>
        <EditButton
          v-if="editable && showEdit"
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
      <h1 class="description-container__title">
        {{ groupInformation.group.name }}
      </h1>
    </header>
    <section v-if="groupInformation.membership.role" class="membership">
      <dl>
        <dt>{{ fluent('access-groups_membership', 'since') }}</dt>
        <dd>{{ date(groupInformation.membership.since) }}</dd>
        <template v-if="groupInformation.membership.expiration">
          <dt>{{ fluent('access-groups_membership', 'expires') }}</dt>
          <dd>
            {{ date(groupInformation.membership.expiration) }}
          </dd>
        </template>
      </dl>
    </section>
    <section class="description-container-area description-content">
      <div class="description-content__main" v-html="descriptionDisplay"></div>
    </section>
    <footer
      class="description-container-area description-footer"
      v-if="isMember"
    >
      <RouterLink
        class="button primary-action"
        :to="{
          name: 'Access Group Confirm Leave',
        }"
        >{{ fluent('access-group_leave') }}</RouterLink
      >
    </footer>
    <footer
      class="description-container-area description-footer"
      v-else-if="showRequest"
    >
      <button
        v-if="showCancelRequest"
        @click="cancel"
        class="button primary-action"
      >
        {{ fluent('access-group_request-cancel') }}
      </button>
      <button v-else @click="request" class="button primary-action">
        {{ fluent('access-group_request') }}
      </button>
    </footer>
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditButton from '@/components/ui/EditButton.vue';
import Button from '@/components/ui/Button.vue';
import Icon from '@/components/ui/Icon.vue';
import Tooltip from '@/components/ui/Tooltip.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import { parseMarkdown } from '@/assets/js/component-utils';

export default {
  name: 'AccessGroupDescription',
  components: { EditButton, Button, Icon, Tooltip },
  mixins: [LinksMixin],
  props: {
    editable: {
      type: Boolean,
      default: true,
    },
    groupInformation: Object,
  },

  computed: {
    ...mapGetters({
      // TODO: Remove this
      userRequest: 'userV2/getRequestByName',
    }),
    isCurator() {
      return this.groupInformation.isCurator;
    },
    isMember() {
      return this.groupInformation.isMember;
    },
    membersCountText() {
      return this.groupInformation.memberCount === 1
        ? '1 member'
        : `${this.groupInformation.memberCount} members`;
    },
    descriptionDisplay() {
      return parseMarkdown(this.groupInformation.group.description);
    },
    showEdit() {
      return this.isCurator;
    },
    showLeave() {
      return this.isMember;
    },
    showRequest() {
      return this.groupInformation.group.type === 'Reviewed';
    },
    showCancelRequest() {
      return this.userRequest(this.groupInformation.group.name);
    },
  },
  methods: {
    ...mapActions({
      requestInvitation: 'userV2/requestInvitation',
      cancelRequest: 'userV2/cancelRequest',
    }),
    request() {
      this.requestInvitation({ groupName: this.groupInformation.group.name });
    },
    cancel() {
      this.cancelRequest({ groupName: this.groupInformation.group.name });
    },
    date(d) {
      return new Date(d).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  data() {
    return {
      section: 'information',
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

.label-container .tooltip {
  color: var(--gray-50);
  display: flex;
}

.label-container .tooltip .button {
  margin-top: 0;
  margin-bottom: 0;
}

.label-container .tooltip svg {
  display: inline-block;
  vertical-align: middle;
}

.description-container .description-container__title {
  margin-top: 0.25em;
  font-size: 2.5em;
  word-break: break-all;
}

.description-content .description-content__sub {
  font-size: 1em;
}

.description-content .description-content__main {
  font-size: 1em;
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

.description-content .privilege-container .privilege-toggle-action {
  background: var(--white);
  color: var(--gray-60);
  padding-left: 0;
  margin-top: 1em;
  margin-bottom: 0;
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
  flex-wrap: wrap-reverse;
}

.description-container .description-footer > .button {
  margin-top: 0;
  margin-bottom: 0;
  align-self: flex-start;
}

.membership {
  color: var(--gray-50);
  margin-right: auto;
  padding: 1em 1.5em 0.5em 1.5em;
  width: max-content;
}

.membership dl {
  margin: auto;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 1em;
}

.membership dt::after {
  content: ': ';
}

.membership dd {
  margin-left: 0;
}
</style>
