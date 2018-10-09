<template>
  <footer class="footer">
    <a href="/"><img src="@/assets/images/envelope.svg" alt="" aria-hidden="true" width="16" />Help desk</a>
    <a href="/"><img src="@/assets/images/legal.svg" alt="" aria-hidden="true" width="16" />Legal</a>
    <a href="/"><img src="@/assets/images/privacy.svg" alt="" aria-hidden="true" width="16" />Privacy</a>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
  .footer {
    background-color: var(--black);
    color: var(--white);
    text-align: center;
    margin-top: 2em;
  }
    .footer a {
      color: var(--gray-30);
      text-decoration: none;
      display: inline-block;
      vertical-align: middle;
      padding: 1em 2em;
    }
    .footer a:hover {
      color: inherit;
    }
    .footer a img {
      margin-right: .75em;
      display: inline-block;
      vertical-align: middle;
    }
</style>
