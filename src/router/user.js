export default [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/user/login'),
    meta: {
      auth: true
    }
  }
];
