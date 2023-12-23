import { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout/index.vue';
const layoutRouter: RouteRecordRaw[] = [
  {
    name: 'sys',
    path: '/sys',
    component: Layout,
    children: [
      // 这里的是放 layout里面的页面 动态获取
    ],
  },
];

export default layoutRouter;
