<template>
  <ShowMore buttonText="Contact me" alternateButtonText="Contact me" :expanded="false" buttonClass="button button--icon-end contact-me__button" :transition="true">
    <template slot="overflow">
      <ul class="contact-me">
        <li class="contact-me__item">
          <a href="tel:568-830-0598" class="contact-me__pair">
            <span class="contact-me__key">Call me</span>
            <span class="contact-me__value">568-830-0598</span>
          </a>
        </li>
        <li class="contact-me__item">
          <a href="tel:hmitsch@mozilla.com" class="contact-me__pair">
            <span class="contact-me__key">Email me</span>
            <span class="contact-me__value">hmitsch@mozilla.com</span>
          </a>
        </li>
      </ul>
    </template>
    <template slot="icon-expanded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </template>
    <template slot="icon-collapsed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </template>
  </ShowMore>
</template>

<script>
import ShowMore from '@/components/functional/ShowMore.vue';

export default {
  name: 'ContactMe',
  components: {
    ShowMore,
  },
};
</script>

<style>
  .contact-me {
    background-color: var(--white);
    box-shadow: 0 .125em .25em .125em var(--midGrey);
    text-align: left;
    padding-left: 0;
    margin: 0 .5em; /* ensure there's enough space for shadow */
    z-index: calc(var(--modalLayer) - 1);
    position: absolute;
    top: 2.5em;
    left: -2em;
  }
    .contact-me__item {
      list-style: none;
      padding-left: 0;
      border-top: 1px solid var(--midGrey);
    }
    .contact-me__item:first-child {
      border-top: 0;
    }
    .contact-me__pair {
      display: flex;
      text-decoration: none;
      color: inherit;
      padding: .5em;
      min-width: 20em;
    }
    .contact-me__pair:hover {
      background-color: var(--midGrey);
    }
    .contact-me__key {
      flex: none;
      width: 30%;
      padding-right: 1em;
    }
    .contact-me__value {
      flex: 1;
      color: var(--blue-60);
    }
    .contact-me__button {
      margin: 0 auto;
      margin-bottom: 2em;
    }
</style>
