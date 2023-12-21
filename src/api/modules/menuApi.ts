import http from '../request';
import { MenuRespType } from '@/types/layout';

// 获取验证码
export const asyncMenu = (): Promise<{ menus: MenuRespType[] }> => {
  return http.get('/v1/sys/menu/getMenu');
};
