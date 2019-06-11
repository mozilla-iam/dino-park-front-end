<template>
  <main class="home">
    <div class="home__intro">
      <img
        src="@/assets/images/laptop-phone.jpg"
        srcset="@/assets/images/laptop-phone@2x.jpg 2x"
      />
      <h1>Welcome to the Mozilla People Directory</h1>
      <p>
        A secure place to quickly find your team members and easily discover new
        ones, now in beta.
      </p>
      <p>
        <RouterLink :to="{ name: 'Orgchart' }" class="button"
          >View the Org Chart<Icon id="chevron-right" :width="24" :height="24"
        /></RouterLink>
      </p>
    </div>
    <CardRow>
      <Card>
        <div class="card__icon">
          <Icon id="irc" :width="64" :height="64"></Icon>
        </div>
        <h2>
          <a
            href="https://discourse.mozilla.org/c/iam/dinopark"
            target="_blank"
            rel="noopener noreferrer"
            >Your Feedback Matters</a
          >
        </h2>
        <p>
          Join us on Discourse and let us know how we can make the Mozilla
          Directory even better.
        </p>
      </Card>
      <Card>
        <div class="card__icon">
          <Icon id="lock" :width="64" :height="64"></Icon>
        </div>
        <h2>
          <a
            href="https://discourse.mozilla.org/t/dinopark-faq/33564"
            target="_blank"
            rel="noopener noreferrer"
            >Your Privacy is Protected</a
          >
        </h2>
        <p>
          Your Staff profile data is only visible to Staff and NDA’d people by
          default. You can edit this via your profile privacy settings. Read our
          <a
            href="https://discourse.mozilla.org/t/dinopark-faq/33564"
            target="_blank"
            rel="noopener noreferrer"
            >Discourse post</a
          >
          for details.
        </p>
      </Card>
      <Card>
        <div class="card__icon">
          <Icon id="edit" :width="64" :height="64"></Icon>
        </div>
        <h2>
          <a
            href="https://discourse.mozilla.org/t/edit-mode-announcement/38563"
            target="_blank"
            rel="noopener noreferrer"
            >Recent Additions</a
          >
        </h2>
        <p>
          Profile editing is now live with privacy controls and synchronized
          Workday information. Read more about this and improved people search
          capabilities in our
          <a
            href="https://discourse.mozilla.org/t/edit-mode-announcement/38563"
            target="_blank"
            >Discourse post</a
          >.
        </p>
      </Card>
    </CardRow>
  </main>
</template>

<script>
import Card from '@/components/ui/Card.vue';
import CardRow from '@/components/ui/CardRow.vue';
import Icon from '@/components/ui/Icon.vue';
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue';

export default {
  name: 'PageHome',
  components: {
    Card,
    CardRow,
    Icon,
    LoadingSpinner,
  },
};
</script>

<style>
.home {
  padding-top: 2em;
}
.home__intro {
  background: var(--white);
  padding: 2em;
  margin-bottom: 2em;
  box-shadow: var(--shadowCard);
  border-radius: var(--cardRadius);
}
.home__intro > img {
  margin-bottom: 1em;
}
.home__intro h1 {
  margin-bottom: 0;
  font-size: 2.5em;
  line-height: 1.1;
}
.home__intro p {
  color: var(--gray-50);
}
.home__intro .button {
  display: inline-block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.home__intro .button svg {
  margin-left: 1em;
}
.home__intro p:last-child {
  margin-bottom: 0;
}
@media (min-width: 50em) {
  .home__intro {
    display: inline-block;
    width: 100%;
    padding: 4em 4em 2em;
  }
  .home__intro > img {
    float: right;
    margin-left: 8em;
    max-width: 50%;
    margin-bottom: 0;
  }
}
</style>
