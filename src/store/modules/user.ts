import { store } from '../index';
import { defineStore } from 'pinia';
import {
  getStorageToken,
  setStorageToken,
  removeStorageToken,
} from '@/utils/auth';
import router from '@/router/index';
import { LoginRespType, LoginType } from '@/types/login';
import lodash from 'lodash';
const defaultUserInfo: LoginRespType = {
  accessExpire: 0,
  accessToken: '',
  theme: {
    bgColor: '#001529',
    textColor: '#ffffff',
  },
};
type UserState = {
  userInfo: LoginRespType;
  contentId: String;
};
/**
 * 参数1，容器的id 必须唯一
 */
export const useUserStore = defineStore({
  id: 'userInfo',
  state: (): UserState => ({
    userInfo: lodash.cloneDeep(defaultUserInfo),
    contentId: '',
  }),
  getters: {
    getToken(): String {
      return this.userInfo.accessToken || getStorageToken();
    },
  },
  actions: {
    // 清除登录信息
    resetState() {
      removeStorageToken();
      (this.userInfo = lodash.cloneDeep(defaultUserInfo)),
        // 跳转到登录页
        router.replace({
          path: '/',
        });
    },
    setUserInfo(info: LoginRespType) {
      setStorageToken(info.accessToken);
      this.userInfo = info;
    },
  },
  persist: true,
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
