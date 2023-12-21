import { store } from '../index';
import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { MenuRespType } from '@/types/layout';
import { asyncMenu } from '@/api/modules/menuApi';
import router from '@/router';
//
import { asyncRouterHandle, asyncMenuToRouter } from '@/utils/asyncRouter';

interface LayoutType {
  collapsed: boolean; // 菜单栏收起状态
  menuType: MenuRespType[]; // 菜单栏数据
  menuList: RouteRecordRaw[]; //路由列表
}
/**
 * 参数1，容器的id 必须唯一
 */
export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): LayoutType => ({
    collapsed: false,
    menuType: [],
    menuList: [],
  }),
  getters: {},
  actions: {
    async getMenu() {
      const res = await asyncMenu();
      this.menuType = res.menus; //保存返回的数据
      // 获取对应的路由
      const routerList = asyncMenuToRouter(this.menuType);
      const routers = asyncRouterHandle(routerList);
      routers.forEach(route => {
        console.log(route);
        router.addRoute(route);
      });
    },
  },
  persist: {
    paths: ['collapsed'],
  },
});

// Need to be used outside the setup
export function useLayoutStoreWithOut() {
  return useLayoutStore(store);
}
