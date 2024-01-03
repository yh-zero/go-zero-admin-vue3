<template>
  <div>
    <a-button type="primary" @click="showAddApi('添加API', true)"
      ><template #icon> <PlusOutlined /> </template>添加</a-button
    >
    <a-button class="ml-3"
      ><template #icon> <DeleteOutlined /> </template>删除</a-button
    >
    <SysTable ref="tableRef" v-model:data="dataSource" :getList="getApiList" class="mt-3" :dataSource="dataSource" :columns="columns">
      <template #tableSlot="{ column, record }">
        <template v-if="column.slotName == 'icon'">
          <component :is="record.meta.icon"></component>
        </template>
        <template v-if="column.slotName == 'edit'">
          <div class="w-[300px]">
            <a-button type="link" @click="showAddApi('编辑', false, record)"
              ><template #icon> <EditOutlined /> </template>编辑</a-button
            >
            <a-button type="link"
              ><template #icon> <DeleteOutlined /> </template>删除</a-button
            >
          </div>
        </template>
      </template>
    </SysTable>
    <AddModal :isAdd="isAdd" @getList="getList" :title="title" v-model:open="showAddModal" :selectItem="selectItem"></AddModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SysTable from '@/components/sysTable/index.vue';
import { getApiList } from '@/api/modules/api';
import AddModal from './modules/addModal.vue';
import { ApiType } from '@/types/api';
// ========= 【弹窗】 编辑 ｜ 新增  =========
const showAddModal = ref(false);
const title = ref('');
const isAdd = ref(false); //是否新增
const selectItem = ref();
function showAddApi(_title: string, _isAdd: boolean, selectData?: ApiType) {
  selectItem.value = selectData;
  showAddModal.value = true;
  isAdd.value = _isAdd;
  title.value = _title;
}
// ============= 列表接口数据 =============
const dataSource = ref();
const tableRef = ref();
// 手动请求
function getList() {
  tableRef.value.toGetList();
}
const columns = [
  { title: 'id', dataIndex: 'ID', key: 'ID' },
  { title: 'API路径', dataIndex: 'path' },
  { title: 'API分组', dataIndex: 'apiGroup' },
  { title: 'API简介', dataIndex: 'description' },
  { title: '请求', dataIndex: 'method' },
  { title: '操作', slotName: 'edit', width: 300 },
];
</script>

<style scoped></style>
