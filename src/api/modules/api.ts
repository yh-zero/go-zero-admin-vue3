import http from '../request';
import { ApiListRespType } from '@/types/api';

// 获取api列表
export const getApiList = (data: IProgressReq & { path: string }): Promise<IProgressResp<ApiListRespType>> => {
  return http.get('/v1/sys/api/getApiList', data);
};
