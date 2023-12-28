import http from '../request';
import { MenuRespType } from '@/types/layout';
import { AuthorityType } from '@/types/authority';
// 获取菜单
export const getAuthorityList = (): Promise<{ list: AuthorityType[] }> => {
  return http.get('v1/sys/authority/getAuthorityList');
};
