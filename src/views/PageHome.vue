<template>
  <main class="container home">
    <div class="home__intro">
      <img src="@/assets/images/laptop-phone.jpg"
           srcset="@/assets/images/laptop-phone@2x.jpg 2x" />
      <h1>Welcome to the Mozilla Directory</h1>
      <p>A secure place to quickly find your team members and easily discover new ones, now in beta.</p>
      <p><router-link :to="{ name: 'Orgchart' }" class="button">View the Org Chart<Icon id="chevron-right" :width="24" :height="24" /></router-link></p>
      <p><small>This is a beta version, let us know what you think.</small></p>
    </div>
    <CardRow>
      <Card>
        <div class="card__icon">
          <img src="@/assets/images/message-large.svg" alt="" role="presentation" />
        </div>
        <h2><a href="/discourse">Your feedback matters</a></h2>
        <p>Join us on Discourse and let us know how we can make the Mozilla Directory even better.</p>
      </Card>
      <Card>
        <div class="card__icon">
          <img src="@/assets/images/lock-large.svg" alt="" role="presentation" />
        </div>
        <h2><a href="/faq">Your privacy is protected</a></h2>
        <p>Your profile data is fully hidden from public view. Read our FAQ for details.</p>
      </Card>
      <Card modifier="card--centered-content">
          <img src="@/assets/images/edit-large.svg" alt="" role="presentation" />
          <h2>Upcoming Additions</h2>
          <p>Our next update will introduce profile editing and advanced privacy settings.</p>
      </Card>
    </CardRow>
  </main>
</template>

<script>
import Card from '@/components/Card.vue';
import CardRow from '@/components/CardRow.vue';
import Icon from '@/components/Icon.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

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
