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
    @close="start"
  >
    <EditMutationWrapper
      :editVariables="{ primaryUsername }"
      :novalidate="true"
      :skipValidation="true"
      :formName="fluent('profile_contact', 'edit')"
      :confirm="true"
      :errorHandler="handleUsernameError"
      emit="close"
    >
      <article class="onboarding-modal__article">
        <p>
          <Fluent :id="`onboarding_modal_username`" attr="paragraph_1" />
        </p>
        <p>
          <Fluent :id="`onboarding_modal_username`" attr="paragraph_2" />
        </p>
        <section v-if="scope.isReady" class="onboarding-modal__username">
          <label for="field-username">{{ fluent('profile_username') }}</label>
          <TextInput
            class="username__input"
            type="text"
            :maxlength="64"
            :required="true"
            pattern="[a-z0-9\-_]{3,}"
            id="field-username"
            :highlightError="true"
            :infoMsg="infoMsg"
            :oneShotError="usernameErrorMsg"
            :selected="true"
            v-model="primaryUsername.value"
            @input="updateInfoMsg"
          />
        </section>
      </article>
      <LoadingSpinner v-if="!scope.isReady"></LoadingSpinner>
    </EditMutationWrapper>
  </Modal>
</template>

<script>
import Fluent from '@/components/Fluent.vue';
import TextInput from '@/components/ui/TextInput.vue';
import Modal from '@/components/_functional/Modal.vue';
import ProgressDots from '@/components/guide/ProgressDots.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';
import EditMutationWrapper from '@/components/profile/edit/EditMutationWrapper.vue';
import Swipe from '@/assets/js/swipe';

const CHECK_UPPER = /[A-Z]/;
const CHECK_SPACE = /[ ]/;
const CHECK_LENGTH = /^(.{1,2}|.{64,})$/;
const CHECK_CHARS = /[^a-z0-9\-_]/;

export default {
  name: 'OnboardingModal',
  components: {
    EditMutationWrapper,
    Fluent,
    LoadingSpinner,
    Modal,
    ProgressDots,
    TextInput,
  },
  computed: {
    first() {
      return this.step === 1;
    },
    last() {
      return this.step === this.steps.length;
    },
    username() {
      return this.$store.state.scope.username;
    },
  },
  watch: {
    username() {
      if (this.username) {
        this.primaryUsername.value = this.updateUsername(this.username);
      }
    },
  },
  methods: {
    skip() {
      this.done();
    },
    next() {
      if (this.step > 0 && this.step < this.steps.length) {
        this.step += 1;
        this.step_data = this.steps[this.step - 1];
      } else {
        this.done();
      }
    },
    prev() {
      if (this.step > 1) {
        this.step -= 1;
        this.step_data = this.steps[this.step - 1];
      }
    },
    start() {
      this.step = 1;
    },
    done() {
      this.$store.state.onboarding.modalDone();
      this.$emit('close');
    },
    updateUsername(username) {
      if (username.startsWith('r--')) {
        const rand = () => Math.random().toString(36).split('.')[1];
        username = `p--${rand()}${rand()}`;
      }
      return username;
    },
    updateInfoMsg(username) {
      this.infoMsg = this.getInfoMsg(username);
    },
    getInfoMsg(username) {
      if (CHECK_UPPER.test(username)) {
        return this.fluent({
          id: 'onboarding_modal_username',
          attr: 'username_upper',
        });
      }
      if (CHECK_SPACE.test(username)) {
        return this.fluent({
          id: 'onboarding_modal_username',
          attr: 'username_space',
        });
      }
      if (CHECK_LENGTH.test(username)) {
        return this.fluent({
          id: 'onboarding_modal_username',
          attr: 'username_length',
        });
      }
      if (CHECK_CHARS.test(username)) {
        return this.fluent({
          id: 'onboarding_modal_username',
          attr: 'username_chars',
        });
      }
      return this.fluent({
        id: 'onboarding_modal_username',
        attr: 'restriction',
      });
    },
    handleUsernameError(e) {
      switch (e.gqlError?.message) {
        case 'username_exists':
          this.usernameErrorMsg = this.fluent({
            id: 'onboarding_modal_username',
            attr: 'username_exists',
            args: { username: this.primaryUsername.value },
          });
          break;
        case 'username_invalid_chars':
          this.usernameErrorMsg = this.fluent({
            id: 'onboarding_modal_username',
            attr: 'username_invalid_chars',
          });
          break;
        case 'username_length':
          this.usernameErrorMsg = this.fluent({
            id: 'onboarding_modal_username',
            attr: 'username_length',
          });
          break;
        default:
          this.usernameErrorMsg = this.fluent('unknown_error');
      }
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
    const { username } = this.$store.state.scope;
    return {
      primaryUsername: { value: this.updateUsername(username) },
      usernameErrorMsg: '',
      infoMsg: this.getInfoMsg(),
      swipe: null,
      step: 0,
      step_data: steps[0],
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
  padding-left: 2em;
  padding-right: 2em;
  min-height: 26em;
  color: var(--gray-50);
}
.onboarding-modal__article > img {
  margin-left: auto;
  margin-right: auto;
  height: 15em;
}

@media (min-width: 35em) {
  .onboarding-modal__article {
    padding-left: 4em;
    padding-right: 4em;
    min-height: 29em;
  }

  .onboarding-modal__article > img {
    height: 18em;
  }
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
  margin-top: 3em;
  margin-bottom: 3em;
}
@media (min-width: 35em) {
  .onboarding-modal__username {
    margin: 3em;
  }
}

.button--hidden {
  visibility: hidden;
}

.onboarding-modal .button-bar {
  margin: auto;
}
.onboarding-modal .loading {
  position: absolute;
  z-index: var(--layerOne);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  flex-direction: row;
}
</style>
