<template>
  <div>
    <div class="flex justify-between">
      <a-input @change="changeSearch" v-model:value="searchAuth" class="w-[65%] mb-2" placeholder="筛选" />
      <a-button type="primary" class="mr-5">确定</a-button>
    </div>
    <a-tree v-model:expandedKeys="expandedKeys" :defaultExpandAll="defaultExpandAll" :field-names="fieldNames" v-model:checkedKeys="checkedKeys" checkable :tree-data="menuList">
      <template #title="{ meta, name }">
        <span>{{ meta.title }} </span>
        <span v-if="props.defaultRouter == name" class="text-[#e6a23c] ml-2">首页</span>
        <span @click="setDefaultRouter(name)" v-else class="text-[#85ce61] ml-2 hover:text-[#e6a23c]">设置首页</span>
      </template>
    </a-tree>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { getBaseMenuTree } from '@/api/modules/menuApi';
import type { TreeProps } from 'ant-design-vue';
import { MenuDataType } from '@/types/menu';

interface PropsType {
  defaultRouter: string;
  showMenuIds: string;
}
const props = defineProps<PropsType>();

const fieldNames: TreeProps['fieldNames'] & { name: string } = {
  key: 'ID',
  children: 'children',
  title: 'meta',
  name: 'name',
};
// =========  onMounted ============
onMounted(() => {
  toGetBaseMenuTree();
  checkedKeys.value = props.showMenuIds.split(',').map(res => {
    return parseInt(res);
  });
  expandedKeys.value = [...checkedKeys.value];
});

// =========== 筛选 ============
const searchAuth = ref('');
function changeSearch() {
  if (menuList.value) {
    menuList.value = menuList.value.map(res => {
      return res;
    });
  }
}
// =========== 获取数据 ============
const defaultExpandAll = ref<boolean>(false);
const menuList = ref<MenuDataType[]>();
async function toGetBaseMenuTree() {
  const res = await getBaseMenuTree();
  menuList.value = res.list;
  defaultExpandAll.value = true;
}
// ========== 设置首页 ==========
function setDefaultRouter(routerName: string) {
  console.log('====================================');
  console.log(routerName);
  console.log('====================================');
}
// =========== thee点击操作  ==========
const expandedKeys = ref<number[]>([]);
const checkedKeys = ref<number[]>([]);
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys.value);
});
</script>
