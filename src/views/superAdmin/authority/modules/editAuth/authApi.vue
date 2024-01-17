<template>
  <div v-if="apiAllList && apiAllList.length > 0">
    <div class="flex justify-between">
      <!-- <a-input @change="changeSearch" v-model:value="searchAuth" class="w-[65%] mb-2" placeholder="筛选" /> -->
      <a-button @click="toAddAuthorityMenu" type="primary" class="mr-5 ml-[65%]">确定</a-button>
    </div>
    <a-tree v-model:expandedKeys="expandedKeys" :defaultExpandAll="defaultExpandAll" v-model:checkedKeys="checkedKeys" checkable :tree-data="apiAllList"> </a-tree>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { getAllApiList } from '@/api/modules/api';
import { ApiListRespType } from '@/types/api';
import { updateCasbinDataByApiIds, getPathByAuthorityId } from '@/api/modules/casbin';
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
});

// =========  确定按钮 ============
const expandedKeys = ref<number[]>([]);
const checkedKeys = ref<number[]>([]);
async function toAddAuthorityMenu() {
  // 过滤非数字
  checkedKeys.value = checkedKeys.value.filter(res => !isNaN(res));
  await updateCasbinDataByApiIds({ authorityId: props.auth.authorityId, apiIds: checkedKeys.value });
  message.success('API设置成功');
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
  getIds(res.apiList);
}
// =========  获取角色绑定的casbin数据 ============
async function getIds(alllist: ApiListRespType[]) {
  const res = await getPathByAuthorityId({ authorityId: props.auth.authorityId });
  alllist.forEach(api => {
    res.list.forEach(selectApi => {
      if (api.path == selectApi.path) {
        checkedKeys.value.push(api.ID);
      }
    });
  });
}
// api列表分组
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
          title: api.description + api.ID,
          key: api.ID,
          path: api.path,
        };
      }),
    };
  });
  return result;
}
</script>
