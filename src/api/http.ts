//http.ts
import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from '@/utils/auth';
import { baseUrl, mode } from '@/config/config';
import { message } from 'ant-design-vue';
// 设置请求头和请求路径
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
const instance = axios.create({
  baseURL: mode.IS_DEV ? '/' : baseUrl,
  timeout: 10000,
  headers: mode.IS_DEV
    ? {
        Isdev: 1,
      }
    : {},
});
instance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  error => {
    return error;
  },
);
// 响应拦截
instance.interceptors.response.use(({ data }): any => {
  if (data.code === 200) {
    return Promise.resolve(data.result);
  } else if (data.code === 100003) {
    // token失效 清理登录信息
    toMessage('请重新登录');
    return Promise.reject(data.message);
  } else {
    toMessage(data?.message);
    return Promise.reject(data.message);
  }
});

// 消息通知
function toMessage(msg: string) {
  message.error(msg);
}

export default instance;
