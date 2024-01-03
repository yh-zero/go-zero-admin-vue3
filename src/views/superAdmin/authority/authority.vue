<template>
  <div>
    <a-button type="primary" @click="showAddMenu('新增根角色', true)">
      <template #icon>
        <DownloadOutlined />
      </template>
      新增根角色</a-button
    >
    <SysTable
      :loading="loading"
      :rowKey="(record:AuthorityType) => record.authorityId"
      :expandedRowKeys="expandedKeys"
      :onExpand="onExpand"
      class="mt-3"
      :dataSource="dataSource"
      :pagination="false"
      :columns="columns"
    >
      <template #tableSlot="{ column, record }">
        <template v-if="column.slotName == 'icon'">
          <component :is="record.meta.icon"></component>
        </template>
        <template v-if="column.slotName == 'edit'">
          <div class="w-[500px]">
            <a-button type="link" @click="openEditAuth(record)">
              <template #icon>
                <ToolOutlined />
              </template>
              设置权限</a-button
            >
            <a-button type="link" @click="showAddMenu('添加子角色', true, record)">
              <template #icon>
                <PlusOutlined />
              </template>
              添加子角色</a-button
            >

            <a-button type="link">
              <template #icon> <CopyOutlined /></template>编辑</a-button
            >
            <a-button type="link" @click="showAddMenu('编辑角色', false, record)"
              ><template #icon> <EditOutlined /> </template>编辑</a-button
            >
            <a-button type="link"
              ><template #icon> <DeleteOutlined /> </template>删除</a-button
            >
          </div>
        </template>
      </template>
    </SysTable>
  </div>
  <AddModal @getList="getList" :title="addMenuModalTitle" v-model:open="showAddModal" :isAdd="isAdd" :selectItem="selectItem"></AddModal>
  <EditAuth @getList="getList" :selectItem="selectItem" v-model:open="showEditAuth"></EditAuth>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SysTable from '@/components/sysTable/index.vue';
import { getAuthorityList } from '@/api/modules/authority';
import { AuthorityType } from '@/types/authority';
import AddModal from './modules/addModal.vue';
import EditAuth from './modules/editAuth/index.vue';
onMounted(() => {
  getList();
});
const selectItem = ref();

// 设置权限
const showEditAuth = ref(false);

function openEditAuth(auth: AuthorityType) {
  showEditAuth.value = true;
  selectItem.value = auth;
}
// =========== 新增角色 ==========

const addMenuModalTitle = ref('');

const isAdd = ref(false); //是否新增 新增父角色选项不可选
const showAddModal = ref(false);
function showAddMenu(title: string, add: boolean, selectData?: AuthorityType) {
  isAdd.value = add;
  selectItem.value = selectData;
  addMenuModalTitle.value = title;
  showAddModal.value = !showAddModal.value;
}

//=========== 表格 ===============
const loading = ref(false);
const expandedKeys = ref<number[]>([]); // 存储展开的节点的 key
async function getList() {
  loading.value = true;
  const res = await getAuthorityList();
  loading.value = false;
  dataSource.value = res.list;
  removeChildren(dataSource.value);
}
// 将 children 属性为空的节点置为 null
function removeChildren(list: AuthorityType[]) {
  list.forEach(res => {
    if (!res.children || res.children?.length == 0) {
      res.children = null;
    } else {
      removeChildren(res.children);
    }
  });
}

function onExpand(expanded: any, record: AuthorityType) {
  // 更新展开的节点的 key
  if (expanded) {
    expandedKeys.value.push(record.authorityId);
  } else {
    const index = expandedKeys.value.indexOf(record.authorityId);
    if (index > -1) {
      expandedKeys.value.splice(index, 1);
    }
  }
}

const dataSource = ref<AuthorityType[]>([]);
const columns = [
  { title: '角色ID', dataIndex: 'authorityId', key: 'authorityId' },
  { title: '角色名称', dataIndex: 'authorityName' },
  { title: '操作', slotName: 'edit', width: 500 },
];
</script>

<style scoped></style>
