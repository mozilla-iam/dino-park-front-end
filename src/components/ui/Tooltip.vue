<template>
  <ShowMore
    class="tooltip"
    :buttonText="buttonText"
    buttonClass="button button--icon-only"
    :alternateButtonText="alternateButtonText"
    :closeWhenClickedOutside="true"
    :expanded="false"
    :buttonTextVisuallyHidden="true"
  >
    <template slot="overflow">
      <Popover>
        <slot></slot>
      </Popover>
    </template>
    <template slot="icon-expanded">
      <Icon id="info" :width="16" :height="16" />
    </template>
    <template slot="icon-collapsed">
      <Icon id="info" :width="16" :height="16" />
    </template>
  </ShowMore>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import Popover from '@/components/ui/Popover.vue';
import ShowMore from '@/components/_functional/ShowMore.vue';

export default {
  name: 'Tooltip',
  props: {
    label: String,
    buttonText: String,
    alternateButtonText: String,
  },
  components: {
    Icon,
    Popover,
    ShowMore,
  },
};
</script>

<style>
.tooltip {
  display: inline-block;
  vertical-align: baseline;
}
.tooltip .popover__content {
  padding: 1em;
}
.tooltip button {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--gray-50);
  display: inline-flex;
  vertical-align: middle;
  border-radius: 100%; /* so that focus outline is as round as the icon */
}
.tooltip button:hover,
.tooltip button[aria-expanded='true'] {
  color: var(--blue-60);
  background-color: transparent;
}
.tooltip button svg {
  margin: 0;
}
</style>
