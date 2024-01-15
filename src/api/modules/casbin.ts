import http from '../request';
import { CasbinRespType } from '@/types/casbin';

// 更新角色casbin数据
export const updateCasbinDataByApiIds = (data: { authorityId: number; apiIds: number[] }): Promise<string> => {
  return http.put('/v1/sys/casbin/updateCasbinDataByApiIds', data);
};
// 获取角色绑定的casbin数据
export const getPathByAuthorityId = (data: { authorityId: number }): Promise<{ list: CasbinRespType[] }> => {
  return http.get('/v1/sys/casbin/getPathByAuthorityId', data);
};
