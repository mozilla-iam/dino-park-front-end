<template>
  <Modal
    :heading="fluent(`onboarding_modal_${step}`)"
    :initiallyOpen="true"
    :closeButton="true"
    @close="done"
  >
    <div class="onboarding-modal__dots">
      <ProgressDots :dots="steps.length" :progress="step" />
    </div>
    <article class="onboarding-modal__article">
      <img :src="step_data.img" />
      <p>
        <Fluent
          :id="`onboarding_modal_${step}`"
          attr="paragraph_1"
          :tags="step_data.tags"
        />
      </p>
      <p>
        <Fluent
          :id="`onboarding_modal_${step}`"
          attr="paragraph_2"
          :tags="step_data.tags"
        />
      </p>
    </article>
    <hr class="onboarding-modal__hline" />
    <footer class="onboarding-modal__footer">
      <a href="#" @click="prev()" :class="[{ 'button--hidden': first }]">{{
        fluent('back')
      }}</a>
      <a href="#" class="button" @click="last ? done() : next()">{{
        fluent(last ? 'close' : 'next')
      }}</a>
      <a href="#" @click="done()" :class="[{ 'button--hidden': last }]">{{
        fluent('skip')
      }}</a>
    </footer>
  </Modal>
</template>

<script>
import Fluent from '@/components/Fluent.vue';
import Modal from '@/components/_functional/Modal.vue';
import ProgressDots from '@/components/guide/ProgressDots.vue';
import Swipe from '@/assets/js/swipe';

export default {
  name: 'OnboardingModal',
  components: { Fluent, Modal, ProgressDots },
  computed: {
    first() {
      return this.step === 1;
    },
    last() {
      return this.step === this.steps.length;
    },
  },
  methods: {
    next() {
      if (this.step < this.steps.length) {
        this.step += 1;
        this.step_data = this.steps[this.step - 1];
      }
    },
    prev() {
      if (this.step > 1) {
        this.step -= 1;
        this.step_data = this.steps[this.step - 1];
      }
    },
    done() {
      this.$store.state.onboarding.modal = false;
      this.$emit('close');
    },
  },
  mounted() {
    this.swipe = new Swipe(this.$el, this.next, this.prev);
  },
  data() {
    const steps = [
      {
        img: require('@/assets/images/tour-heads.png'),
      },
      {
        img: require('@/assets/images/tour-technology.png'),
      },
      {
        img: require('@/assets/images/tour-foundation.png'),
        tags: {
          FAQ: {
            tag: 'a',
            target: '_blank',
            href: 'https://discourse.mozilla.org/t/50444',
          },
        },
      },
    ];
    return {
      swipe: null,
      step: 1,
      step_data: steps[1],
      steps,
    };
  },
};
</script>

<style>
.onboarding-modal__dots {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.onboarding-modal__article {
  display: flex;
  flex-direction: column;
  padding-left: 4em;
  padding-right: 4em;
  min-height: 29em;
  color: var(--gray-50);
}
.onboarding-modal__article > img {
  margin-left: auto;
  margin-right: auto;
  height: 18em;
}

.onboarding-modal__hline {
  margin-top: 1em;
}

.onboarding-modal__footer {
  display: flex;
  margin-bottom: 2em;
  justify-content: space-between;
  align-items: center;
  margin-left: 2em;
  margin-right: 2em;
}

.button--hidden {
  visibility: hidden;
}
</style>
