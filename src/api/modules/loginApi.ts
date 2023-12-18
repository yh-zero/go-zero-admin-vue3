import http from '../request';
import { CaptchaType, LoginType, LoginRespType } from '@/types/login';

// 获取验证码
export const getCaptcha = (): Promise<CaptchaType> => {
  return http.get('/v1/sys/randomImage/');
};

// 获取验证码
export const login = (data: LoginType): Promise<LoginRespType> => {
  return http.post('/v1/sys/login', data);
};
