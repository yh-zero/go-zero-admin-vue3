import { RouteRecordRaw } from 'vue-router';

const errorRouter: RouteRecordRaw[] = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      keepAlive: true,
      title: '页面不存在',
    },
  },
  {
    name: '500',
    path: '/500',
    component: () => import('@/views/error/500.vue'),
    meta: {
      keepAlive: true,
      title: '出错了',
    },
  },
  {
    path: '/:catchAll(.*)',
    meta: {
      closeTab: true,
    },
    component: () => import('@/views/error/404.vue'),
  },
];

export default errorRouter;
