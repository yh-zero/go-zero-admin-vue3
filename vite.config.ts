import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { proxy } from './build/proxy';
const root: string = process.cwd();

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 获取当前环境的配置
  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_OUT_DIR,
    VITE_ASSET_DIR,
    VITE_BASEURL,
  }: any = loadEnv(mode, root);
  return {
    base: VITE_PUBLIC_PATH,
    plugins: [vue()],
    // 解析相关 【别名】
    resolve: {
      alias: [
        {
          find: '@', //字符串｜正则
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },
    // css相关
    css: {
      // 引入全局scss |less 指定传递给 CSS 预处理器的选项。
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/mixin.scss";',
        },
      },
    },
    // 服务相关
    server: {
      https: false,
      port: VITE_PORT,
      proxy: proxy(VITE_BASEURL),
    },
    // .构建相关【打包相关】
    build: {
      outDir: VITE_OUT_DIR,
      assetsDir: VITE_ASSET_DIR,
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
    },
  };
};
