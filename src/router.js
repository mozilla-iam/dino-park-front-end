import Vue from 'vue';
import Router from 'vue-router';
import PageHome from './pages/PageHome.vue';
import PageProfile from './pages/PageProfile.vue';
import PageOrgchart from './pages/PageOrgchart.vue';
import PageSearchResult from './pages/PageSearchResult.vue';
import PageUnknown from './pages/PageUnknown.vue';
import PageAccessGroup from './pages/PageAccessGroup.vue';
import AccessGroupTerms from './components/access_group/AccessGroupTerms.vue';
import AccessGroupEdit from './components/access_group/AccessGroupEdit.vue';
import AccessGroupView from './components/access_group/AccessGroupView.vue';
import AccessGroupCreate from './components/access_group/AccessGroupCreate.vue';
import scrolling from './assets/js/scrolling';

Vue.use(Router);
export const ACCESS_GROUP_CREATE_PAGE = 'Create Access Group';
export const ACCESS_GROUP_EDIT_PAGE = 'Edit Access Group';
export const ACCESS_GROUP_TOS_PAGE = 'Access Group TOS';
export const ACCESS_GROUP_PAGE = 'Access Group';
export const ACCESS_GROUP_LEAVE_CONFIRMATION_PAGE =
  'Access Group Confirm Leave';

function showUsername(username) {
  return username && !username.startsWith('r--');
}

async function resolvePromisesSerially(promises, resolvers) {
  try {
    for (let i = 0, len = promises.length; i < len; i += 1) {
      resolvers[i](await promises[i]());
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

const ACCESS_GROUP_ROUTES = [
  {
    path: '/a/create',
    name: ACCESS_GROUP_CREATE_PAGE,
    component: AccessGroupCreate,
    props: true,
    meta: { key: 'access-group' },
  },
  {
    path: '/a/:groupname',
    component: PageAccessGroup,
    params: {
      groupname: ':groupname',
    },
    props: true,
    children: [
      {
        path: '',
        name: ACCESS_GROUP_PAGE,
        component: AccessGroupView,
        props: true,
        meta: { key: 'access-group' },
      },
      {
        path: 'edit',
        name: ACCESS_GROUP_EDIT_PAGE,
        component: AccessGroupEdit,
        query: {
          section: ':section?',
        },
        props: true,
        meta: { key: 'access-group' },
      },
      {
        path: 'tos',
        name: ACCESS_GROUP_TOS_PAGE,
        component: AccessGroupTerms,
        query: {
          accept: ':accept?',
        },
        props: true,
        meta: { key: 'access-group' },
      },
      {
        path: 'leave',
        name: ACCESS_GROUP_LEAVE_CONFIRMATION_PAGE,
        component: AccessGroupView,
        props: true,
        meta: { key: 'access-group', leave: true },
      },
    ],
  },
];

export default class DPRouter {
  /**
   * We are using the "meta: {key: ''}" field here to denote class name and page.
   * Since we are using the url to hold the state of the page, this is a field to denote which general page we are on
   */
  // TODO: Add fluent translations the the rest of the pages here
  constructor(features, fluent) {
    this.fluent = fluent;
    const initRouter = new Router({
      base: process.env.BASE_URL,
      mode: 'history',
      routes: this.getRoutes(features),
      scrollBehavior(to, from) {
        if (to.hash) {
          return { selector: to.hash };
        }
        if (
          scrolling.toEdit(to) ||
          scrolling.fromEditToSelf(to, from, initRouter)
        ) {
          return { selector: `#nav-${to.query.section}` };
        }
        if (scrolling.toProfile(to, from)) {
          return { x: 0, y: 0 };
        }
        return {};
      },
    });
    this.router = initRouter;
  }
  get vueRouter() {
    return this.router;
  }
  processRoutes() {
    this.router.beforeEach((to, from, next) => {
      const {
        params: { username },
        name,
      } = to;
      switch (name) {
        // TODO: Add fluent translations the the rest of the pages here
        case 'OrgchartHighlight':
          document.title = showUsername(username)
            ? this.fluent.get('title_orgchart_highlight', { username })
            : this.fluent.get('title_orgchart');
          break;
        case 'Orgchart':
          document.title = 'Org chart - Mozilla People Directory';
          break;
        case 'Profile':
          document.title = showUsername(username)
            ? this.fluent.get('title_profile_username', { username })
            : this.fluent.get('title_profile');
          break;
        case 'Edit Profile':
          document.title = `Edit - Profile - Mozilla People Directory`;
          break;
        case ACCESS_GROUP_TOS_PAGE:
          document.title =
            'Access Group Terms of Service - Mozilla People Directory';
          break;
        default:
          document.title = `${name} - Mozilla People Directory`;
      }
      next();
    });
  }
  getRoutes(features) {
    let featureEnabledRoutes = [];
    if (features['accessGroupsToggle']) {
      featureEnabledRoutes = [...featureEnabledRoutes, ...ACCESS_GROUP_ROUTES];
    }
    return [
      {
        path: '*',
        name: 'Unknown',
        component: PageUnknown,
        query: {
          message: ':message?',
        },
        meta: { title: this.fluent.get('title_unknown'), key: 'unknown' },
      },
      {
        path: '/',
        name: 'Home',
        component: PageHome,
        meta: { key: 'home', title: this.fluent.get('title_home') },
      },
      {
        path: '/p/:username',
        name: 'Profile',
        component: PageProfile,
        props: true,
        meta: { key: 'profile' },
      },
      {
        path: '/e',
        name: 'Edit Profile',
        component: PageProfile,
        query: {
          section: ':section?',
        },
        props: true,
        meta: { key: 'profile', title: this.fluent.get('title_profile_edit') },
      },
      {
        path: '/o/highlight/:username/',
        name: 'OrgchartHighlight',
        component: PageOrgchart,
        props: true,
        meta: { key: 'orgchart' },
      },
      {
        path: '/o/:username?',
        name: 'Orgchart',
        component: PageOrgchart,
        props: true,
        meta: { key: 'orgchart', title: this.fluent.get('title_orgchart') },
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
        meta: { key: 'search', title: this.fluent.get('title_search') },
      },
      ...featureEnabledRoutes,
    ];
  }
  async runFetches(store) {
    await this.router.beforeEach(async (to, from, next) => {
      const promises = [];
      const resolvers = [];

      // Don't try to load data
      if (
        // cond: if you're on the create page
        to.name === ACCESS_GROUP_CREATE_PAGE ||
        // cond: if you're just changing tabs on the edit page
        (to.name === ACCESS_GROUP_EDIT_PAGE &&
          from.name === ACCESS_GROUP_EDIT_PAGE &&
          to.query.section &&
          from.query.section &&
          to.query.section !== from.query.section) ||
        // cond: if you're going from the edit page to the view page
        (to.name === ACCESS_GROUP_PAGE &&
          from.name === ACCESS_GROUP_EDIT_PAGE) ||
        // cond: if you're going from the view page to the edit page
        (to.name === ACCESS_GROUP_EDIT_PAGE && from.name === ACCESS_GROUP_PAGE)
      ) {
        if (to.name === ACCESS_GROUP_CREATE_PAGE) {
          store.dispatch('completeLoading');
          next();
          return;
        } else if (
          store.getters['accessGroup/getMemberCount'] !==
          store.getters['accessGroup/getMembers'].length
        ) {
          promises.push(() =>
            store.dispatch('accessGroup/fetchMembers', to.params.groupname)
          );
          resolvers.push(data => {});
          await resolvePromisesSerially(promises, resolvers);
          store.dispatch('completeLoading');
        }
        next();
        return;
      }
      // TODO: After using these for testing, replace the old actions with these
      promises.push(() => store.dispatch('userV2/fetchProfile'));
      resolvers.push(() => store.dispatch('userV2/fetchInvitations'));
      if (to.meta.key === 'access-group') {
        // eslint-disable-next-line
        promises.push(() =>
          store.dispatch('accessGroup/fetchGroup', to.params.groupname)
        );
        resolvers.push(data => {});
        if (to.name !== ACCESS_GROUP_TOS_PAGE) {
          promises.push(() =>
            store.dispatch('accessGroup/fetchMembers', to.params.groupname)
          );

          resolvers.push(data => {});
        }
        if (
          to.name === ACCESS_GROUP_TOS_PAGE ||
          to.name === ACCESS_GROUP_EDIT_PAGE
        ) {
          promises.push(() => store.dispatch('accessGroup/fetchTerms'));
          resolvers.push(data => {});
        }
        if (to.name === ACCESS_GROUP_EDIT_PAGE) {
          promises.push(() => store.dispatch('accessGroup/fetchInvitations'));
          promises.push(() => store.dispatch('accessGroup/fetchRequests'));
          resolvers.push(data => {});
          resolvers.push(data => {});
        }
      }
      try {
        await resolvePromisesSerially(promises, resolvers);
        store.dispatch('completeLoading');
        next();
      } catch (e) {
        store.dispatch('completeLoading');
        console.error('Caught dispatch error: ', e);
        next(`/error?message=${e}`);
      }
    });
  }
}
