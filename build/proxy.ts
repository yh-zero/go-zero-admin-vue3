export const proxy = (target: string) => {
  return {
    '/nanli': {
      target: target,
      secure: false,
      changeOrigin: true,
    },
  };
};
