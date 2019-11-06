<template>
  <article class="description-container">
    <header>
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
  </article>
</template>

<script>
import EditButton from '@/components/ui/EditButton.vue';
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'AccessGroupDescription',
  components: { EditButton, Icon },
  props: {
    title: String,
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      section: 'description',
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
  padding: 1.5em;
}

.description-container__meta {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.description-container__meta .edit-button {
  text-align: right;
}

.label-container {
  display: inline-block;
}

.label-container .label-container__text {
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  margin-right: 1em;
  text-transform: uppercase;
  color: var(--black);
}
.label-container .label-container__icon {
  display: inline-block;
  vertical-align: middle;
}
.label-container .label-container__icon svg {
  display: inline-block;
  vertical-align: middle;
}

.description-container__title {
  margin-top: 0.5em;
}
</style>
