<template>
  <div
    :class="['tour-tooltip', { [`tour-tooltip--${position}`]: position }]"
    ref="tour-tooltip"
  >
    <div class="tour-tooltip__content" ref="content">
      <header>{{ step }}/{{ steps }}</header>
      <section>
        {{ fluent('tooltip_tour', `step${step}`) }}
      </section>
      <footer>
        <button>{{ fluent('next') }}</button>
        <button v-if="step < steps">
          {{ fluent('tooltip_tour', 'skip') }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TourTooltip',
  methods: {
    attach(selector) {
      const anker = document.querySelector(selector);
      const r = anker.getBoundingClientRect();
      this.$el.style.top = `${r.top + r.height + 10}px`;
      this.$el.style.left = `${r.left + r.width / 2}px`;
    },
  },
  mounted() {
    this.attach('.search-form__submit');
  },
  data() {
    const s = [
      { selector: '.search-form__submit' },
      { selector: 'profile__intro > a.edit-button' },
    ];
    return {
      position: '',
      step: 1,
      steps: 4,
    };
  },
};
</script>

<style>
.tour-tooltip {
  box-shadow: 0 0.125em 0.25em 0.125em rgba(210, 210, 210, 0.5);
  text-align: left;
  padding-left: 0;
  z-index: var(--layerModal);
  position: fixed;
  top: calc(100% + 0.5em);
  left: 50%;
  width: 90vw;
  transform: translateX(calc(-50%));
  color: var(--gray-60);
  border-radius: var(--imageRadius);
  border: 2px solid var(--gray-30);
  background-color: var(--blue-60);
  color: var(--white);
}
@media (min-width: 57.5em) {
  .tour-tooltip {
    width: 18em;
  }
}
.tour-tooltip::before {
  content: '';
  width: 1em;
  height: 1em;
  background-color: var(--blue-60);
  position: absolute;
  left: 50%;
  margin-left: -0.5em;
  margin-top: -0.5em;
  transform: rotate(-45deg);
  box-shadow: 0 0 0.25em 0 var(--gray-30);
  border-radius: inherit;
  border: inherit;
}
.tour-tooltip__content {
  background-color: var(--blue-60);
  position: relative;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

.tour-tooltip__content > header {
  align-self: end;
}

.tour-tooltip__content > section {
  padding: 0.5em;
}

.tour-tooltip__content > footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  flex-direction: row-reverse;
}

.tour-tooltip__content > footer > button {
  background-color: var(--darkBlue);
  color: var(--white);
  border: transparent;
  border-radius: 0.25em;
  padding: 0.25em 1em;
}

.tour-tooltip--left {
  transform: translateX(calc(-100% + 1.75em));
}
.tour-tooltip--left::before {
  left: auto;
  right: 1em;
}
.tour-tooltip--right {
  transform: translateX(-2.25em);
}
.tour-tooltip--right::before {
  left: 2em;
}
.tour-tooltip a {
  background-color: var(--white);
}
</style>
