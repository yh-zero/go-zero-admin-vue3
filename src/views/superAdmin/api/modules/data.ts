import type { Rule } from 'ant-design-vue/es/form';
import { ApiType, ApiMethodEnum } from '@/types/api';
import { ref } from 'vue';
export const defaultData: ApiType = {
  path: '',
  apiGroup: '',
  method: 'GET',
  description: '',
};

// 是否选项
export const selectMethods = ref<SelectType[]>([
  {
    value: ApiMethodEnum.GET,
    label: ApiMethodEnum.GET,
  },
  {
    value: ApiMethodEnum.POST,
    label: ApiMethodEnum.POST,
  },
  {
    value: ApiMethodEnum.PUT,
    label: ApiMethodEnum.PUT,
  },
  {
    value: ApiMethodEnum.DELETE,
    label: ApiMethodEnum.DELETE,
  },
]);

// 校验表单
export const rules: Record<string, Rule[]> = {
  path: [{ required: true, message: '请输入路径', trigger: 'change' }],
  method: [{ required: true, message: '请选择请求', trigger: 'change' }],
  apiGroup: [{ required: true, message: '请输入Api分组', trigger: 'change' }],
  description: [{ required: true, message: '请输入Api简介', trigger: 'change' }],
};
