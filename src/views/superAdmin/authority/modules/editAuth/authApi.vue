<template>
  <div v-if="apiAllList && apiAllList.length > 0">
    <div class="flex justify-between">
      <a-input @change="changeSearch" v-model:value="searchAuth" class="w-[65%] mb-2" placeholder="筛选" />
      <a-button @click="toAddAuthorityMenu" type="primary" class="mr-5">确定</a-button>
    </div>
    <a-tree v-model:expandedKeys="expandedKeys" :defaultExpandAll="defaultExpandAll" v-model:checkedKeys="checkedKeys" checkable :tree-data="apiAllList"> </a-tree>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { getAllApiList } from '@/api/modules/api';
import { ApiListRespType } from '@/types/api';
import { addAuthorityMenu, updateAuthority } from '@/api/modules/authority';
import type { TreeProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { AuthorityType } from '@/types/authority';
interface PropsType {
  auth: AuthorityType;
}
const props = defineProps<PropsType>();

// =========  onMounted ============
onMounted(() => {
  toGetBaseMenuTree();
  checkedKeys.value = props.auth.showMenuIds.split(',').map(res => {
    return parseInt(res);
  });
  expandedKeys.value = [...checkedKeys.value];
});
// =========  确定按钮 ============
const expandedKeys = ref<number[]>([]);
const checkedKeys = ref<number[]>([]);
async function toAddAuthorityMenu() {
  await addAuthorityMenu({ authorityId: props.auth.authorityId, menuIds: checkedKeys.value.join(',') });
  message.success('菜单设置成功');
}

// =========== 筛选 ============
const searchAuth = ref('');
function changeSearch() {
  if (apiAllList.value) {
    apiAllList.value = apiAllList.value.map(res => {
      return res;
    });
  }
}
// =========== 获取树状数据 ============
const defaultExpandAll = ref<boolean>(false);
const apiAllList = ref<TreeProps['treeData']>();
async function toGetBaseMenuTree() {
  const res = await getAllApiList();
  apiAllList.value = groupByApiGroup(res.apiList);
  defaultExpandAll.value = true;
}

function groupByApiGroup(apiArray: ApiListRespType[]): TreeProps['treeData'] {
  const groupedData: { [key: string]: ApiListRespType[] } = {};

  apiArray.forEach(api => {
    const { apiGroup, ...rest } = api;
    if (!groupedData[apiGroup]) {
      groupedData[apiGroup] = [];
    }
    groupedData[apiGroup].push(api);
  });

  const result: TreeProps['treeData'] = Object.keys(groupedData).map(apiGroup => {
    return {
      title: apiGroup,
      key: apiGroup.replace(/\s+/g, '-').toLowerCase(),
      children: groupedData[apiGroup].map(api => {
        return {
          title: api.description,
          key: api.ID,
        };
      }),
    };
  });
  return result;
}

// ========== 设置首页 ==========
const defaultRouter = ref(props.auth.defaultRouter);
async function setDefaultRouter(routerName: string, id: string) {
  // 校验是否勾选
  if (!checkedKeys.value.includes(parseInt(id))) {
    message.warning('请先勾选该菜单');
    return;
  }
  // 设置默认首页
  const param = { ...props.auth };
  param.defaultRouter = routerName;
  defaultRouter.value = routerName;
  await updateAuthority(param);
  message.success('菜单设置成功');
}
</script>
