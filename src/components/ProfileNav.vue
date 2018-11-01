<template>
  <nav class="profile__nav">
    <ul>
      <li>
        <a href="#relations">
          <Icon id="org-chart" :width="24" :height="24" />
          <span class="profile__nav-label">Relations</span>
        </a>
      </li>
      <li>
        <a href="#contact">
          <Icon id="book" :width="24" :height="24" />
          <span class="profile__nav-label">Contact</span>
        </a>
      </li>
      <li>
        <a href="#other-accounts">
          <Icon id="at-sign" :width="24" :height="24" />
          <span class="profile__nav-label">Other accounts</span>
        </a>
      </li>
      <li>
        <a href="#access-groups">
          <Icon id="crown" :width="24" :height="24" />
          <span class="profile__nav-label">Access groups</span>
        </a>
      </li>
      <li>
        <a href="#tags">
          <Icon id="bookmark" :width="24" :height="24" />
          <span class="profile__nav-label">Tags</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  name: 'ProfileNav',
  components: {
    Icon,
  },
};
</script>

<style>
.profile__nav {
  margin-bottom: 2em;
  margin-left: -1em;
  margin-right: -1em;
  box-shadow: var(--shadowCard);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 4;
}
@media(min-width:50em) {
  .profile__nav {
    grid-column: 1 / 2;
    grid-row: 2 / 4;
    top: 6em;
    margin-left: 0;
    margin-right: 0;
  }
}
  .profile__nav ul {
    padding: 0;
    margin: 0;
    display: flex;
  }
  @media(min-width:50em) {
    .profile__nav ul {
      display: block;
    }
  }
  .profile__nav li {
    list-style: none;
    flex: 1;
  }
  .profile__nav a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 1.35em;
    background: var(--white);
    text-decoration: none;
    border-bottom: 2px solid var(--gray-20);
    color: var(--gray-50);
    text-align: center;
    font-size: .9em;
  }
  .profile__nav a:hover {
    color: var(--blue-60);
    border-bottom: 2px solid currentColor;
  }
  @media(min-width:50em) {
    .profile__nav a {
      text-align: left;
      flex-direction: row;
      justify-content: start;
      padding: 1.5em;
    }
  }
    .profile__nav a svg {
      order: 2;
      margin-top: .5em;
    }
    @media (min-width:50em) {
      .profile__nav a svg {
        order: 0;
        margin-top: 0;
        margin-right: 1em;
      }
    }
  .profile__nav-label {
    position: absolute;
    left: -9999em;
  }
  @media(min-width:37.5em) {
    .profile__nav-label {
      position: static;
    }
  }
</style>
