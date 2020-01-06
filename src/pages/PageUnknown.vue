<template>
  <main>
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
          <small>
            Please submit all bugs or issues to
            <a :href="globalLinks.githubIssues">the project's GitHub issue
            repository</a>.
          </small>
        </p>
      </template>
    </Error>
  </main>
</template>

<script>
import Error from '@/components/ui/Error.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';

export default {
  name: 'Page404',
  mixins: [LinksMixin],
  components: {
    Error,
  },
};
</script>

<style></style>
