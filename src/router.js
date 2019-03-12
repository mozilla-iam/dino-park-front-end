import Vue from 'vue';
import Router from 'vue-router';
import PageHome from './pages/PageHome.vue';
import PageProfile from './pages/PageProfile.vue';
import PageOrgchart from './pages/PageOrgchart.vue';
import PageSearchResult from './pages/PageSearchResult.vue';
import PageUnknown from './pages/PageUnknown.vue';

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
      path: '/p/:username/e',
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
});

router.beforeEach((to, from, next) => {
  switch (to.name) {
    case 'OrgchartHighlight':
      document.title = `${to.params.username} - Org chart - Mozilla Directory`;
      break;
    case 'Orgchart':
      document.title = 'Org chart - Mozilla Directory';
      break;
    case 'Profile':
      document.title = `${to.params.username} - Profile - Mozilla Directory`;
      break;
    default:
      document.title = `${to.name} - Mozilla Directory`;
  }
  next();
});

router.afterEach((to, from) => {
  // we don't want to do anything if `path` is same (ie when only hash changes)
  if (to.name === 'Profile' && to.path !== from.path) {
    Vue.nextTick(() => {
      window.scrollTo(0, 0);
    });
  }
});

export default router;
