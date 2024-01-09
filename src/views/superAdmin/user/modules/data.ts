import type { Rule } from 'ant-design-vue/es/form';
import { AddUserInfoType } from '@/types/userList';
export const defaultData: AddUserInfoType = {
  userName: '',
  passWord: '',
  nickName: '',
  authorityId: 0,
  authorityIds: [],
};

// 校验表单
export const rules: Record<string, Rule[]> = {
  userName: [{ required: true, message: '请输入路径', trigger: 'change' }],
  passWord: [{ required: true, message: '请选择请求', trigger: 'change' }],
  nickName: [{ required: true, message: '请输入Api分组', trigger: 'change' }],
  authorityIds: [{ required: true, message: '请输入Api简介', trigger: 'change' }],
};
