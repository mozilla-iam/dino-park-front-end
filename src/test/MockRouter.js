import VueRouter from 'vue-router';
import { mockRouterComponents } from 'vue-test-utils-helpers';
import routes from '../router';

export default {
  mock() {
    // stub out the components that the routes point to
    // as we don't want to load and render real components
    const clearedRoutes = mockRouterComponents(routes);
    return new VueRouter({
      mode: 'abstract',
      routes: clearedRoutes,
    });
  },
};
