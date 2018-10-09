<template>
  <nav class="profile__nav">
    <ul>
      <li><a href="#relations">Relations</a></li>
      <li><a href="#contact">Contact</a></li>
      <li><a href="#elsewhere">Find me elsewhere</a></li>
      <li><a href="#access-groups">Access groups</a></li>
      <li><a href="#vouches">Vouches</a></li>
      <li><a href="#tags">Tags</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ProfileNav',
};
</script>

<style>
  .profile__nav {
    grid-column: 1 / 2;
    grid-row: 2;
    margin-bottom: 2em;
    position: absolute;
    left: -9999em;
    top: -9999em;
    box-shadow: var(--shadowCard);
  }
    .profile__nav ul {
      padding: 0;
      margin: 0;
    }
    .profile__nav li {
      list-style: none;
    }
    .profile__nav a {
      display: block;
      padding: 1em;
      background: var(--white);
      text-decoration: none;
      border-bottom: 1px solid var(--lightGrey);
      color: var(--darkGrey);
    }
      .profile__nav a:hover {
        color: var(--blue-60);
        border-bottom: 1px solid currentColor;
      }
  @media(min-width:50em) {
    .profile__nav {
      position: static;
      position: sticky;
      top: 6em;
    }
  }
</style>
