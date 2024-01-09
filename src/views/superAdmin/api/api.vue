<template>
  <div>
    <SysSearch v-model:search="search" @toSearch="getList">
      <a-form-item label="路径" name="path"><a-input v-model:value="search.path" /></a-form-item>
      <a-form-item label="描述" name="description"><a-input v-model:value="search.description" /></a-form-item>
      <a-form-item label="API组" name="apiGroup"><a-input v-model:value="search.apiGroup" /></a-form-item>
      <a-form-item label="请求" name="method">
        <a-select allowClear v-model:value="search.method" placeholder="请输入Api分组" :options="selectMethods" />
      </a-form-item>
    </SysSearch>
    <a-button type="primary" @click="showAddApi('添加API', true)"
      ><template #icon> <PlusOutlined /> </template>添加</a-button
    >
    <a-button @click="removeByIds(selectedRowKeys)" class="ml-3" :disabled="selectedRowKeys.length <= 0"
      ><template #icon> <DeleteOutlined /> </template>删除</a-button
    >
    <SysTable
      rowKey="ID"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      ref="tableRef"
      v-model:data="dataSource"
      :getList="getApiList"
      class="mt-3"
      :dataSource="dataSource"
      :columns="columns"
    >
      <template #tableSlot="{ column, record }">
        <template v-if="column.slotName == 'icon'">
          <component :is="record.meta.icon"></component>
        </template>
        <template v-if="column.slotName == 'edit'">
          <div class="w-[300px]">
            <a-button type="link" @click="showAddApi('编辑', false, record)"
              ><template #icon> <EditOutlined /> </template>编辑</a-button
            >
            <a-button type="link" @click="removeByIds([record.ID])"
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
import { ref, reactive } from 'vue';
import SysTable from '@/components/sysTable/index.vue';
import SysSearch from '@/components/sysSearch/index.vue';
import { getApiList, deleteApisByIds } from '@/api/modules/api';
import AddModal from './modules/addModal.vue';
import { selectMethods } from './modules/data';
import { ApiListRespType } from '@/types/api';
// ======== 搜索 ========
const search = reactive({
  path: '',
  description: '',
  apiGroup: '',
  method: '',
});
// ========= 【弹窗】 编辑 ｜ 新增  =========
const showAddModal = ref(false);
const title = ref('');
const isAdd = ref(false); //是否新增
const selectItem = ref();
function showAddApi(_title: string, _isAdd: boolean, selectData?: ApiListRespType) {
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
  tableRef.value.toGetList(search);
}
const columns = [
  { title: 'id', dataIndex: 'ID', key: 'ID' },
  { title: 'API路径', dataIndex: 'path' },
  { title: 'API分组', dataIndex: 'apiGroup' },
  { title: 'API简介', dataIndex: 'description' },
  { title: '请求', dataIndex: 'method' },
  { title: '操作', slotName: 'edit', width: 300 },
];
//=============== 勾选 ===============
const selectedRowKeys = ref<string[]>([]);
const onSelectChange = (_selectedRowKeys: string[]) => {
  selectedRowKeys.value = _selectedRowKeys;
};

// 删除
async function removeByIds(ids: string[]) {
  await deleteApisByIds(ids);
  getList();
}
</script>

<style scoped></style>
