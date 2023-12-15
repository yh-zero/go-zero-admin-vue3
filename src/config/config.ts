const _mode = import.meta.env.MODE;
// 当前环境
export const mode = {
  IS_DEV: _mode === 'development',
  IS_STAGING: _mode === 'staging',
  IS_PROD: _mode === 'production',
};
// 当前环境的请求api接口域名
export const baseUrl = import.meta.env.VITE_BASEURL;
