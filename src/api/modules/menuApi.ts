import http from '../request';
import { CaptchaType, LoginType, LoginRespType } from '@/types/login';

// 获取验证码
export const asyncMenu = (): Promise<any> => {
  return http.get('/v1/sys/menu/getMenu');
};
