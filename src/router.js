import Vue from 'vue';
import Router from 'vue-router';
import PageHome from './pages/PageHome.vue';
import PageProfile from './pages/PageProfile.vue';
import PageOrgchart from './pages/PageOrgchart.vue';
import PageSearchResult from './pages/PageSearchResult.vue';
import PageUnknown from './pages/PageUnknown.vue';
import scrolling from './assets/js/scrolling';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'Unknown',
      component: PageUnknown,
    },
    {
      path: '/',
      name: 'Home',
      component: PageHome,
    },
    {
      path: '/p/:username',
      name: 'Profile',
      component: PageProfile,
      props: true,
    },
    {
      path: '/e',
      name: 'Edit Profile',
      component: PageProfile,
      query: {
        section: ':section?',
      },
      props: true,
    },
    {
      path: '/o/highlight/:username/',
      name: 'OrgchartHighlight',
      component: PageOrgchart,
      props: true,
    },
    {
      path: '/o/:username?',
      name: 'Orgchart',
      component: PageOrgchart,
      props: true,
    },
    {
      path: '/s',
      query: {
        query: ':query',
        who: ':who',
      },
      name: 'Search',
      component: PageSearchResult,
      props: true,
    },
  ],
  scrollBehavior(to, from) {
    if (scrolling.toEdit(to)) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ selector: `#nav-${to.query.section}` });
        }, 50);
      });
    }
    if (scrolling.fromEditToSelf(to, from, router.app)) {
      return { selector: `#nav-${from.query.section}` };
    }
    if (scrolling.toProfile(to, from)) {
      return { x: 0, y: 0 };
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return {};
  },
});

function usernamePrefix(username) {
  if (username && !username.startsWith('r--')) {
    return `${username} - `;
  }
  return '';
}

router.beforeEach((to, from, next) => {
  switch (to.name) {
    case 'OrgchartHighlight':
      document.title = `${usernamePrefix(
        to.params.username,
      )}Org chart - Mozilla People Directory`;
      break;
    case 'Orgchart':
      document.title = 'Org chart - Mozilla People Directory';
      break;
    case 'Profile':
      document.title = `${usernamePrefix(
        to.params.username,
      )}Profile - Mozilla People Directory`;
      break;
    case 'Edit Profile':
      document.title = `Edit - Profile - Mozilla People Directory`;
      break;
    default:
      document.title = `${to.name} - Mozilla People Directory`;
  }
  next();
});

export default router;
