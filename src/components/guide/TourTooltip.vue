<template>
  <Popover
    v-if="active"
    class="tour-tooltip"
    ref="tour-tooltip"
    :initialMaxWidth="200"
    :anker="anker"
  >
    <div class="tour-tooltip__content" ref="content">
      <header>{{ num }}/{{ total }}</header>
      <section>
        {{ fluent('tooltip_tour', `step${phase}_${num}`) }}
      </section>
      <footer>
        <button v-if="num < total" @click="next" ref="focus">
          {{ fluent('next') }}
        </button>
        <button v-else @click="done" ref="focus">{{ fluent('ok') }}</button>
        <button v-if="num < total" @click="done">
          {{ fluent('tooltip_tour', 'skip') }}
        </button>
      </footer>
    </div>
  </Popover>
</template>

<script>
import Popover from '@/components/ui/Popover.vue';

export default {
  name: 'TourTooltip',
  components: { Popover },
  methods: {
    attach() {
      if (this.active) {
        const {
          num,
          phase,
          total,
          selector,
        } = this.$store.state.onboarding.step();

        this.deHighlight();
        this.anker = document.querySelector(selector);
        this.highlight();

        this.num = num;
        this.phase = phase;
        this.total = total;

        console.log(this.anker);
        const r = this.anker.getBoundingClientRect();
        this.anker.style.setProperty('--top', `${r.height / 2}px`);
        this.anker.style.setProperty('--left', `${r.width / 2}px`);
        this.$el.style.top = `calc(${r.top + r.height / 2}px + 2.5em)`;
        this.$el.style.left = `${r.left + r.width / 2}px`;
      }
    },
    deHighlight() {
      if (this.anker) {
        this.anker.classList.remove('tour-highlight');
      }
    },
    highlight() {
      this.anker.classList.add('tour-highlight');
    },
    next(e) {
      this.$store.state.onboarding.tooltipTourNext();
      console.log('do');
      e.preventDefault();
    },
    done(e) {
      this.$store.state.onboarding.nextPhase();
      this.deHighlight();
      e.preventDefault();
    },
  },
  computed: {
    step() {
      return this.$store.state.onboarding.tooltipTour;
    },
    active() {
      return (
        (this.$route.name === 'Profile' &&
          this.$store.state.onboarding.isPhase1) ||
        (this.$route.name === 'Edit Profile' &&
          this.$store.state.onboarding.isPhase2)
      );
    },
  },
  watch: {
    async active(active) {
      if (active) {
        await this.$nextTick();
        this.attach();
        this.$refs.focus.focus();
      } else {
        this.deHighlight();
      }
    },
    async step() {
      if (this.active) {
        await this.$nextTick();
        this.attach();
        this.$refs.focus.focus();
      }
    },
  },
  async mounted() {
    await this.$nextTick();
    this.attach();
  },
  data() {
    return {
      anker: null,
      position: '',
      phase: 1,
      num: 1,
      total: 0,
    };
  },
};
</script>

<style>
.tour-tooltip {
  z-index: var(--layerModal);
  color: var(--white);
}
@media (min-width: 57.5em) {
  .tour-tooltip {
    width: 18em;
  }
}
.tour-tooltip::before {
  background-color: var(--blue-60);
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

.tour-tooltip a {
  background-color: var(--white);
}

.tour-highlight::before {
  pointer-events: none;
}
.tour-highlight::before {
  pointer-events: all;
  box-shadow: 0px 0px 1em rgba(0, 96, 223, 0.5);
  position: absolute;
  width: 3em;
  height: 3em;
  border: 3px solid rgba(0, 96, 223, 0.24);
  border-radius: calc(1.5em + 3px);
  content: '';
  left: var(--left, 0px);
  top: var(--top, 0px);
  transform: translateX(-50%) translateY(-50%);
}
</style>
