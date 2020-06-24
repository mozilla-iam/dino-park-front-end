<template>
  <li class="icon-block">
    <div v-if="heading" class="icon-block__heading">
      {{ heading }} <span v-if="subHeading">{{ subHeading }}</span>
    </div>
    <div v-if="icon" :class="`icon-block__icon`">
      <Icon :id="icon" :width="16" :height="16" />
    </div>
    <div
      v-else
      class="icon-block__icon icon-block__icon--letter"
      aria-hidden="true"
      role="presentation"
    >
      {{ subHeading ? subHeading[0] : heading[0] }}
    </div>
    <span><slot></slot></span>
  </li>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'IconBlock',
  props: {
    heading: String,
    subHeading: String,
    icon: String,
  },
  components: {
    Icon,
  },
};
</script>

<style>
.icon-block {
  border: 1px solid var(--gray-30);
  border-radius: 0.3em;
  padding: 0.5em;
  list-style: none;
  display: flex; /* avoid breaking between columns */
  flex-direction: column;
  justify-content: center;
  padding-left: 1.5em;
  padding-top: 0.6em;
  padding-bottom: 0.6em;
  margin-left: 1em;
  position: relative;
  break-inside: avoid;
  word-break: break-word;
}
.icon-block__heading {
  font-size: 0.9em;
}
.icon-block__heading span {
  color: var(--gray-50);
  margin-left: 0.5em;
}
.icon-block__icon {
  width: 1.75em;
  height: 1.75em;
  background-color: var(--gray-30);
  position: absolute;
  left: -1em;
  border-radius: 100%;
  background-size: 1em;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-block__icon--letter {
  text-align: center;
  line-height: 1.6;
  font-weight: 700;
  background-image: none;
}
</style>
