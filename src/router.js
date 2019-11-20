import Vue from 'vue';
import Router from 'vue-router';
import PageHome from './pages/PageHome.vue';
import PageProfile from './pages/PageProfile.vue';
import PageOrgchart from './pages/PageOrgchart.vue';
import PageSearchResult from './pages/PageSearchResult.vue';
import PageUnknown from './pages/PageUnknown.vue';
import PageAccessGroup from './pages/PageAccessGroup.vue';
import PageAccessGroupTerms from './pages/PageAccessGroupTerms.vue';
import PageAccessGroupEdit from './pages/PageAccessGroupEdit.vue';
import scrolling from './assets/js/scrolling';
import store from './store';

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'Unknown',
      component: PageUnknown,
      query: {
        message: ':message?',
      },
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
    {
      path: '/a/:groupid',
      name: 'Access Group',
      component: PageAccessGroup,
      props: true,
    },
    {
      path: '/a/:groupid/tos',
      name: 'Access Group TOS',
      component: PageAccessGroupTerms,
      props: true,
    },
    {
      path: '/a/:groupid/edit',
      name: 'Edit Access Group',
      component: PageAccessGroupEdit,
      query: {
        section: ':section?',
      },
      props: true,
    },
  ],
  scrollBehavior(to, from) {
    if (to.hash) {
      return { selector: to.hash };
    }
    if (scrolling.toEdit(to) || scrolling.fromEditToSelf(to, from, router.app)) {
      return { selector: `#nav-${to.query.section}` };
    }
    if (scrolling.toProfile(to, from)) {
      return { x: 0, y: 0 };
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

const ACCESS_GROUP_PAGES = ['Access Group', 'Edit Access Group', 'Access Group TOS'];

router.beforeEach((to, from, next) => {
  switch (to.name) {
    case 'OrgchartHighlight':
      document.title = `${usernamePrefix(
        to.params.username
      )}Org chart - Mozilla People Directory`;
      break;
    case 'Orgchart':
      document.title = 'Org chart - Mozilla People Directory';
      break;
    case 'Profile':
      document.title = `${usernamePrefix(
        to.params.username
      )}Profile - Mozilla People Directory`;
      break;
    case 'Edit Profile':
      document.title = `Edit - Profile - Mozilla People Directory`;
      break;
    case 'Access Group TOS':
      store
        .dispatch('fetchAccessGroupTOS')
        .then(data => {
          console.log('Fetched terms: ', data);
        })
        .catch(error => {
          console.error('Caught dispatch error: ', error);
          next(`/error?message=${error}`);
        });
      document.title = 'Access Group Terms of Service - Mozilla People Directory';
      break;
    default:
      document.title = `${to.name} - Mozilla People Directory`;
  }
  if (ACCESS_GROUP_PAGES.includes(to.name)) {
    // eslint-disable-next-line
    store
      .dispatch('fetchAccessGroup')
      .then(data => {
        console.log('Fetched group: ', data);
      })
      .catch(error => {
        console.error('Caught dispatch error: ', error);
        next(`/error?message=${error}`);
      });
  }
  next();
});

export default router;
