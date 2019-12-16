<template>
  <EditMutationWrapper
    :editVariables="{
      tags,
    }"
    formName="Edit tags"
    class="add-tags"
  >
    <header class="profile__section-header" ref="header" tabindex="-1">
      <div class="profile__section-header__title-info">
        <h2>{{ fluent('profile_tags') }}</h2>
        <Tooltip
          :buttonText="fluent('profile_tags', 'tooltip-open')"
          :alternateButtonText="fluent('profile_tags', 'tooltip-close')"
          >{{ fluent('profile_tags', 'tooltip') }}</Tooltip
        >
      </div>
      <PrivacySetting
        class="privacy-select--large"
        label="Tags privacy level"
        id="section-tags-privacy"
        profileFieldName="tags"
        :profileFieldObject="tags"
        :collapsedShowLabel="true"
      />
    </header>
    <div class="add-tags__list">
      <Tag
        v-for="({ k, v }, index) in tags.values"
        :tag="v"
        :key="`tag-${index}`"
        :removable="true"
        @removeTag="removeTag(index)"
      >
      </Tag>
    </div>
    <input
      v-if="addingTag"
      type="text"
      v-model="newTag"
      ref="inputTag"
      class="add-tags__input"
      @keydown.enter="handleAddTag"
    />
    <button
      type="button"
      class="add-tags__add-more button button--secondary button--action"
      @click="handleAddTag"
    >
      <template v-if="addingTag && newTag.length > 0">
        <Icon id="check" :width="18" :height="18" />
        Submit
      </template>
      <template v-else>
        <Icon id="plus" :width="18" :height="18" />
        Add Tag
      </template>
    </button>
  </EditMutationWrapper>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import PrivacySetting from '@/components/profile/PrivacySetting.vue';
import Tag from '@/components/ui/Tag.vue';
import { DISPLAY_LEVELS } from '@/assets/js/display-levels';
import EditMutationWrapper from './EditMutationWrapper.vue';
import Tooltip from '@/components/ui/Tooltip.vue';

export default {
  name: 'EditTags',
  props: {
    editVariables: Object,
    initialTags: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    EditMutationWrapper,
    Icon,
    PrivacySetting,
    Tag,
    Tooltip,
  },
  methods: {
    handleAddTag() {
      if (!this.addingTag) {
        this.addingTag = true;
        this.$nextTick(() => this.$refs.inputTag.focus());
        return;
      }
      if (this.newTag.length > 0) {
        this.addTag(this.newTag);
        this.addingTag = false;
      } else {
        this.$refs.inputTag.focus();
      }
    },
    addTag(tag) {
      const highestId = this.tags.values.reduce(
        (max, { k }) => (Number(k) > max ? Number(k) : max),
        0,
      );
      const newTag = {
        k: `${highestId + 1}`,
        v: tag,
      };

      this.tags.values.push(newTag);
      this.newTag = '';
    },
    removeTag(index) {
      if (this.tags.values.length > index) {
        this.tags.values.splice(index, 1);
      }
    },
  },
  mounted() {
    this.$refs.header.focus();
  },
  data() {
    const {
      values: initialTags,
      metadata: { display = DISPLAY_LEVELS.private.value },
    } = this.initialTags;
    return {
      newTag: '',
      tags: {
        values: Object.entries(initialTags || {}).map(([k, v]) => {
          return { k, v };
        }),
        display,
      },
      addingTag: false,
    };
  },
};
</script>

<style>
.add-tags__input,
.add-tags__input {
  margin-top: 1em;
}
.add-tags__list {
  margin-bottom: 2em;
}
.add-tags__add-more {
  margin-left: auto;
}
</style>
