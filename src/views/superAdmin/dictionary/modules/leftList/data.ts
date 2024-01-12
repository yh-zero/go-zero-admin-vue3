import type { Rule } from 'ant-design-vue/es/form';
import { DictionaryListResp } from '@/types/dictionary';
import { ref } from 'vue';
export const defaultData: DictionaryListResp = {
  name: '',
  type: '',
  status: 0,
  desc: '',
  sysDictionaryInfoList: [],
};

// 校验表单
export const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '字典名 中文', trigger: 'blur' }],
  type: [{ required: true, message: '字典名 英文', trigger: 'blur' }],
  status: [{ required: true, message: '状态', trigger: 'change' }],
  desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
};
