import Vue from 'vue';
import Router from 'vue-router';
import PageHome from './views/PageHome.vue';
import PageProfile from './views/PageProfile.vue';
import MutateDemo from './views/MutateDemo.vue';

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
    {
      path: '/mutation-demo',
      name: 'Mutation demo',
      component: MutateDemo,
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
