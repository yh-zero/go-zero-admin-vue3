import type { SelectProps } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { reactive, ref } from 'vue';
import { MenuDataType } from '@/types/menu';

export const defaultMenuData: MenuDataType = {
  parentId: 0,
  path: '',
  name: '',
  hidden: false,
  component: '',
  sort: 0,
  authoritys: [],
  children: null,
  parameters: [],
  menuBtn: [],
  meta: {
    activeName: '',
    keepAlive: false,
    defaultMenu: false,
    title: '',
    icon: '',
    closeTab: false,
  },
  ID: 0,
  createdAt: '',
  UpdatedAt: '',
  DeletedAt: '',
  showMenuIds: [],
};

// form

export const selectParameters = ref<SelectProps['options']>([
  {
    value: 'query',
    label: 'query',
  },
  {
    value: 'params',
    label: 'params',
  },
]);

// 校验表单
export const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入路由名字', trigger: 'change' }],
  path: [{ required: true, message: '请输入路由Path', trigger: 'change' }],
  component: [{ required: true, message: '请输入文件路径', trigger: 'change' }],
};

// table
export const columns = [
  { title: '参数类型', slotName: 'type', width: 200 },
  { title: '参数key', slotName: 'key', width: 200 },
  { title: '参数值', slotName: 'value', width: 200 },
  { title: '', slotName: 'edit', width: 200 },
];

export const columnsBtn = [
  { title: '按钮名称', slotName: 'name', width: 200 },
  { title: '备注', slotName: 'desc', width: 200 },
  { title: '', slotName: 'edit', width: 200 },
];
