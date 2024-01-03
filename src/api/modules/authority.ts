import http from '../request';
import { MenuRespType } from '@/types/layout';
import { AuthorityType, AuthorityMenuRespType } from '@/types/authority';
// 获取角色列表
export const getAuthorityList = (): Promise<{ list: AuthorityType[] }> => {
  return http.get('/v1/sys/authority/getAuthorityList');
};
// 角色绑定菜单
export const addAuthorityMenu = (data: AuthorityMenuRespType) => {
  return http.post('/v1/sys/authority/addAuthorityMenu', data);
};

// 更新角色信息
export const updateAuthority = (data: AuthorityType) => {
  return http.put('/v1/sys/authority/updateAuthority', data);
};
