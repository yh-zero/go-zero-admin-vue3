<template>
  <div v-if="menuList && menuList.length > 0">
    <div class="flex justify-between">
      <a-input @change="changeSearch" v-model:value="searchAuth" class="w-[65%] mb-2" placeholder="筛选" />
      <a-button @click="toAddAuthorityMenu" type="primary" class="mr-5">确定</a-button>
    </div>
    <a-tree v-model:expandedKeys="expandedKeys" :defaultExpandAll="defaultExpandAll" :field-names="fieldNames" v-model:checkedKeys="checkedKeys" checkable :tree-data="menuList">
      <template #title="{ meta, name, ID }">
        <span>{{ meta.title }} </span>
        <span v-if="defaultRouter == name" class="text-[#e6a23c] ml-2">首页</span>
        <span @click="setDefaultRouter(name, ID)" v-else class="text-[#85ce61] ml-2 hover:text-[#e6a23c]">设置首页</span>
      </template>
    </a-tree>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { getBaseMenuTree } from '@/api/modules/menuApi';
import { addAuthorityMenu, updateAuthority } from '@/api/modules/authority';
import type { TreeProps } from 'ant-design-vue';
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
  if (menuList.value) {
    menuList.value = menuList.value.map(res => {
      return res;
    });
  }
}
// =========== 获取树状数据 ============
const defaultExpandAll = ref<boolean>(false);
const menuList = ref<MenuDataType[]>();
async function toGetBaseMenuTree() {
  const res = await getBaseMenuTree();
  menuList.value = res.list;
  defaultExpandAll.value = true;
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
