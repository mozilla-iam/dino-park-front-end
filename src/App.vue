<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/profile">Profile</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
  body {
    background: #f4f4f4;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }

  img,
  pre,
  audio,
  video { 
    max-width: 100%;
    overflow: auto;
  }

  .visually-hidden {
    position: absolute;
    left: -9999em;
  }
</style>
