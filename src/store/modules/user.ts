import { store } from '../index';
import { defineStore } from 'pinia';
import { removeToken, setToken } from '@/utils/auth';
import router from '@/router/index';
import { UserType, LoginType } from '@/types/login';
import lodash from 'lodash';
const defaultUserInfo: UserType = {
  token: '',
  theme: {
    bgColor: '#001529',
    textColor: '#ffffff',
  },
};
type UserState = {
  userInfo: UserType;
  contentId: string;
};
/**
 * 参数1，容器的id 必须唯一
 */
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: lodash.cloneDeep(defaultUserInfo),
    contentId: '',
  }),
  getters: {},
  actions: {},
  persist: true,
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
