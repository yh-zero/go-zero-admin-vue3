import type { Router } from 'vue-router';
import { useLayoutStore } from '@/store/modules/layout';
import { useUserStore } from '@/store/modules/user';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });

const whiteList = ['login', '404', '500'];
export const routerBeforeEach = (router: Router) => {
  router.beforeEach(async (to: any, from) => {
    if (!NProgress.isStarted()) {
      NProgress.start();
    }
    document.title = to.meta.title || '';
    // 校验路由
    const layoutStore = useLayoutStore();
    const userStore = useUserStore();
    const token = userStore.getToken;
    // 存在白名单 直接放行
    if (whiteList.indexOf(to.name) > -1) {
      return true;
    } else {
      if (!layoutStore.isRefresh) {
        // 刷新
        await layoutStore.setRouter();
        return { ...to, replace: true };
      }
      //不存在白名单 查看是否存在token
      if (token) {
        // 判断当前登录用户的角色是否拥有跳转的页面
        return true;
      } else {
        // 不存在 token 跳转到权限页 ｜ 登录页
      }
    }
  });
  // 路由加载完成后关闭进度条
  router.afterEach((to, from) => {
    NProgress.done();
  });
  router.onError(() => {
    // 路由发生错误后销毁进度条
    NProgress.remove();
  });
};
