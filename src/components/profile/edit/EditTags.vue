<template>
  <EditMutationWrapper
    :editVariables="{
      tags,
    }"
    :formName="fluent('profile_tags', 'edit')"
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
        :label="fluent('profile_tags', 'privacy')"
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
    <!-- add new tag when pressing either the enter or the comma key (keyCode: 188) -->
    <input
      v-if="addingTag"
      type="text"
      v-model="newTag"
      ref="inputTag"
      class="add-tags__input"
      @keydown.enter="handleAddTag"
      @keydown.188.prevent="handleAddTag"
      @paste="handlePaste"
    />
    <button
      type="button"
      class="add-tags__add-more button button--secondary button--action"
      @click="handleAddTag"
    >
      <template v-if="addingTag && newTag.length > 0">
        <Icon id="check" :width="18" :height="18" />
        {{ fluent('submit') }}
      </template>
      <template v-else>
        <Icon id="plus" :width="18" :height="18" />
        {{ fluent('profile_tags', 'add') }}
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
    handlePaste() {
      this.$nextTick(() => {
        let text = this.$refs.inputTag.value.trim();

        if (text === '' || !text.includes(', ')) {
          return;
        }

        for (let tag of text.split(', ')) {
          this.addTag(tag);
        }
      });
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
