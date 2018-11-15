<template>
  <form action="" @submit.prevent="console.log('Form submitted; @todo: send to relevant endpoint')">
    <fieldset class="checkboxes">
      <legend class="visually-hidden">Why flag this?</legend>
      <div class="checkboxes__item">
        <input type="checkbox" id="checkbox-inapt">
        <label for="checkbox-inapt">
          <strong>It's inappropriate</strong>
          <p>This profile contains content that a reasonable person would consider offensive, abusive, or a violation of our community guidelines.</p>
        </label>
      </div>
      <div class="checkboxes__item">
        <input type="checkbox" id="checkbox-offtopic">
        <label for="checkbox-offtopic">
          <strong>It's off-topic</strong>
          <p>This profile is not related to Mozilla's products, technologies or mission and should not be on this platform.</p>
        </label>
      </div>
      <div class="checkboxes__item">
        <input type="checkbox" id="checkbox-ad">
        <label for="checkbox-ad">
          <strong>It's spam</strong>
          <p>This profile is an advertisement, or vandalism. It is not useful or relevant to the current topic.</p>
        </label>
      </div>
      <div class="checkboxes__item">
        <input type="checkbox" id="checkbox-other">
        <label for="checkbox-other">
          <strong>It's something else</strong>
          <p>This profile needs attention for a reason not listed above.</p>
        </label>
      </div>
    </fieldset>
    <div class="form__actions">
      <button class="button button--primary">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'MutateDemo',
  props: {
  },
  methods: {
    handleError() {
    },
  },
  data() {
    return {
      mutateProfile: null,
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
      margin-top: .5em;
      margin-bottom: 0;
    }
    .checkboxes__item input {
      position: absolute;
      left: 0;
      top: 1.25em;
    }
    .checkboxes__item input + label::before {
      content: '';
      width: 1em;
      height: 1em;
      border: 1px solid black;
      background-color: white;
      position: absolute;
      top: 1.375em;
      left: 0;
    }
    .checkboxes__item input:checked + label::before {
      background-color: black;
      background-image: url(data:image/svg+xml;base64,PHN2ZwogIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICB3aWR0aD0iMjQiCiAgaGVpZ2h0PSIyNCIKICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgZmlsbD0ibm9uZSIKICBzdHJva2U9IiNmZmZmZmYiCiAgc3Ryb2tlLXdpZHRoPSIyIgogIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIKICBzdHJva2UtbGluZWpvaW49InJvdW5kIgo+CiAgPHBvbHlsaW5lIHBvaW50cz0iMjAgNiA5IDE3IDQgMTIiIC8+Cjwvc3ZnPgo=);
      background-size: 1em;
      background-repeat: no-repeat;
    }
    .checkboxes__item input:focus {
      outline: none;
    }
    .checkboxes__item input:focus + label::before {
      border-color: var(--blue--60);
    }

  .form__actions {
    display: flex;
  }
    .form__actions > button {
      margin-left: auto;
    }
</style>
