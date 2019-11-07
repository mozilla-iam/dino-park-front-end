<template>
  <ul :class="{ 'curators-list': true, tiled: curators.length > 3 }">
    <li
      v-for="(curator, idx) in curators"
      class="curators-list__item"
      :key="idx"
    >
      <UserPicture
        :avatar="{ picture: curator.imageUrl, username: curator.name }"
        class="curator-image"
        :size="40"
        :isStaff="true"
      />
      <p class="curator-name">{{ curator.name }}</p>
      <a href="#" class="curator-email">
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
    curatorsList: Array,
  },
  computed: {
    curators() {
      return this.curatorsList;
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

.curators-list:not(.tiled) .curators-list__item {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0.5em 0;
}

.curators-list:not(.tiled) .curators-list__item:first-child {
  margin-top: 0;
}

.curators-list:not(.tiled) .curators-list__item:last-child {
  margin-bottom: 0;
}

.curators-list:not(.tiled) .curators-list__item:nth-child(odd) {
  background: var(--gray-10);
}

.curators-list:not(.tiled) .curators-list__item .curator-image {
  width: 10%;
}

.curators-list:not(.tiled) .curators-list__item .curator-email {
  width: 20%;
}

.curators-list:not(.tiled) .curators-list__item .curator-image {
  margin: 0.5em 1em;
}

.curators-list:not(.tiled) .curators-list__item .curator-email {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.curators-list:not(.tiled) .curators-list__item .curator-name {
  width: 80%;
  margin: 0.6em 1em;
  display: flex;
  align-items: center;
}
</style>
