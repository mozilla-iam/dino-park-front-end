import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.name} - Mozillians`;
  window.focus();
  next();
});

export default router;
