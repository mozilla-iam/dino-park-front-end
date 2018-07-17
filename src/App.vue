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
  .visually-hidden {
    position: absolute;
    left: -9999em;
  }
</style>
