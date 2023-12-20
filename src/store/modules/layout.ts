import { store } from '../index';
import { defineStore } from 'pinia';
import { LayoutType } from '@/types/layout';

/**
 * 参数1，容器的id 必须唯一
 */
export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): LayoutType => ({
    collapsed: false,
  }),
  getters: {},
  actions: {},
  persist: true,
});

// Need to be used outside the setup
export function useLayoutStoreWithOut() {
  return useLayoutStore(store);
}
