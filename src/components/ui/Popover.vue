<template>
  <div
    :class="'popover' + (position && ` popover--${position}`)"
    :style="`max-width: ${maxWidth}`"
  >
    <div class="popover__content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popover',
  methods: {
    setPosition() {
      const { button } = this.$parent.$refs;
      const { left: spaceOnLeft, right } = button.getBoundingClientRect();
      const spaceOnRight =
        document.scrollingElement.getBoundingClientRect().width - right;

      if (
        spaceOnLeft > 0.5 * this.maxWidth &&
        spaceOnRight > 0.5 * this.maxWidth
      ) {
        return;
      }
      if (spaceOnRight > spaceOnLeft) {
        this.position = 'right';
      } else if (spaceOnLeft > spaceOnRight) {
        this.position = 'left';
      }
    },
  },
  data() {
    return {
      position: '',
      maxWidth: 300,
    };
  },
  mounted() {
    this.setPosition();
  },
};
</script>

<style>
.popover {
  background-color: var(--white);
  box-shadow: 0 0.125em 0.25em 0.125em rgba(210, 210, 210, 0.5);
  text-align: left;
  padding-left: 0;
  z-index: var(--layerThree);
  position: absolute;
  top: calc(100% + 0.5em);
  left: 50%;
  width: min-content;
  margin: 0 -2.25em;
  transform: translateX(calc(-50% + 2.25em));
  color: var(--gray-60);
  border-radius: var(--imageRadius);
  border: 2px solid var(--gray-30);
}
@media (min-width: 57.5em) {
  .popover {
    min-width: 18em;
    left: 50%;
    transform: translateX(calc(-50% - 1.5em));
    margin: 0 1.5em;
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
  left: 0;
}
.popover--left {
  transform: translateX(calc(-100% + 5.25em));
}
.popover--left::before {
  left: auto;
  right: 1em;
}
@media (min-width: 57.5em) {
  .popover--left {
    transform: translateX(
      calc(-100% + 1.5em)
    ); /* 1.5em = negative margin on popover */
  }
}
.popover--right {
  transform: translateX(0.5em);
}
.popover--right::before {
  left: 2em;
}
@media (min-width: 57.5em) {
  .popover--right {
    transform: translateX(-2.5em);
  }
}
</style>
