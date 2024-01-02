import type { Rule } from 'ant-design-vue/es/form';
import { AuthorityType } from '@/types/authority';

export const defaultData: AuthorityType = {
  authorityId: 0,
  authorityName: '',
  parentId: 0,
  dataAuthorityId: [],
  children: [],
  menus: [],
  defaultRouter: '',
};

// 校验表单
export const rules: Record<string, Rule[]> = {
  parentId: [{ required: true, message: '请选择父级角色', trigger: 'change' }],
  authorityId: [{ required: true, message: '请输入角色ID', trigger: 'change' }],
  authorityName: [{ required: true, message: '请输入角色姓名', trigger: 'change' }],
};
