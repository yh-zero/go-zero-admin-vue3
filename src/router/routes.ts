import { RouteRecordRaw } from 'vue-router';
import errorRouter from './error';
const modules = import.meta.glob('./modules/**/*.ts', {
  eager: true,
  import: 'default',
});
const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key] || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
routeModuleList.push(...errorRouter);
export default routeModuleList;
