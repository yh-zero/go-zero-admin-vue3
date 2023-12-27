import { RouteMeta, _RouteRecordBase } from 'vue-router';
// 路由菜单返回列表
export interface MenuRespType {
  authoritys: null;
  btns: {};
  children: MenuRespType[];
  component: string; //页面路径
  hidden: false; //是否在列表隐藏
  menuBtn: MenuBtnType[]; //
  menuId: number;
  name: string; //路由name
  parameters: ParametersType[];
  parentId: string; //父菜单ID
  path: string; //路由path"
  sort: number; //排序标记
  activeName: string; // 高亮菜单
  // =========
  meta: MateType;
}
interface MateType extends RouteMeta {
  keepAlive: boolean; //是否缓存
  defaultMenu: boolean; //是否是基础路由
  title: string; //菜单名
  icon: string; //菜单图片
  closeTab: boolean; //自动关闭tab
}

interface MenuBtnType {
  name: string; // 按钮关键key
  desc: string; //按钮备注
  sysBaseMenuID: number; //菜单ID
}
interface ParametersType {
  type: string; //址栏携带参数为params还是query
  key: string; //地址栏携带参数的key
  value: string; //地址栏携带参数的值
}

// ================ 路由 ================
//导航栏菜单格式
export interface RouterType extends _RouteRecordBase {
  componentPath: string; //页面路径 //'view/layout/index.vue'
  meta: MateType;
  children: RouterType[];
}
