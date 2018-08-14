<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

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
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: var( --lightGrey );
    font-family: "Open Sans", sans-serif;
    scroll-behavior: smooth;
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
    font-size: 3em;
  }

  h2 {
    font-weight: 400;
    font-size: 1.5em;
  }

  h3 {
    font-weight: 700;
    font-size: 1.25em;
    color: var( --darkGrey );
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
    border-color: var( --midGrey );
  }

  a {
    color: var( --blue );
  }
  a:hover {
    color: var( --black );
  }

  .visually-hidden {
    position: absolute;
    left: -9999em;
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
