import { store } from '../index';
import { defineStore } from 'pinia';
import { getStorageToken, setStorageToken, removeStorageToken } from '@/utils/auth';
import { checkThemebg, checkTextColor } from '@/utils/changeTheme';
import router from '@/router/index';
import { LoginRespType, LoginType } from '@/types/login';
import lodash from 'lodash';
const defaultUserInfo: LoginRespType = {
  accessExpire: 0,
  accessToken: '',
  userInfo: {
    userName: '',
    nickName: '',
    baseColor: '#001529',
    textColor: '#ffffff',
    activeColor: '',
    authority: {
      authorityId: 0,
      authorityName: '',
      parentId: 0,
      dataAuthorityId: [],
      menus: [],
      defaultRouter: '',
      showMenuIds: '',
      children: [],
    },
    headerImg: '',
    authorities: [],
  },
};
type UserState = {
  loginResp: LoginRespType;
  contentId: String;
};
/**
 * 参数1，容器的id 必须唯一
 */
export const useUserStore = defineStore({
  id: 'userInfo',
  state: (): UserState => ({
    loginResp: lodash.cloneDeep(defaultUserInfo),
    contentId: '',
  }),
  getters: {
    getToken(): String {
      return this.loginResp.accessToken || getStorageToken();
    },
  },
  actions: {
    // 清除登录信息
    resetState() {
      removeStorageToken();
      this.loginResp = lodash.cloneDeep(defaultUserInfo);
      // 跳转到登录页
      router.push({
        path: '/',
      });
    },
    setUserInfo(info: LoginRespType) {
      setStorageToken(info.accessToken);
      this.loginResp = info;
      this.setColor();
    },
    setColor() {
      // 设置颜色
      checkThemebg(this.loginResp.userInfo.activeColor);
      checkTextColor(this.loginResp.userInfo.baseColor);
    },
  },
  persist: true,
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
