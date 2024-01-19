<template>
  <div class="flex justify-between mb-2">
    <span class="font-bold">字典详情内容</span>
    <a-button type="primary" size="small" @click="showAdd('新增字典项', true)">
      <PlusOutlined />
      新增字典项</a-button
    >
  </div>
  <div class="overflow-y-auto h-full">
    <SysTable
      rowKey="ID"
      ref="tableRef"
      v-model:dataSource="dataSource"
      :getList="getSysDictionaryInfoList"
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
            <a-button type="link" @click="showAdd('变更字典项', false, record)"
              ><template #icon> <EditOutlined /> </template>变更</a-button
            >
            <SysRemoveBtn @handlerOK="removeByIds(record.ID)"></SysRemoveBtn>
          </div>
        </template>
      </template>
    </SysTable>
  </div>
  <AddModal
    :id="selectId"
    :isAdd="isAdd"
    @getList="getList"
    :title="title"
    v-model:open="showAddModal"
    :selectItem="selectItem"
  ></AddModal>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { getSysDictionaryInfoList } from '@/api/modules/dictionary';
import { DictionaryDetailListResp } from '@/types/dictionary';
import { deleteSysDictionaryInfo } from '@/api/modules/dictionary';
import AddModal from './addModal.vue';
import { defaultData } from './data';
const props = defineProps({
  selectId: Number,
});

// ========= 【弹窗】 编辑 ｜ 新增  =========
const showAddModal = ref(false);
const title = ref('');
const isAdd = ref(false); //是否新增
const selectItem = ref();
function showAdd(_title: string, _isAdd: boolean, selectData?: DictionaryDetailListResp) {
  selectItem.value = selectData;
  showAddModal.value = true;
  isAdd.value = _isAdd;
  title.value = _title;
}

// ========= 表格数据 =========
const dataSource = ref();
const tableRef = ref();
const columns = [
  { title: 'id', dataIndex: 'ID', key: 'ID' },
  { title: '日期', dataIndex: 'path' },
  { title: '展示值', dataIndex: 'label' },
  { title: '字典值', dataIndex: 'value' },
  { title: '拓展值', dataIndex: 'extend' },
  { title: '启用状态', dataIndex: 'status' },
  { title: '排序', dataIndex: 'sort' },
  { title: '操作', slotName: 'edit', width: 300 },
];
// 监听props.selectId的变化
watch(props, nweProps => {
  getList();
});
// 手动请求
function getList() {
  tableRef.value.toGetList({ sysDictionaryID: props.selectId });
}
// 删除
async function removeByIds(id: number) {
  await deleteSysDictionaryInfo({ id });
  getList();
}
</script>

<style scoped></style>
