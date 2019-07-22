<template>
  <div class="card" v-on:click="onCardClicked">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  methods: {
    /**
     * Determine if card either has a 'primary link' defined by '.card__link'
     * or if the clicked item is itself an anchor tag. If it has either, redirect
     * according to link requirements.
     */
    onCardClicked(e) {
      const openLink = (href, isBlank = true) => {
        if (isBlank) {
          window.open(href, '_blank');
        } else {
          window.location.href = href;
        }
        e.preventDefault();
      };
      if (e.target.tagName.toLowerCase() === 'a') {
        openLink(e.target.href, e.target.target === '_blank');
      } else {
        const cardLink = this.$el.querySelector('.card__link');
        if (cardLink && cardLink.href) {
          openLink(cardLink.href, cardLink.target === '_blank');
        }
      }
    },
  },
};
</script>

<style>
.card {
  background-color: var(--white);
  box-shadow: var(--shadowCard);
  padding: 0;
  position: relative;
  border-radius: var(--cardRadius);
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadowCardHover);
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
  border-bottom: 2px solid transparent;
  transition: border-bottom-color 0.1s ease-in-out;
  display: inline-block;
}

.card:hover h2,
.card:focus h2 {
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
