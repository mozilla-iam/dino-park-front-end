<template>
  <div id="app" class="app-container">
    <TopBar></TopBar>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'PageHome',
  components: {
    TopBar,
    Footer,
  },
};
</script>

<style>
  :root {
  --lightGrey: #f4f4f4;
  --midGrey: #e5e5e5;
  --darkGrey: #777;
  --darkerGrey: #595959;
  --white: #fff;
  --black: #000;
  --backgroundColor: $lightGrey;
  --blue: #229DC4;
  --yellow: #fff44f;
  --darkYellow: #faba00;
  --green: #158640;
  --red: #ff4f5e;
  --turqoise: #59cbb7;

  --layerModal: 2;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: var(--lightGrey);
    font-family: "Open Sans", sans-serif;
    scroll-behavior: smooth;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }

  h1 {
    font-family: "Zilla Slab", sans-serif;
    font-weight: 400;
    font-size: 2em;
  }
  @media(min-width:50em) {
    h1 {
      font-size: 3em;
    }
  }

  h2 {
    font-weight: 400;
    font-size: 1.5em;
  }

  h3 {
    font-weight: 400;
    font-size: 1.25em;
    color: var(--darkGrey);
  }

  img,
  pre,
  audio,
  video,
  section {
    max-width: 100%;
    overflow: auto;
  }

  hr {
    border: 0;
    height: 1px;
    background-color: var(--midGrey);
  }

  a {
    color: var(--blue);
  }
  a:hover {
    color: var(--black);
  }

  .app-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  .visually-hidden {
    position: absolute;
    left: -9999em;
    top: -9999em;
  }

  /* best only use these classes on elements that
     do not have anything else, we don't want it
     to interfere with other display values */
  .hide-mobile {
    display: none;
  }
  @media(min-width:50em) {
    .hide-mobile {
      display: initial;
    }
    .hide-desktop {
      display: none;
    }
  }

  [tabindex="-1"]:focus {
    outline: none; /* if tabindex is -1, focus was
    set programmatically to something that is usually
    not focused (ie not an interactive element), in
    order to improve reading order in widgets; no
    outline seems sensible as it usually concerns
    large elements that people would not expect to
    have focus. */
  }

  .actions ul {
    display: grid;
    grid-gap: 1em;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    padding: 0;
    margin: 0;
  }
    .actions li {
      list-style: none;
    }
    .actions button {
      display: block;
      width:  100%;
    }
</style>
