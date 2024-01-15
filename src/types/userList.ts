import { AuthorityType } from './authority';

export interface UserListType {
  uuid: string;
  userName: string;
  nickName: string;
  sideMode: string;
  headerImg: string;
  baseColor: string;
  activeColor: string;
  authorityId: number;
  authority: AuthorityType;
  authorities: AuthorityType[];
  phone: string;
  email: string;
  enable: number;
  ID: number;
  // 编辑使用
  selectIds?: number[]; //用户角色
  authorityIds?: number[];
  passWord?: string;
}

// 修改用户信息
export interface EditUserInfoType {
  ID: number;
  passWord?: string;
  nickName?: string; // 用户昵称
  sideMode?: string; // 用户侧边主题
  headerImg?: string;
  phone?: string;
  email?: string;
  enable?: number; //用户是否被冻结 1正常 2冻结
  authorityIds?: number[];
}
