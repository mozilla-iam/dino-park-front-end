<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
};
</script>

<style>
.card {
  background-color: var(--white);
  box-shadow: var(--shadowCard);
  padding: 0;
  position: relative;
  border-radius: var(--cardRadius);
}

.card:hover {
  box-shadow: var(--shadowCardHover);
}

.card:hover .card__link h2 {
  text-decoration: underline;
}

.card__link {
  text-decoration: none;
  color: inherit;
}

.card--centered-content {
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;
  border: 1px solid var(--gray-30);
  box-shadow: none;
}
.card--centered-content ul {
  text-align: left;
}
.card h2 {
  font-weight: 700;
  font-size: 1.25em;
}
.card h2 > a {
  color: inherit;
  text-decoration: none;
  display: inline;
  border-bottom: 2px solid transparent;
  transition: border-bottom-color 0.1s ease-in-out;
}

.card h2 > a:hover,
.card h2 > a:focus {
  border-bottom: 2px solid var(--black);
}
.card h2 > a:hover::after,
.card h2 > a:focus::after {
  box-shadow: 0 0 0 4px var(--gray-30);
}
.card__icon {
  padding: 4em;
  background-color: var(--lightBlue);
  color: var(--blue-60);
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 0;
  border-radius: var(--cardRadius) var(--cardRadius) 0 0;
}
.card__content {
  padding: 1em;
}
.card h2 + p {
  margin-top: 0;
}
.card p {
  color: var(--gray-50);
}
.card img + h2 {
  margin-top: 1em;
}
</style>
