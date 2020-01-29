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
        <h1 class="visually-hidden">{{ fluent('error') }}</h1>
        <h2>{{ fluent('error_404') }}</h2>
        <p>
          {{ fluent('error_404', 'description') }}
        </p>
        <!-- TODO: Add this error message to fluent -->
        <p v-if="errorMessage">Error message: {{ errorMessage }}</p>
        <RouterLink :to="{ name: 'Home' }" class="button">{{
          fluent('error_404', 'link')
        }}</RouterLink>
        <p>
          <small>
            <Fluent
              id="error_issues"
              :tags="{
                github: { tag: 'a', href: globalLinks.githubIssues },
              }"
            />
          </small>
        </p>
      </template>
    </Error>
  </main>
</template>

<script>
import Error from '@/components/ui/Error.vue';
import LinksMixin from '@/components/_mixins/LinksMixin.vue';
import Fluent from '@/components/Fluent.vue';

export default {
  name: 'Page404',
  mixins: [LinksMixin],
  components: {
    Error,
    Fluent,
  },
  computed: {
    errorMessage() {
      if (this.$route.query.message) {
        return this.$route.query.message;
      }
      return null;
    },
  },
};
</script>

<style></style>
