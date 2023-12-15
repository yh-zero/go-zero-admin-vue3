import type { Router } from 'vue-router';
import { isMobail } from '@/utils/isPhone';
import { getToken, removeToken } from '@/utils/auth';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });
const whiteList = ['/']; // 白名单列表 =》 不需要登录页面
export const routerBeforeEach = (router: Router) => {
  router.beforeEach(async (to: any, from, next) => {
    if (!NProgress.isStarted()) {
      NProgress.start();
    }
    next();
  });
  router.afterEach((to, from) => {
    NProgress.done();
  });
};
