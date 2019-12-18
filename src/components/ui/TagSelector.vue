<template>
  <div
    class="tag-selector-container"
    tabindex="-1"
    @click="onTagSelectorClicked"
  >
    <div class="tag-selector">
      <div class="tag-container" v-for="(tag, idx) in tagsDisplay" :key="idx">
        <p class="tag-container__text" v-if="getLabel">{{ getLabel(tag) }}</p>
        <p class="tag-container__text" v-else>{{ tag }}</p>
        <Icon
          @click.native="tagActionClicked(idx)"
          class="tag-container__action"
          id="x"
          :width="16"
          :height="16"
        />
      </div>
      <input
        class="tag-selector__value"
        type="text"
        v-model="currentInput"
        @change="onSelectorInput"
        @input="onInput"
        @blur="onInputBlur"
      />
    </div>
    <ul class="selector-auto-complete" v-if="autoCompleteList.length > 0">
      <li
        class="selector-auto-complete__item"
        v-for="(item, idx) in autoCompleteList"
        :key="idx"
        @click="handleAddItem(item)"
      >
        <AccessGroupMemberListDisplay
          class="selector-auto-complete__item"
          :member="item"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import AccessGroupMemberListDisplay from '@/components/access_group/AccessGroupMemberListDisplay.vue';
import _ from 'lodash';

/**
 * TODO: Make this more general of a component once this works for the access group component
 */
export default {
  name: 'TagSelector',
  props: {
    value: Array,
    getLabel: Function,
    updateAutoComplete: Function,
  },
  components: {
    Icon,
    AccessGroupMemberListDisplay,
  },
  mounted() {},
  data() {
    return {
      currentInput: '',
      tagsDisplay: this.value,
      autoCompleteList: [],
    };
  },
  watch: {
    value(value) {
      this.tagsDisplay = value;
    },
  },
  methods: {
    onTagSelectorClicked(e) {
      const parent = e.target.closest('.tag-selector-container');
      const itemParent = e.target.closest('.selector-auto-complete__item');
      if (parent || itemParent) {
        this.$el.querySelector('.tag-selector__value').focus();
      }
    },
    onInputBlur(e) {
      const parent = e.target.closest('.tag-selector-container');
      if (!parent) {
        this.autoCompleteList = [];
      }
    },
    onSelectorInput(el) {
      if (!this.currentInput) {
        return;
      }
    },
    tagActionClicked(idx) {
      this.$emit('tag:remove', this.tagsDisplay[idx]);
      this.tagsDisplay.splice(idx, 1);
      this.$emit('input', this.tagsDisplay);
    },
    onInput: _.throttle(function(e) {
      if (!e || e.target.value === '') {
        if (e.target.value === '') {
          this.autoCompleteList = [];
        }
        return;
      }
      this.updateAutoComplete(e.target.value).then(members => {
        this.autoCompleteList = members;
      });
    }, 1000),
    handleAddItem(item) {
      this.$emit('tag:add', item);
      this.tagsDisplay.push(item);
      this.$emit('input', this.tagsDisplay);
      this.autoCompleteList = [];
      this.currentInput = '';
    },
  },
  computed: {
    autocompleteList() {
      return [];
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
  padding-left: 1em;
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
  margin: 0.6em 0.25em 0.6em 0;
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

.tag-selector-container .selector-auto-complete {
  list-style-type: none;
  position: absolute;
  top: 100%;
  background: var(--white);
  border: 1px solid var(--blue-60);
  border-radius: var(--formElementRadius);
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 20em;
  overflow-y: auto;
  z-index: 1;
}

.selector-auto-complete .selector-auto-complete__item {
  cursor: pointer;
  padding: 0.5em;
}

.selector-auto-complete .selector-auto-complete__item:hover {
  background: var(--gray-20);
}
</style>
