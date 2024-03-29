import http from '../request';
import { MenuRespType } from '@/types/layout';
import { AuthorityType, AuthorityMenuRespType } from '@/types/authority';
// 获取角色列表
export const getAuthorityList = (data: IProgressReq): Promise<{ list: AuthorityType[] }> => {
  return http.get('/v1/sys/authority/getAuthorityList', data);
};
// 角色绑定菜单
export const addAuthorityMenu = (data: AuthorityMenuRespType) => {
  return http.post('/v1/sys/authority/addAuthorityMenu', data);
};

// 更新角色信息
export const updateAuthority = (data: AuthorityType) => {
  return http.put('/v1/sys/authority/updateAuthority', data);
};
// 创建角色信息
export const createAuthority = (data: AuthorityType) => {
  return http.post('/v1/sys/authority/createAuthority', data);
};
// 删除角色信息
export const deleteAuthority = (data: { id: number }) => {
  return http.delete('/v1/sys/authority/deleteAuthority', data);
};
