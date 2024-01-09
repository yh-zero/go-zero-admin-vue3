//http.ts
import axios from 'axios';
import { useUserStoreWithOut } from '@/store/modules/user';
import { baseUrl, mode } from '@/config/config';
import { message } from 'ant-design-vue';
// 设置请求头和请求路径
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8';
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
    // 添加token请求头
    const token = useUserStoreWithOut().getToken;
    if (token) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      config.headers.Authorization = token;
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
    useUserStoreWithOut().resetState();
    toMessage('登录过期,请重新登录');
    return Promise.reject(data.message);
  } else {
    if (data.result.message) {
      toMessage(data?.result.message);
      return Promise.reject(data.message);
    } else {
      toMessage('系统错误，请联系管理员,' + data.message);
      return Promise.reject(data.message);
    }
  }
});

// 消息通知
function toMessage(msg: string) {
  message.error(msg);
}

export default instance;
