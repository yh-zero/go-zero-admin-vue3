import type { Rule } from 'ant-design-vue/es/form';
import { UserListType } from '@/types/userList';
export const defaultData: UserListType = {
  userName: '',
  passWord: '',
  nickName: '',
  authorityId: 0,
  authorityIds: [],
  uuid: '',
  sideMode: '',
  headerImg: '',
  baseColor: '',
  activeColor: '',
  authority: {
    authorityId: 0,
    authorityName: '',
    parentId: 0,
    dataAuthorityId: [],
    showMenuIds: '',
    children: null,
    menus: [],
    defaultRouter: '',
  },
  authorities: [],
  phone: '',
  email: '',
  enable: 0,
  ID: 0,
};

// 校验表单
export const rules: Record<string, Rule[]> = {
  userName: [{ required: true, message: '请输入路径', trigger: 'change' }],
  passWord: [{ required: true, message: '请选择请求', trigger: 'change' }],
  nickName: [{ required: true, message: '请输入Api分组', trigger: 'change' }],
  selectIds: [{ required: true, message: '请输入Api简介', trigger: 'change' }],
};
