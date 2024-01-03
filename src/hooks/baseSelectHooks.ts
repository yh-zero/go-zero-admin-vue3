import { ref, computed } from 'vue';
import { getIcon } from '@/utils/iconList';

export const useSelectHooks = () => {
  // 是否选项
  const selectYesNo = ref<SelectType[]>([
    {
      value: true,
      label: '是',
    },
    {
      value: false,
      label: '否',
    },
  ]);

  // 下拉图标列表
  const selectIcon = computed(() => {
    const list = getIcon();
    return list.map(res => {
      return {
        value: res,
        label: res,
      };
    });
  });
  return {
    selectYesNo,
    selectIcon,
  };
};
