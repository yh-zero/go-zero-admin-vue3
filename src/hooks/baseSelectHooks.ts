import { ref, computed } from 'vue';
import { getIcon } from '@/utils/iconList';
import type { AuthorityType } from '@/types/authority';
import { getAuthorityList } from '@/api/modules/authority';
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

  // 角色列表【树形结构】
  const authorityListTree = ref<AuthorityType[]>([]);
  async function getAuthList() {
    const res = await getAuthorityList({
      pageNo: 1,
      pageSize: 99999,
    });
    authorityListTree.value = res.list;
  }

  return {
    selectYesNo,
    selectIcon,
    authorityListTree,
    getAuthList,
  };
};
