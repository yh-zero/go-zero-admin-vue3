import http from '../request';
import { ApiListRespType, ListSearchType } from '@/types/api';

// 新增APi
export const createApi = (data: ApiListRespType): Promise<string> => {
  return http.post('/v1/sys/api/createApi', data);
};
// 编辑
export const updateApi = (data: ApiListRespType): Promise<string> => {
  return http.put('/v1/sys/api/updateApi', data);
};

// 获取api列表
export const getApiList = (data: IProgressReq & ListSearchType): Promise<IProgressResp<ApiListRespType>> => {
  return http.get('/v1/sys/api/getApiList', data);
};
// 获取全部api列表
export const getAllApiList = (): Promise<{ apiList: ApiListRespType[] }> => {
  return http.get('/v1/sys/api/getAllApiList');
};
// 删除
export const deleteApi = (data: { ids: string[] }): Promise<string> => {
  return http.delete('/v1/sys/api/deleteApi', data);
};

// 批删除
export const deleteApisByIds = (ids: string[]): Promise<string> => {
  return http.delete('/v1/sys/api/deleteApisByIds', { ids });
};
