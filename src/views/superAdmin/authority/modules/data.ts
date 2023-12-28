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
  name: [{ required: true, message: '请输入路由名字', trigger: 'change' }],
};
