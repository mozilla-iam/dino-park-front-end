import Vue from 'vue';
import Router from 'vue-router';
import PageHome from './pages/PageHome.vue';
import PageProfile from './pages/PageProfile.vue';
import PageOrgchart from './pages/PageOrgchart.vue';
import PageSearchResult from './pages/PageSearchResult.vue';
import PageUnknown from './pages/PageUnknown.vue';
import scrolling from './assets/js/scrolling';

Vue.use(Router);

function showUsername(username) {
  return username && !username.startsWith('r--');
}

function constructRouter(fluent) {
  const router = new Router({
    base: process.env.BASE_URL,
    mode: 'history',
    routes: [
      {
        path: '*',
        name: 'Unknown',
        component: PageUnknown,
        meta: { title: fluent.get('title_unknown') },
      },
      {
        path: '/',
        name: 'Home',
        component: PageHome,
        meta: { title: fluent.get('title_home') },
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
        meta: { title: fluent.get('title_profile_edit') },
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
        meta: { title: fluent.get('title_orgchart') },
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
        meta: { title: fluent.get('title_search') },
      },
    ],
    scrollBehavior(to, from) {
      if (to.hash) {
        return { selector: to.hash };
      }
      if (
        scrolling.toEdit(to) ||
        scrolling.fromEditToSelf(to, from, router.app)
      ) {
        return { selector: `#nav-${to.query.section}` };
      }
      if (scrolling.toProfile(to, from)) {
        return { x: 0, y: 0 };
      }
      return {};
    },
  });

  router.beforeEach((to, from, next) => {
    const {
      params: { username },
      meta: { title },
    } = to;
    switch (to.name) {
      case 'OrgchartHighlight':
        document.title = showUsername(username)
          ? fluent.get('title_orgchart_highlight', { username })
          : fluent.get('title_orgchart');
        break;
      case 'Profile':
        document.title = showUsername(username)
          ? fluent.get('title_profile_username', { username })
          : fluent.get('title_profile');
        break;
      default:
        document.title = title;
    }
    next();
  });

  return router;
}

export default constructRouter;
