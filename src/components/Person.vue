<template>
  <div :class="'person' + ( modifier ? ' ' + modifier : '')">
    <UserPicture :picture="picture" :username="userId.value" :title="firstName.value + ' ' + lastName.value" :size="40" dinoType="Staff" />
    <router-link :to="{ name: 'Profile', params: { username } }">
      <div class="person__name-title">
        <div class="person__name">
            {{ firstName }} {{ lastName.value }}
        </div>
        <div class="person__preferred-title">
          <template v-if="funTitle">{{ funTitle }}</template>
          <template v-else-if="title">{{ "title" }}</template>
        </div>
      </div>
    </router-link>
    <div v-if="officeLocation" class="person__location">
      <div v-if="modifier === 'person--wide'" class="person__location-label">Location</div>
      {{ officeLocation }}
    </div>
  </div>
</template>

<script>
import DinoType from '@/components/DinoType.vue';
import UserPicture from '@/components/UserPicture.vue';

export default {
  name: 'Person',
  props: {
    title: String,
    modifier: String,
    useername: String,
    firstName: String,
    lastName: String,
    officeLocation: String,
    funTitle: String,
    picture: String,
  },
  components: {
    DinoType,
    UserPicture,
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
      .person a {
        color: inherit;
        text-decoration: none;
      }
      .person a::after {
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
      .person a:focus {
        outline: none;
      }
      .person a:focus::after {
        outline: 1px solid var(--blue-60);
      }
    .person__preferred-title {
      color: var(--gray-50);
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
    .person--borderless .user-picture {
      align-self: center;
      margin-right: 1em;
    }
  .person--avatar-only {
    display: inline-block;
    vertical-align: top;
    margin-bottom: .5em;
    margin-right: 1em;
  }
    .person--avatar-only + .person--avatar-only {
      margin-top: 0;
    }
    .person--avatar-only .person__name-title {
      position: absolute;
      width: 1px;
      height: 1px;
      clip: rect(1px, 1px, 1px, 1px);
      overflow: hidden;
    }
    .person--avatar-only .user-picture {
      margin-right: 0;
    }
</style>
