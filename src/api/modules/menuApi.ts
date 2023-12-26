import http from '../request';
import { MenuRespType } from '@/types/layout';
import { MenuDataType } from '@/types/menu';
// 获取菜单
export const asyncMenu = (): Promise<{ menus: MenuRespType[] }> => {
  return http.get('/v1/sys/menu/getMenu');
};
// 分页获取菜单
export const asyncMenuList = (): Promise<{ list: MenuDataType[] }> => {
  return http.get('/v1/sys/menu/getMenuList');
};
