export const proxy = (target: string) => {
  return {
    '/v1': {
      target: target,
      secure: false,
      changeOrigin: true,
    },
  };
};
