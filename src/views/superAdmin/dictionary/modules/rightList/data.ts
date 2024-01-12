import type { Rule } from 'ant-design-vue/es/form';
import { DictionaryDetailListResp } from '@/types/dictionary';
export const defaultData: DictionaryDetailListResp = {
  label: '',
  value: 0,
  extend: '',
  status: 0,
  sort: 0,
};

// 校验表单
export const rules: Record<string, Rule[]> = {
  label: [{ required: true, message: '展示值', trigger: 'blur' }],
  value: [{ required: true, message: '字典值', trigger: 'blur' }],
  status: [{ required: true, message: '状态', trigger: 'blur' }],
  sort: [{ required: true, message: '排序', trigger: 'blur' }],
};
