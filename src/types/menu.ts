interface MetaType {
  activeName: string;
  keepAlive: boolean;
  defaultMenu: boolean;
  title: string;
  icon: string;
  closeTab: boolean;
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
  parameters: any[]; // 未提供parameters的类型信息
  menuBtn: any[]; // 未提供menuBtn的类型信息
  meta: MetaType;
  ID: number;
  createdAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}
