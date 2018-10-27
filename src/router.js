import Vue from 'vue';
import Router from 'vue-router';
import PageHome from './views/PageHome.vue';
import PageProfile from './views/PageProfile.vue';
import PageOrgchart from './views/PageOrgchart.vue';
import PageSearchResult from './views/PageSearchResult.vue';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome,
    },
    {
      path: '/p/:userId',
      name: 'Profile',
      component: PageProfile,
      props: true,
    },
    {
      path: '/o/highlight/:userId/',
      name: 'OrgchartHighlight',
      component: PageOrgchart,
      props: true,
    },
    {
      path: '/o/:userId?',
      name: 'Orgchart',
      component: PageOrgchart,
      props: true,
    },
    {
      path: '/s',
      query: {
        query: ':query',
        scope: ':scope',
      },
      name: 'Search',
      component: PageSearchResult,
      props: true,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.name} - Mozillians`;
  window.focus();
  next();
});

export default router;
