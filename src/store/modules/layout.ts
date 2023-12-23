import { store } from '../index';
import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { MenuRespType, RouterType } from '@/types/layout';
import { asyncMenu } from '@/api/modules/menuApi';
import layoutRouter from '@/router/modules/layout';
//
import {
  asyncRouterHandle,
  asyncMenuToRouter,
  setAsyncRouter,
} from '@/utils/asyncRouter';

interface LayoutType {
  isRefresh: boolean; //记录是否被刷新 被刷新了需要重新 addRoute
  collapsed: boolean; // 菜单栏收起状态
  menuResList: MenuRespType[]; // 菜单栏数据
}
/**
 * 参数1，容器的id 必须唯一
 */
export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): LayoutType => ({
    isRefresh: false,
    collapsed: false,
    menuResList: [],
  }),
  getters: {
    // 路由格式的列表
    menuList(): RouterType[] {
      return asyncMenuToRouter(this.menuResList);
    },
  },
  actions: {
    async getMenu() {
      const res = await asyncMenu();
      this.menuResList = res.menus; //保存返回的数据
      // 获取对应的路由
      this.setRouter();
      return true;
    },
    // 添加动态路由
    async setRouter() {
      const routerList = asyncRouterHandle(this.menuList);
      layoutRouter[0].children = routerList;
      await setAsyncRouter(layoutRouter[0]);
      this.isRefresh = true;
      return true;
    },
  },
  persist: {
    paths: ['collapsed', 'menuResList'],
  },
});

// Need to be used outside the setup
export function useLayoutStoreWithOut() {
  return useLayoutStore(store);
}
