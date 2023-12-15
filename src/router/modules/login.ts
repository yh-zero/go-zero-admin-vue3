import { RouteRecordRaw } from 'vue-router';

const loginRouter: RouteRecordRaw[] = [
  {
    name: 'index',
    path: '/',
    redirect: '/login',
    children: [
      {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login.vue'),
        meta: {
          keepAlive: true,
          title: '登录',
        },
      },
    ],
  },
];

export default loginRouter;
