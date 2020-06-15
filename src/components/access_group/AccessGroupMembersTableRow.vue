<template>
  <div
    :class="{
      'members-table__row': true,
      'row-member': true,
      active: expanded,
    }"
  >
    <div class="row-member__main">
      <div class="row-member__item row-member__display">
        <AccessGroupMemberListDisplay
          :member="member"
          :subRowText="subRowTextDisplay"
        />
      </div>
      <div
        v-if="pendingAction"
        class="row-member__item row-member__action-confirm"
      >
        <slot
          :member="member"
          :togglePending="togglePending"
          name="row-confirm"
        ></slot>
      </div>
      <div
        :class="{
          'row-member__item': true,
          alert: isMemberItemOnAlert(column),
          [`row-item-${idx}`]: true,
        }"
        v-for="(column, idx) in getSecondaryColumns(member)"
        :key="idx"
      >
        {{ column.contentHandler(member) }}
      </div>
      <div
        class="row-member__item row-actions-expanded"
        v-if="expanded && !pendingAction"
      >
        <slot
          :member="member"
          :toggleExpand="toggleExpand"
          name="row-actions-expanded"
        ></slot>
      </div>
      <div class="row-member__item row-actions" v-if="!expanded">
        <slot
          :member="member"
          :toggleExpand="toggleExpand"
          name="row-actions"
        ></slot>
      </div>
    </div>
    <div
      v-if="expanded"
      :class="{
        'row-member__expanded': true,
        'content-empty': !hasExpandedContent(member),
      }"
    >
      <div
        class="row-member__expanded-content"
        v-if="hasExpandedContent(member)"
      >
        <slot
          :member="member"
          :toggleExpand="toggleExpand"
          name="row-expandable-content"
        ></slot>
      </div>
      <slot
        :member="member"
        :toggleExpand="toggleExpand"
        name="row-expandable-actions"
      ></slot>
    </div>
  </div>
</template>
<script>
import AccessGroupMemberListDisplay from '@/components/access_group/AccessGroupMemberListDisplay.vue';

export default {
  name: 'AccessGroupMembersTableRow',
  components: { AccessGroupMemberListDisplay },
  props: {
    member: Object,
    columns: Array,
    hasExpandedContent: {
      type: Function,
      default: (member) => false,
    },
  },
  data() {
    return {
      expanded: false,
      pendingAction: false,
    };
  },
  methods: {
    subRowTextDisplay(member) {
      if (!member.added_by?.uuid) {
        return ' ';
      }
      return `${this.fluent('member-list-description__sub')} ${
        member.added_by.displayName
      }`;
    },
    getSecondaryColumns(member) {
      return this.columns.filter((column) => 'contentHandler' in column);
    },
    toggleExpand(status) {
      if (typeof status === 'boolean') {
        this.expanded = status;
      }
    },
    togglePending(status) {
      if (typeof status === 'boolean') {
        this.pendingAction = status;
      }
    },
    isMemberItemOnAlert(column) {
      if (!column.hasOwnProperty('isAlert')) {
        return false;
      }
      return column.isAlert(this.member);
    },
  },
};
</script>
<style scoped>
.members-table__row {
  border: 0.25em solid transparent;
}
.members-table .members-table__body .members-table__row.active {
  border: 0.25em solid var(--blue-60);
  background: var(--lightBlue);
}

.members-table__row .row-member__main {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'header header header header'
    'first second actions actions'
    'footer footer footer footer';
}

@media (min-width: 57.5em) {
  .members-table__row .row-member__main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.25em 0;
  }
}

.members-table__row .row-member__main .row-member__item {
  padding-left: 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.members-table__row .row-member__main .row-member__item.row-item-0 {
  grid-area: first;
}
.members-table__row .row-member__main .row-member__item.row-item-1 {
  grid-area: second;
}

.members-table__row .row-member__main .row-member__item.row-actions,
.members-table__row .row-member__main .row-member__item.row-actions-expanded {
  grid-area: actions;
}

.members-table__row .row-member__main .row-member__item.alert {
  color: var(--neon-red);
}

.members-table__row .row-member__main .row-member__item.row-member__display {
  flex: 1.5;
  grid-area: header;
}

.members-table__row .row-member__main .row-member__action-confirm {
  vertical-align: center;
  text-align: right;
  flex: 3.5;
}

.row-member__action-confirm .leave-confirm__description {
  display: inline-block;
  font-weight: bold;
  margin-right: 1em;
  margin-top: 0;
  margin-bottom: 0;
}

.row-member__action-confirm .button {
  display: inline-block;
  margin: 0 1em;
}

.row-member__action-confirm .button:last-child {
  margin-right: 0;
}
.row-member__expanded {
  padding: 0.5em 0 0;
  margin: 0 0.5em;
}

.row-member__expanded.content-empty {
  border-top: 1px solid var(--gray-40);
  padding-top: 1em;
  margin-top: 1em;
}

.row-member__expanded .row-member__expanded-content {
  margin-bottom: 1em;
  background: var(--white);
  box-shadow: var(--shadowCard);
  border-radius: var(--cardRadius);
  padding: 1em;
}
</style>
