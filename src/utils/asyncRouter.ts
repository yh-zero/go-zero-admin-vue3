import { RouterType, MenuRespType } from '@/types/layout';
import { RouteRecordRaw } from 'vue-router';

import router from '@/router';
const viewModules = import.meta.glob('../views/**/*.vue');
const pluginModules = import.meta.glob('../plugins/**/*.vue');

// 动态添加路由
export const setAsyncRouter = (route: RouteRecordRaw) => {
  router.addRoute(route);
  return Promise.resolve();
};

// 路由菜单返回列表转换路由格式 MenuRespType => RouterType
export const asyncMenuToRouter = (menus: MenuRespType[]): RouterType[] => {
  const routerList: RouterType[] = [];
  menus.forEach(menu => {
    const route: RouterType = {
      componentPath: menu.component,
      path: menu.path,
      name: menu.name,
      hidden: menu.hidden,
      meta: menu.meta,
      children: [],
    };
    if (menu.children) {
      route.children = asyncMenuToRouter(menu.children);
    }
    routerList.push(route);
  });
  return routerList;
};

// 根据接口返回的页面路径 获取对应的页面
export const asyncRouterHandle = (asyncRouter: RouterType[]): RouteRecordRaw[] => {
  const routerList: RouteRecordRaw[] = [];
  asyncRouter.forEach(item => {
    const routers: RouteRecordRaw = {
      path: item.path, //路由路径
      name: item.name, //路由name
      component: null, //页面路径 //'view/layout/index.vue'
      meta: item.meta, //
      children: [],
    };
    if (item.componentPath && typeof item.componentPath === 'string') {
      if (item.componentPath.split('/')[0] === 'views') {
        routers.component = dynamicImport(viewModules, item.componentPath);
      } else if (item.componentPath.split('/')[0] === 'plugin') {
        routers.component = dynamicImport(pluginModules, item.componentPath);
      }
    }
    if (item.children) {
      routers.children = asyncRouterHandle(item.children as RouterType[]);
    }
    routerList.push(routers);
  });
  return routerList;
};
// 匹配对应的页面
function dynamicImport(dynamicViewsModules: any, component: string) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter(key => {
    const k = key.replace('../', '');
    return k === component;
  });
  const matchKey = matchKeys[0];

  return dynamicViewsModules[matchKey];
}
