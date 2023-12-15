import { Router, createRouter, createWebHistory } from 'vue-router';
import { routerBeforeEach } from './routerBefore';
import routeModuleList from './routes';
const { VITE_BASEROUTER } = import.meta.env;

const router: Router = createRouter({
  history: createWebHistory(VITE_BASEROUTER),
  routes: routeModuleList,
});
routerBeforeEach(router);
// 导出路由
export const routeList = router.getRoutes();
export default router;
