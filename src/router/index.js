
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const files = require.context('.', true, /\.js$/);

let routes = [];

files.keys().forEach((key) => {
  if (key === './index.js') { return; }
  routes = routes.concat(files(key).default);
});

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/home/home').default
    }
  ].concat(routes)
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
