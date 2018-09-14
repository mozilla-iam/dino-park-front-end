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
      <img src="@/assets/images/chevron-up-white.svg" alt="" width="16" aria-hidden="true" />
    </template>
    <template slot="icon-collapsed">
      <img src="@/assets/images/chevron-down-white.svg" alt="" width="16" aria-hidden="true" />
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
      color: var(--blue);
    }
    .contact-me__button {
      margin: 0 auto;
      margin-bottom: 2em;
    }
</style>
