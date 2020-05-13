<template>
  <div :class="'popover' + (position && ` popover--${position}`)" ref="popover">
    <div class="popover__content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popover',
  props: {
    layer: String,
    initialMaxWidth: {
      type: Number,
      default: 350,
    },
    floating: {
      type: Boolean,
      default: true,
    },
    anker: {
      type: HTMLElement,
      default: null,
    },
  },
  methods: {
    positionAndSize() {
      // We should take another look at this.
      let button;
      if (this.anker) {
        button = this.anker;
      } else {
        button = this.$parent.$refs.button;
      }
      if (!button) {
        return;
      }
      const {
        left: spaceOnLeft,
        right,
        width,
      } = button.getBoundingClientRect();
      const viewportWidth = document.scrollingElement.getBoundingClientRect()
        .width;
      const spaceOnRight = viewportWidth - right;
      // Account for large buttons. We don't want their witdh in the equation.
      const centeredSpaceOnLeft = spaceOnLeft + width / 2;
      const centeredSpaceOnRight = spaceOnRight + width / 2;

      if (
        !this.floating ||
        (centeredSpaceOnLeft > 0.5 * this.maxWidth &&
          centeredSpaceOnRight > 0.5 * this.maxWidth)
      ) {
        return;
      }
      if (centeredSpaceOnRight - centeredSpaceOnLeft > 10) {
        this.position = 'right';
      } else if (centeredSpaceOnLeft - centeredSpaceOnRight > 10) {
        this.position = 'left';
      }

      if (this.position === 'right' && spaceOnRight < this.maxWidth) {
        this.maxWidth = spaceOnRight;
      }
      if (this.position === 'left' && spaceOnLeft < this.maxWidth) {
        this.maxWidth = spaceOnLeft;
      }
    },
  },
  watch: {
    anker() {
      this.positionAndSize();
    },
  },
  data() {
    return {
      position: '',
      maxWidth: this.initialMaxWidth,
    };
  },
  mounted() {
    this.positionAndSize();
    this.$refs.popover.style.maxWidth = `${this.maxWidth}px`;
    if (this.layer) {
      this.$refs.popover.style.zIndex = this.layer;
    }
  },
};
</script>

<style>
.popover {
  background-color: var(--white);
  box-shadow: 0 0.125em 0.25em 0.125em rgba(210, 210, 210, 0.5);
  text-align: left;
  padding-left: 0;
  z-index: var(--layerPopover);
  position: absolute;
  top: calc(100% + 0.5em);
  left: 50%;
  width: 90vw;
  transform: translateX(calc(-50%));
  color: var(--gray-60);
  border-radius: var(--imageRadius);
  border: 2px solid var(--gray-30);
}
@media (min-width: 57.5em) {
  .popover {
    min-width: 18em;
  }
}
.popover::before {
  content: '';
  width: 1em;
  height: 1em;
  background-color: var(--white);
  position: absolute;
  left: 50%;
  margin-left: -0.5em;
  margin-top: -0.5em;
  transform: rotate(-45deg);
  box-shadow: 0 0 0.25em 0 var(--gray-30);
  border-radius: inherit;
  border: inherit;
}
.popover__content {
  background-color: var(--white);
  position: relative;
}
.popover--left {
  transform: translateX(calc(-100% + 1.75em));
}
.popover--left::before {
  left: auto;
  right: 1em;
}
.popover--right {
  transform: translateX(-2.25em);
}
.popover--right::before {
  left: 2em;
}
.popover a {
  background-color: var(--white);
}
</style>
