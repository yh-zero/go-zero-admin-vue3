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
// 添加菜单
export const addBaseMenu = (data: MenuDataType): Promise<{ list: MenuDataType[] }> => {
  return http.post('/v1/sys/menu/addBaseMenu', data);
};
// 更新菜单
export const updateBaseMenu = (data: MenuDataType): Promise<{ menus: MenuRespType[] }> => {
  return http.put('v1/sys/menu/updateBaseMenu', data);
};

// 删除菜单
export const deleteBaseMenu = (data: { id: number }): Promise<{ menus: MenuRespType[] }> => {
  return http.delete('/v1/sys/menu/deleteBaseMenu', data);
};
// 分页获取菜单[树状结构]
export const getBaseMenuTree = (): Promise<{ list: MenuDataType[] }> => {
  return http.get('/v1/sys/menu/getBaseMenuTree');
};
