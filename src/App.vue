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
  --gray-10: #f9f9fa;
  --gray-20: #ededf0;
  --gray-30: #d7d7db;
  --gray-40: #b1b1b3;
  --gray-50: #737373;
  --gray-60: #4a4a4f;
  --blue-60: #0060df;
  --white: #fff;
  --black: #000;

  --lightBlue: #f2fcfd;

  --layerTopBar: 2;
  --layerModal: 3;

  --shadowCard: 0 .25em .25em 0 rgba(210, 210, 210, .5);

  --imageRadius: .25em;
  --cardRadius: .125em;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: var(--gray-20);
    font-family: "Open Sans", sans-serif;
    scroll-behavior: smooth;
    margin: 0;
    padding-top: 4.5em;  /* allow for top bar */
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
    font-size: 1.5em;
  }
  @media(min-width:37.5em) {
    h1 {
      font-size: 2em;
    }
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
    font-size: 1em;
    color: var(--gray-50);
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
    background-color: var(--gray-20);
  }

  a {
    color: var(--blue-60);
  }
  a:hover {
    color: var(--black);
  }

  button {
    cursor: pointer; /* as per issue #50 :'( */;
  }

  .container {
    padding: 0 1em;
    width: 100%;
  }
  @media(min-width:50em) {
    .container {
      max-width: 64em;
      margin: 0 auto;
    }
  }

  .app-container {
    display: grid;
    grid-template-rows: auto 1fr auto; /* this assumes an app container with 3 things:; header, content, footer; it makes header and footer as tall as they need to be, then gives remaining whitespace to content.  */
    min-height: 100vh;
  }
    .app-container > * {
      min-width: 0; /* ‘auto’ is default for grid children,
      but that would break our responsiveness in this case */
    }
    .app-container > main {
      grid-row: 2 / 3;
    }
    .app-container > footer {
      grid-row: 3 / 4;
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
