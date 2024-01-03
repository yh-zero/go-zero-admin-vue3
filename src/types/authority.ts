export interface AuthorityType {
  authorityId: number;
  authorityName: string;
  parentId: number;
  dataAuthorityId: number[];
  showMenuIds: string;
  children: AuthorityType[] | null;
  menus: [];
  defaultRouter: string;
}

// 角色绑定菜单
export interface AuthorityMenuRespType {
  authorityId: number;
  menuIds: string; //'1,2,3,4,5,6,7,8,9';
}
// 更新角色信息
// export interface UpdateAuthType {
//   authorityId: number;
//   authorityName: string;
//   parentId: number;
//   defaultRouter: string;
// }
