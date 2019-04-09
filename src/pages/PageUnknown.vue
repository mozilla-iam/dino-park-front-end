<template>
  <main class="container">
    <Error>
      <template slot="image">
        <img
          src="@/assets/images/dino-1.png"
          srcset="
            @/assets/images/dino-1@2x.png 2x,
            @/assets/images/dino-1@3x.png 3x
          "
        />
      </template>
      <template slot="message">
        <h1 class="visually-hidden">Error</h1>
        <h2>This page isn't available</h2>
        <p>
          Sorry, the link you followed may be broken or the page may have been
          removed.
        </p>
        <RouterLink :to="{ name: 'Home' }" class="button"
          >Go to homepage</RouterLink
        >
        <p>
          <small
            >Please submit all bugs or issues to the project's Github issue repository (link in footer).</small
          >
        </p>
      </template>
    </Error>
  </main>
</template>

<script>
import Error from '@/components/ui/Error.vue';

export default {
  name: 'Page404',
  components: {
    Error,
  },
};
</script>

<style></style>
