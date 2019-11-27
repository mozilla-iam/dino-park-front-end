<template>
  <div class="tag-selector-container">
    <div class="tag-selector">
      <div class="tag-container" v-for="(tag, idx) in tags" :key="idx">
        <p class="tag-container__text">{{ tag.label }}</p>
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
      />
    </div>
    <ul class="selector-auto-complete">
      <li v-for="(member, idx) in autocompleteList" :key="idx">
        <AccessGroupMemberListDisplay member="member" />
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import AccessGroupMemberListDisplay from '@/components/access_group/AccessGroupMemberListDisplay.vue';

/**
 * TODO: Make this more general of a component once this works for the access group component
 */
export default {
  name: 'TagSelector',
  props: [],
  components: {
    Icon,
    AccessGroupMemberListDisplay,
  },
  mounted() {},
  data() {
    return {
      currentInput: '',
      tags: [],
    };
  },
  methods: {
    onSelectorInput(el) {
      if (!this.currentInput) {
        return;
      }
      this.tags.push({ label: this.currentInput });
      this.currentInput = '';
    },
    tagActionClicked(idx) {
      this.tags.splice(idx, 1);
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
</style>
