import { store } from '../index';
import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';

interface SystemType {
  iconList: string[]; //保存ant design图标名字
  reloadFlag: boolean; //刷新页面
}
/**
 * 参数1，容器的id 必须唯一
 */
export const useSystemStore = defineStore({
  id: 'system',
  state: (): SystemType => ({
    iconList: [],
    reloadFlag: true,
  }),
  getters: {},
  actions: {
    setReloadFlag(flag: boolean) {
      this.reloadFlag = flag;
    },
    pushIcon(list: string[]) {
      this.iconList = list;
    },
  },
  persist: true,
});

// Need to be used outside the setup
export function useLayoutStoreWithOut() {
  return useSystemStore(store);
}
