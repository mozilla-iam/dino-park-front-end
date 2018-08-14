import Vue from 'vue';
import Router from 'vue-router';
import PageHome from './views/PageHome.vue';
import PageProfile from './views/PageProfile.vue';

Vue.use(Router);

const router = new Router({
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
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.name} - Mozillians`;
  window.focus();
  next();
});

export default router;
