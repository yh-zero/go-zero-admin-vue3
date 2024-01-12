<template>
  <div class="flex justify-between mb-2">
    <span class="font-bold">字典列表</span>
    <a-button @click="showAdd('新增', true)" type="primary" size="small">新增</a-button>
  </div>
  <div class="overflow-y-auto h-full">
    <div
      @click="changeItem(item.ID as number)"
      class="flex items-center justify-between h-[45px] p-2 cursor-pointer rounded-md mt-2"
      :class="item.ID == selectId ? 'bg-[#1677ff] text-[#fff] hover:bg-[#1677ff]' : 'bg-[#f9fafb] hover:bg-[#eff6ff]'"
      :key="item.ID"
      v-for="item of listData"
    >
      <span>{{ item.name }}</span>
      <!-- 修改图标 -->
      <div>
        <EditOutlined @click.stop="showAdd('编辑', false, item)" :class="item.ID == selectId ? 'text-[#fff]' : 'text-[blue]'" class="mr-2 cursor-pointer" />
        <SysRemoveBtn @click.stop @handlerOK="removeById(item.ID as number)">
          <DeleteOutlined class="text-[red] cursor-pointer" />
        </SysRemoveBtn>
      </div>
    </div>
  </div>
  <AddModal :isAdd="isAdd" @getList="getList" :title="title" v-model:open="showAddModal" :selectItem="selectItem"></AddModal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getSysDictionaryList, deleteSysDictionary } from '@/api/modules/dictionary';
import { DictionaryListResp } from '@/types/dictionary';
import { message } from 'ant-design-vue';
import AddModal from './addModal.vue';
onMounted(() => {
  getList();
});

// ========= 【弹窗】 编辑 ｜ 新增  =========
const showAddModal = ref(false);
const title = ref('');
const isAdd = ref(false); //是否新增
const selectItem = ref();
function showAdd(_title: string, _isAdd: boolean, selectData?: DictionaryListResp) {
  selectItem.value = selectData;
  showAddModal.value = true;
  isAdd.value = _isAdd;
  title.value = _title;
}
// =========  ===========
const emits = defineEmits(['update:value']);
// ========= 获取列表 ===========
const listData = ref<DictionaryListResp[]>([]);
async function getList() {
  const res = await getSysDictionaryList();
  listData.value = res.list;
  if (listData.value.length > 0) {
    changeItem(listData.value[0].ID as number);
  }
}
// ========= 选中 ===========
const selectId = ref();
function changeItem(id: number) {
  selectId.value = id;
  emits('update:value', id);
}
// ========= 删除 ===========
async function removeById(id: number) {
  await deleteSysDictionary({ id });
  getList();
  message.success('删除成功');
}
</script>

<style scoped></style>
