<template>
  <main class="container home">
    <div class="intro">
      <h1>DinoPark</h1>
      <p>Welcome to our great Mozilla directory</p>
      <p>This site lists all core individuals and groups that participate in the Mozilla Project. We call ourselves Mozillians and this is where we connect and share with one another.</p>
    </div>
  </main>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'PageHome',
  components: {
    LoadingSpinner,
  },
};
</script>

<style>
  .home {
    padding-top: 2em;
  }
  .intro {
    text-align: center;
    margin-bottom: 4em;
  }
  .home p:first-of-type {
    font-size: 1.5em;
  }
  main {
    max-width: 50em;
    margin: 0 auto;
  }
</style>
