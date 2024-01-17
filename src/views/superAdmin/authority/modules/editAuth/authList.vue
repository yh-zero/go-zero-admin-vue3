<template>
  <div v-if="menuList && menuList.length > 0">
    <div class="flex justify-between">
      <!-- <a-input @change="changeSearch" v-model:value="searchAuth" class="w-[65%] mb-2" placeholder="筛选" /> -->
      <a-button @click="toAddAuthorityMenu" type="primary" class="mr-5 ml-[65%]">确定</a-button>
    </div>
    <a-tree
      ref="treeRef"
      @check="onCheck"
      multiple
      v-model:expandedKeys="expandedKeys"
      :defaultExpandAll="defaultExpandAll"
      :field-names="fieldNames"
      v-model:checkedKeys="checkedKeys"
      checkable
      :tree-data="menuList"
    >
      <template #title="{ meta, name, ID }">
        <span>{{ meta.title }}{{ ID }} </span>
        <span v-if="defaultRouter == name" class="text-[#e6a23c] ml-2">首页</span>
        <span @click="setDefaultRouter(name, ID)" v-else class="text-[#85ce61] ml-2 hover:text-[#e6a23c]">设置首页</span>
      </template>
    </a-tree>
  </div>
</template>
<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue';
import { getBaseMenuTree } from '@/api/modules/menuApi';
import { addAuthorityMenu, updateAuthority } from '@/api/modules/authority';
import type { TreeProps } from 'ant-design-vue';
import lodash from 'lodash';
import { message } from 'ant-design-vue';
import { MenuDataType } from '@/types/menu';
import { AuthorityType } from '@/types/authority';
interface PropsType {
  auth: AuthorityType;
}
const props = defineProps<PropsType>();

const fieldNames: TreeProps['fieldNames'] & { name: string } = {
  key: 'ID',
  children: 'children',
  title: 'meta',
  name: 'name',
};

// =========  onMounted ============
const treeRef = ref();
onMounted(() => {
  toGetBaseMenuTree();
});
// =========  确定按钮 ============
const expandedKeys = ref<number[]>([]);
const checkedKeys = ref<number[]>([]);
async function toAddAuthorityMenu() {
  const menuIdsList = [...checkedKeys.value, ...halfCheckedKeys.value];
  await addAuthorityMenu({ authorityId: props.auth.authorityId, menuIds: menuIdsList.join(',') });
  message.success('菜单设置成功');
}

// =========== 筛选 ============
const searchAuth = ref('');
function changeSearch() {
  if (menuList.value) {
    menuList.value = menuList.value.map(res => {
      return res;
    });
  }
}
// =========== 获取树状数据 ============
const defaultExpandAll = ref<boolean>(false);
const menuList = ref<MenuDataType[]>([]);
async function toGetBaseMenuTree() {
  const res = await getBaseMenuTree();
  menuList.value = res.list;
  defaultExpandAll.value = true;
  getChildArr(res.list);
  getCheckedKeys();
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
// 半勾选状态的 id
const halfCheckedKeys = ref<number[]>([]);
function onCheck(checkedKeys: number[], info: { halfCheckedKeys: number[] }) {
  halfCheckedKeys.value = info.halfCheckedKeys;
}

// ========== 回显 ==========
// 定义childArr存放所有子节点
const childIds = ref<number[]>([]);
// 遍历获取所有子节点
function getChildArr(data: MenuDataType[]) {
  data.forEach(res => {
    if (res.children && res.children.length > 0) {
      getChildArr(res.children);
    } else {
      childIds.value.push(res.ID);
    }
  });
}
// 回显选中状态 半选中状态
function getCheckedKeys() {
  const ids = props.auth.showMenuIds.split(',').map(res => {
    return parseInt(res);
  });
  //取出相同的id并赋值给checkedKeys
  checkedKeys.value = lodash.intersection(ids, childIds.value);
  //取出不相同的id并赋值给halfCheckedKeys
  halfCheckedKeys.value = lodash.difference(ids, childIds.value);
  expandedKeys.value = [...checkedKeys.value];
}
</script>
