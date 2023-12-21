import type { Router } from 'vue-router';
import { isMobail } from '@/utils/isPhone';
import { getStorageToken, removeStorageToken } from '@/utils/auth';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });
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
