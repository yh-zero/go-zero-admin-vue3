import { RouteRecordRaw } from 'vue-router';

const errorRouter: RouteRecordRaw[] = [
  {
    name: '/NotFound',
    path: '/404',
    component: () => import('@/error/404.vue'),
    meta: {
      keepAlive: true,
      title: '页面不存在',
    },
  },
  {
    name: '/Error',
    path: '/500',
    component: () => import('@/error/500.vue'),
    meta: {
      keepAlive: true,
      title: '出错了',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
];

export default errorRouter;
