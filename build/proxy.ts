export const proxy = (target: string) => {
  return {
    '/v1': {
      target: target,
      secure: false,
      changeOrigin: true,
    },
    '/api': {
      target: 'https://demo.gin-vue-admin.com',
      secure: false,
      changeOrigin: true,
    },
  };
};
