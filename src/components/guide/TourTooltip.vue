<template>
  <div v-if="active" class="darkness" @click="(e) => e.preventDefault()">
    <div class="spotlight"></div>
    <Popover
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
  </div>
</template>

<script>
import Popover from '@/components/ui/Popover.vue';
import { trapFocus } from '@/assets/js/trap-focus';

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
        const anker = document.querySelectorAll(selector);
        if (anker.length === 1) {
          [this.anker] = anker;
        } else if (anker[0].clientWidth === 0 && anker.length > 1) {
          [, this.anker] = anker;
        } else {
          [this.anker] = anker;
        }

        this.highlight();

        this.num = num;
        this.phase = phase;
        this.total = total;

        const r = this.anker.getBoundingClientRect();
        this.anker.style.setProperty('--top', `${r.height / 2}px`);
        this.anker.style.setProperty('--left', `${r.width / 2}px`);
        this.$el.style.setProperty('--top', `${r.top + r.height / 2}px`);
        this.$el.style.setProperty('--left', `${r.left + r.width / 2}px`);
        this.$el.style.setProperty(
          '--ttt-top',
          `calc(${r.top + r.height / 2}px + 2.5em)`,
        );
        this.$el.style.setProperty(
          '--ttt-left',
          `calc(${r.left + r.width / 2}px)`,
        );
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
      e.preventDefault();
    },
    done(e) {
      this.$store.state.onboarding.nextPhase();
      this.deHighlight();
      this.enableBackgroundScrolling();
      e.preventDefault();
    },
    preventBackgroundScrolling() {
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    },
    enableBackgroundScrolling() {
      document.body.style.overflow = 'visible';
      document.body.style.width = 'auto';
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
        trapFocus({ target: this.$el });
        this.preventBackgroundScrolling();
      } else {
        this.deHighlight();
        this.enableBackgroundScrolling();
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
  left: 0px;
  min-width: 100vw;
  position: absolute;
  z-index: var(--layerModal);
  color: var(--white);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: transparent;
  border: none;
}
@media (max-width: 35em) {
  .tour-tooltip {
    transform: none;
  }
}
@media (min-width: 35em) {
  .tour-tooltip {
    height: initial;
    display: initial;
    min-width: 18em;
    width: 18em;
    top: var(--ttt-top);
    left: var(--ttt-left);
    box-shadow: 0 0.125em 0.25em 0.125em rgb(100, 100, 100);
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

.darkness {
  position: absolute;
}
.spotlight {
  position: absolute;
  z-index: var(--layerModal);
  left: var(--left);
  top: var(--top);
  width: 3.5em;
  height: 3.5em;
  border-radius: 1.75em;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2) inset,
    0px 0px 0px max(200vh, 200vw) rgba(0, 0, 0, 0.2);
  transform: translateX(-50%) translateY(-50%);
}
</style>
