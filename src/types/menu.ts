interface MetaType {
  activeName: string;
  keepAlive: boolean;
  defaultMenu: boolean;
  title: string;
  icon: string;
  closeTab: boolean;
}

interface parameters {
  type: 'query' | 'params';
  key: string; //"参数key"
  value: string; //参数值
}
export interface MenuDataType {
  parentId: string;
  path: string;
  name: string;
  hidden: boolean;
  component: string;
  sort: number;
  authoritys: any[]; // 未提供authoritys的类型信息
  children: MenuDataType[] | null;
  parameters: parameters[]; // 未提供parameters的类型信息
  menuBtn: any[]; // 未提供menuBtn的类型信息
  meta: MetaType;
  ID: number;
  createdAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}
