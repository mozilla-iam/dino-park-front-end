<template>
  <ul :class="{ 'curators-list': true, tiled: curators.length > 3 }">
    <li
      v-for="(curator, idx) in curators"
      class="curators-list__item"
      :key="idx"
    >
      <UserPicture
        :avatar="{ picture: curator.picture, username: curator.name }"
        class="curator-image"
        :size="40"
        :isStaff="true"
      />
      <p class="curator-name">{{ curator.name }}</p>
      <a :href="`mailto:${curator.email}`" class="curator-email">
        <Icon id="email" :width="16" :height="16" />
      </a>
    </li>
  </ul>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';
import UserPicture from '@/components/ui/UserPicture.vue';

const curatorDisplayThreshold = 3;
export default {
  name: 'AccessGroupCurators',
  components: { Icon, UserPicture },
  props: {
    title: String,
    editable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    curators() {
      return this.$store.state.accessGroup.curators;
    },
  },
  data() {
    return {
      threshold: curatorDisplayThreshold,
    };
  },
};
</script>

<style>
.curators-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.curators-list .curators-list__item {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0.5em 0;
}

.curators-list .curators-list__item:first-child {
  margin-top: 0;
}

.curators-list .curators-list__item:last-child {
  margin-bottom: 0;
}

.curators-list .curators-list__item:nth-child(odd) {
  background: var(--gray-10);
}

.curators-list .curators-list__item .curator-image {
  width: 10%;
}

.curators-list .curators-list__item .curator-image {
  margin: 0.5em 1em;
}

.curators-list .curators-list__item .curator-email {
  display: none;
}
.curators-list .curators-list__item .curator-name {
  width: 80%;
  margin: 0.6em 0;
  display: flex;
  align-items: center;
}

@media (min-width: 35em) {
  .curators-list:not(.tiled) .curators-list__item .curator-email {
    width: 20%;
  }

  .curators-list:not(.tiled) .curators-list__item .curator-email {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .curators-list.tiled {
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-row-gap: 1em;
  }

  .curators-list.tiled .curators-list__item {
    width: 5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }

  .curators-list.tiled .curators-list__item:nth-child(6n) {
    flex-basis: 100%;
  }
  .curators-list.tiled .curators-list__item:nth-child(odd) {
    background: initial;
  }
  .curators-list.tiled .curators-list__item .curator-name {
    display: none;
  }

  .curators-list.tiled .curators-list__item .curator-email {
    margin-top: 0.5em;
  }

  .curators-list.tiled .curators-list__item .curator-image {
    width: auto;
  }
}
</style>
