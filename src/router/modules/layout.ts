import { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout/index.vue';
const layoutRouter: RouteRecordRaw[] = [
  {
    name: '',
    path: '/systemLayout',
    component: Layout,
    children: [
      {
        name: 'system',
        path: '/system',
        component: () => import('@/views/system/page1/index.vue'),
        meta: {
          keepAlive: true,
          title: '系统',
        },
      },
      {
        name: 'system2',
        path: '/system2',
        component: () => import('@/views/system/page2/index.vue'),
        meta: {
          keepAlive: true,
          title: '系统2',
        },
      },
    ],
  },
];

export default layoutRouter;
