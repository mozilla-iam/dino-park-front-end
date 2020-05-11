<template>
  <Modal
    v-if="step"
    :heading="fluent(`onboarding_modal_${step}`)"
    :initiallyOpen="true"
    :closeButton="true"
    @close="skip"
    class="onboarding-modal"
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
      <a href="#" class="button" @click="next()">{{ fluent('next') }}</a>
      <a href="#" @click="skip()" :class="[{ 'button--hidden': last }]">{{
        fluent('skip')
      }}</a>
    </footer>
  </Modal>
  <Modal
    v-else
    :heading="fluent(`onboarding_modal_username`)"
    :initiallyOpen="true"
    :closeButton="false"
    class="onboarding-modal"
    @close="done"
  >
    <EditMutationWrapper
      :editVariables="{ primaryUsername }"
      :novalidate="true"
      :formName="fluent('profile_contact', 'edit')"
      :confirm="true"
      emit="close"
    >
      <article class="onboarding-modal__article">
        <p>
          <Fluent :id="`onboarding_modal_username`" attr="paragraph_1" />
        </p>
        <p>
          <Fluent :id="`onboarding_modal_username`" attr="paragraph_2" />
        </p>
        <section class="onboarding-modal__username">
          <label for="field-username">{{ fluent('profile_username') }}</label>
          <input
            class="username__input"
            type="text"
            id="field-username"
            v-model="primaryUsername.value"
          />
        </section>
      </article>
    </EditMutationWrapper>
  </Modal>
</template>

<script>
import Fluent from '@/components/Fluent.vue';
import Modal from '@/components/_functional/Modal.vue';
import ProgressDots from '@/components/guide/ProgressDots.vue';
import Swipe from '@/assets/js/swipe';
import EditMutationWrapper from '@/components/profile/edit/EditMutationWrapper.vue';

export default {
  name: 'OnboardingModal',
  components: { EditMutationWrapper, Fluent, Modal, ProgressDots },
  computed: {
    first() {
      return this.step === 1;
    },
    last() {
      return this.step === this.steps.length;
    },
  },
  methods: {
    skip() {
      this.step = 0;
    },
    next() {
      if (this.step > 0 && this.step < this.steps.length) {
        this.step += 1;
        this.step_data = this.steps[this.step - 1];
      } else {
        this.step = 0;
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
      primaryUsername: { value: this.$store.state.scope.username },
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

.onboarding-modal__username {
  margin: 3em;
}
.username__input {
  border: 1px solid transparent;
  background-color: var(--gray-20);
  border-radius: var(--formElementRadius);
  color: var(--black);
  margin: 0;
  padding: 0.5em 0.9em;
  width: 100%;
}

.button--hidden {
  visibility: hidden;
}

.onboarding-modal .button-bar {
  margin: auto;
}
</style>
