<template>
  <nav class="profile__nav">
    <ul>
      <li v-for="(link, index) in profileLinks" :key="index">
        <a
          v-if="link.id === currentNavItem"
          :href="'#' + link.id"
          class="profile__nav-link profile__nav-link--current"
          @click="updateCurrentItem(link.id)"
        >
          <Icon :id="link.iconId" :width="24" :height="24" />
          <span class="profile__nav-label">{{ link.label }}</span>
        </a>
        <a
          v-else
          :href="'#' + link.id"
          :class="'profile__nav-link'"
          @click="updateCurrentItem(link.id)"
        >
          <Icon :id="link.iconId" :width="24" :height="24" />
          <span class="profile__nav-label hide-mobile">{{ link.label }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Icon from '@/components/ui/Icon.vue';

export default {
  name: 'ProfileNav',
  props: {
    links: Array,
    allowStaffOnlyFields: Boolean,
  },
  components: {
    Icon,
  },
  computed: {
    profileLinks() {
      if (this.scope.isStaff && this.allowStaffOnlyFields) {
        return this.links;
      }

      return this.links.filter((link) => {
        if (!link.staffOnly) {
          return link;
        }
        return null;
      });
    },
  },
  methods: {
    updateCurrentItem(id) {
      this.currentNavItem = id;
    },
  },
  data() {
    return {
      currentNavItem: null,
    };
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
  top: 6.2em;
  z-index: var(--layerProfileNav);
}
@media (min-width: 57.5em) {
  .profile__nav {
    border-radius: var(--imageRadius);
    grid-column: 1 / 2;
    grid-row: 2 / 6;
    top: 8em;
    margin-left: 0;
    margin-right: 0;
  }
}
.profile__nav ul {
  padding: 0;
  margin: 0;
  display: flex;
  background: var(--white);
}
@media (min-width: 57.5em) {
  .profile__nav ul {
    display: block;
  }
}
.profile__nav li {
  list-style: none;
  flex: 1;
}
@media (min-width: 57.5em) {
  .profile__nav li:first-child,
  .profile__nav li:first-child a {
    border-radius: var(--cardRadius) var(--cardRadius) 0 0;
  }
  .profile__nav li:last-child,
  .profile__nav li:last-child a {
    border-radius: 0 0 var(--imageRadius) var(--imageRadius);
  }
}

.profile__nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1.35em 0.5em;
  text-decoration: none;
  border-bottom: 2px solid var(--gray-20);
  border-left: 1px solid var(--grey-30);
  color: var(--gray-50);
  text-align: center;
}
li:first-child .profile__nav-link {
  border-left: 0;
}
.profile__nav-link:hover {
  color: var(--blue-60);
  border-bottom: 2px solid currentColor;
}
.profile__nav-link:focus {
  z-index: var(--layerOne);
}
@media (min-width: 57.5em) {
  .profile__nav-link {
    text-align: left;
    flex-direction: row;
    justify-content: start;
    padding: 1.5em;
  }
}
.profile__nav-link svg {
  order: 2;
  margin-top: 0.5em;
}
@media (min-width: 57.5em) {
  .profile__nav-link svg {
    order: 0;
    margin-top: 0;
    margin-right: 1em;
  }
}
.profile__nav-label {
  visibility: visible;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
}
@media (min-width: 57.5em) {
  .profile__nav-label {
    position: static;
    top: inherit;
    left: inherit;
    width: inherit;
  }
}
.profile__nav-link--current {
  color: var(--blue-60);
}
</style>
