<template>
  <div :class="'person' + ( modifier ? ' ' + modifier : '')">
    <img v-if="picture" :src="picture.value" class="person__photo" alt="" aria-hidden="true" role="presentation" :title="firstName.value + ' ' + lastName.value">
    <div class="person__name-title">
      <div class="person__name"><a v-if="userId" :href="'/profile/'+ userId.value">{{ firstName.value }} {{ lastName.value }}</a></div>
      <div class="person__preferred-title">
        <template v-if="funTitle">{{ funTitle.value }}</template>
        <template v-else-if="businessTitle">{{ "businessTitle.value" }}</template>
      </div>
    </div>
    <div v-if="officeLocation" class="person__location">
      <div v-if="modifier === 'person--wide'" class="person__location-label">Location</div>
      {{ officeLocation.value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Person',
  props: {
    businessTitle: Object,
    modifier: String,
    userId: Object,
    firstName: Object,
    lastName: Object,
    officeLocation: Object,
    funTitle: Object,
    picture: Object,
  },
};
</script>

<style>
  .person {
    border: 1px solid var(--gray-30);
    margin-left: 1em;
    padding: 1em 1.5em;
    position: relative;
    background-color: var(--white);
  }
  .person + .person {
    margin-top: 1em;
  }
    .person > div {
      font-size: .875em; /* reset font size of all contents */
    }
    .person__name {
      font-weight: 700;
    }
      .person__name a {
        color: inherit;
        text-decoration: none;
      }
      .person__name a::after {
        content: '';
        width: 1em;
        height: 1em;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid transparent;
      }
      .person__name a:focus {
        outline: none;
      }
      .person__name a:focus::after {
        border: 1px solid var(--blue-60);
      }
    .person__preferred-title {
      color: var(--gray-50);
    }
    .person__photo {
      position: absolute;
      top: 1em;
      left: -1em;
      width: 2.25em;
      max-height: 2.25em;
      border-radius: var(--imageRadius);
    }
    .person__location-label {
      color: var(--gray-50);
    }

  .person--wide {
    display: grid;
    grid-template-columns: 1.5em 2fr 1fr 1.5em;
    grid-template-rows: 1em auto 1em;
    grid-column-gap: 1em;
  }
  @supports(display: grid) {
    .person--wide {
      padding: 0; /* with grid support, padding is done by the grid */
    }
  }
  .person--wide::before {
    grid-column: 1 / 2;
  }
    .person--wide .person__name-title {
      grid-column-start: 2;
      grid-row-start: 2;
    }
    .person--wide .person__location {
      grid-column: 3 / -1;
      grid-row: 1 / -1;
    }
    @supports(display:grid) {
      .person--wide .person__location {
        background-color: var(--gray-10);
        padding: 1em 1.5em;
      }
    }

  .person--borderless {
    border: 0;
    margin-left: 0;
    padding: 0;
    background-color: transparent;
    display: flex;
  }
    .person--borderless .person__photo {
      position: static;
      align-self: center;
      margin-right: 1em;
    }
  .person--avatar-only {
    display: inline-block;
    vertical-align: top;
    margin-bottom: .5em;
  }
    .person--avatar-only + .person--avatar-only {
      margin-top: 0;
    }
    .person--avatar-only .person__name-title {
      position: absolute;
      left: -9999em;
      top: -9999em;
    }
</style>
