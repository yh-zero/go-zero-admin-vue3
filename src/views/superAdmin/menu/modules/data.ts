import type { SelectProps } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import { MenuDataType } from '@/types/menu';
export const menuData = reactive<MenuDataType>({
  parentId: '',
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
});

// form
export const selectYesNo = ref<SelectProps['options']>([
  {
    value: 'true',
    label: '是',
  },
  {
    value: 'false',
    label: '否',
  },
]);

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
// table
export const columns = [
  { title: '参数类型', slotName: 'type', width: 200 },
  { title: '参数key', slotName: 'key', width: 200 },
  { title: '参数值', slotName: 'value', width: 200 },
];
