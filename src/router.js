import Vue from 'vue';
import Router from 'vue-router';
import PageHome from './views/PageHome.vue';
import PageProfile from './views/PageProfile.vue';
import PageOrgchart from './views/PageOrgchart.vue';

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
      path: '/profile/:userId',
      name: 'Profile',
      component: PageProfile,
      props: true,
    },
    {
      path: '/org/:userId?',
      name: 'Orgchart',
      component: PageOrgchart,
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
