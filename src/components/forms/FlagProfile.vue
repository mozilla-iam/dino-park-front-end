<template>
  <form action="" @submit.prevent="console.log('Form submitted; @todo: send to relevant endpoint')">
    <fieldset class="checkboxes">
      <legend class="visually-hidden">Why flag this?</legend>
      <label class="checkboxes__item">
        <input type="checkbox">
        <strong>It's inappropriate</strong>
        <p>This profile contains content that a reasonable person would consider offensive, abusive, or a violation of our community guidelines.</p>
      </label>
      <label class="checkboxes__item">
        <input type="checkbox">
        <strong>It's off-topic</strong>
        <p>This profile is not related to Mozilla's products, technologies or mission and should not be on this platform.</p>
      </label>
      <label class="checkboxes__item">
        <input type="checkbox">
        <strong>It's spam</strong>
        <p>This profile is an advertisement, or vandalism. It is not useful or relevant to the current topic.</p>
      </label>
      <label class="checkboxes__item">
        <input type="checkbox">
        <strong>It's something else</strong>
        <p>This profile needs attention for a reason not listed above.</p>
      </label>
    </fieldset>
    <button class="button button--primary">Submit</button>
  </form>
</template>

<script>
import { MUTATE_PROFILE } from '@/queries/profile';

export default {
  name: 'MutateDemo',
  props: {
  },
  methods: {
    handleError() {
      console.log(this);
    },
  },
  data() {
    return {
      mutateProfile: MUTATE_PROFILE,
      done: false,
      firstName: '',
      lastName: '',
      primaryEmail: '',
      userId: '',
    };
  },
};
</script>

<style>
  label,
  input {
    display: block;
    font: inherit;
  }
  .checkboxes {
    border: 0;
  }
  .checkboxes__item {
    border-bottom: 1px solid var(--midGrey);
    padding: 1em 0 1em 2.5em;
    position: relative;
  }
  .checkboxes__item:last-child {
    border-bottom: 0;
  }
    .checkboxes__item strong {
      font-size: 1.25em;
      font-weight: 400;
    }
    .checkboxes__item p {
      font-size: .9em;
      margin-top: .5em;
      margin-bottom: 0;
    }
    .checkboxes__item input {
      position: absolute;
      left: 0;
      top: 1.25em;
    }
</style>
