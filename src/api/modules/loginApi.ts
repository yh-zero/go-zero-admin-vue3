import http from '../request';
import { CaptchaType, LoginType, LoginRespType } from '@/types/login';

// 获取验证码
export const getCaptcha = (data: {
  timestamp: string;
}): Promise<CaptchaType> => {
  return http.get('/nanli/sys/randomImage/' + data.timestamp);
};

// 获取验证码
export const login = (data: LoginType): Promise<LoginRespType> => {
  return http.post('/nanli/sys/randomImage', data);
};
