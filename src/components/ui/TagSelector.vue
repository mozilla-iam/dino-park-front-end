<template>
  <div class="tag-selector-container">
    <div class="tag-selector">
      <div
        class="tag-container"
        v-for="(tag, idx) in tagsDisplay"
        :key="idx"
        v-on:keyup.delete="tagActionClicked(idx)"
        :aria-label="canBeRemoved(tag) ? 'Remove this tag' : ''"
        :aria-disabled="!canBeRemoved(tag)"
        :aria-role="canBeRemoved(tag) ? 'button' : ''"
        tabindex="0"
      >
        <p class="tag-container__text" v-if="getLabel">{{ getLabel(tag) }}</p>
        <p class="tag-container__text" v-else>{{ tag }}</p>
        <Icon
          v-if="canBeRemoved(tag)"
          @click.native="tagActionClicked(idx)"
          class="tag-container__action"
          id="x"
          :width="16"
          :height="16"
        />
      </div>
      <Combobox
        id="tag-selector__value"
        @input="onInput"
        v-model="currentInput"
        :filter="'none'"
        :onSelect="handleAddItem"
        :source="autoCompleteList"
        :isAlreadySelected="isAlreadySelected"
        :displayUser="true"
      />
    </div>
  </div>
</template>

<script>
import Combobox from '@/components/ui/Combobox.vue';
import Icon from '@/components/ui/Icon.vue';
import throttle from 'lodash.throttle';

/**
 * TODO: Make this more general of a component once this works for the access group component
 */
export default {
  name: 'TagSelector',
  props: {
    value: Array,
    getLabel: Function,
    updateAutoComplete: Function,
    canBeRemoved: {
      type: Function,
      default: () => true,
    },
    showMeta: {
      type: Function,
      default: (item) => false,
    },
    isAlreadySelected: {
      type: Function,
      default: (autocompleteSuggestion) => false,
    },
  },
  components: {
    Combobox,
    Icon,
  },
  mounted() {},
  data() {
    return {
      currentInput: '',
      tagsDisplay: this.value,
      autoCompleteList: [],
      focusedChild: -1,
    };
  },
  watch: {
    value(value) {
      this.tagsDisplay = value;
    },
  },
  methods: {
    subRowTextDisplay(member) {
      return member.email;
    },
    tagActionClicked(idx) {
      this.$emit('tag:remove', this.tagsDisplay[idx]);
      this.tagsDisplay.splice(idx, 1);
      this.$emit('input', this.tagsDisplay);
    },
    onInput: throttle(function (value) {
      if (value === '') {
        this.autoCompleteList = [];
        return;
      }

      this.updateAutoComplete(value).then((members) => {
        this.autoCompleteList = members.map((member) => {
          return {
            display: member.displayName,
            item: member.uuid,
            ...member,
          };
        });
      });
    }, 250),
    handleAddItem(item) {
      if (this.showMeta(item)) {
        return false;
      }
      this.autoCompleteList = [];
      this.$emit('tag:add', item);
      this.tagsDisplay.push(item);
      this.$emit('input', this.tagsDisplay);
      this.currentInput = '';
    },
  },
};
</script>

<style>
.tag-selector-container {
  position: relative;
}

.tag-selector {
  border: 1px solid var(--blue-60);
  border-radius: var(--formElementRadius);
  background: var(--gray-20);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.tag-selector .tag-selector__list {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-right: 0.5em;
}

.tag-selector .tag-container {
  display: flex;
  flex-direction: row;
  background: var(--blue-60);
  color: var(--white);
  padding: 0.1em 0.5em;
  border-radius: var(--formElementRadius);
  margin-right: 0.5em;
  align-items: center;
  margin: 0.6em 0.25em;
}

.tag-container .tag-container__text {
  margin: 0;
  height: 1em;
  line-height: 1em;
  margin-right: 0.5em;
}

.tag-selector .tag-selector__value {
  background: transparent;
  border: none;
  height: 1.5em;
  font-size: 1em;
  flex: 1;
  min-width: 5em;
  margin: 0.6em 0;
}

.tag-selector .tag-container__action:hover {
  background: var(--darkBlue);
  cursor: pointer;
}

.tag-selector-container .selector-auto-complete {
  list-style-type: none;
  position: absolute;
  top: 100%;
  background: var(--white);
  border-radius: var(--formElementRadius);
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 25em;
  overflow-y: auto;
  z-index: 1;
}

.selector-auto-complete .selector-auto-complete__item-container.active {
  background: var(--gray-20);
}

.selector-auto-complete .selector-auto-complete__item {
  cursor: pointer;
  padding: 0 0.5em;
  border-bottom: 1px solid var(--gray-40);
}

.selector-auto-complete .selector-auto-complete__item.disabled {
  cursor: not-allowed;
}

.selector-auto-complete .selector-auto-complete__item:last-child {
  border-bottom: none;
}

.selector-auto-complete .selector-auto-complete__item:hover {
  background: var(--gray-20);
}
</style>
