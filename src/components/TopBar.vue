<template>
  <header class="top-bar">
    <a href="/" class="top-bar__link top-bar__link--logo"><img src="@/assets/images/mozilla.svg" alt="Mozilla logo" width="90" /></a>
    <a href="/orgchart" class="top-bar__link">Org chart</a>
    <a href="/orgchart" class="top-bar__link">User menu</a>
  </header>
</template>

<script>
export default {
  name: 'TopBar',
};
</script>

<style>
  .top-bar {
    background-color: var( --white );
    border-bottom: 1px solid var(--midGrey);
    display: flex;
    align-items: center;
    margin-bottom: 2em;
  }
    .top-bar__link {
      border-left: 1px solid var(--midGrey);
      padding: .5em;
    }
    .top-bar__link--logo {
      margin-right: auto;
      margin-left: 0;
      padding: 1em;
      border-right: 1px solid var(--midGrey);
    }
    .top-bar__link--logo img {
      vertical-align: middle;
    }
</style>
