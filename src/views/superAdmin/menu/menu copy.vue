<template>
  <div>
    <a-button type="primary" @click="showAddMenu('新增根菜单', true)">
      <template #icon>
        <DownloadOutlined />
      </template>
      新增根菜单</a-button
    >
    <SysTable :rowKey="(record:MenuDataType) => record.ID" :expandedRowKeys="expandedKeys" :onExpand="onExpand" class="mt-3" :dataSource="dataSource" :pagination="false" :columns="columns">
      <template #tableSlot="{ column, record }">
        <template v-if="column.slotName == 'icon'">
          <component :is="record.meta.icon"></component>
        </template>
        <template v-if="column.slotName == 'edit'">
          <div class="w-[300px]">
            <a-button type="link" @click="showAddMenu('添加子菜单', true, record)">
              <template #icon>
                <PlusOutlined />
              </template>
              添加子菜单</a-button
            >
            <a-button type="link" @click="showAddMenu('编辑菜单', false, record)"
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
  <AddMenuModal @getList="getList" :title="addMenuModalTitle" v-model:open="showAddModal" :isAdd="isAdd" :selectItem="selectItem"></AddMenuModal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SysTable from '@/components/sysTable/index.vue';
import { asyncMenuList } from '@/api/modules/menuApi';
import { MenuDataType } from '@/types/menu';
import AddMenuModal from './modules/addMenuModal.vue';
onMounted(() => {
  getList();
});

// =========== 新增菜单 ==========

const addMenuModalTitle = ref('');
const selectItem = ref();
const isAdd = ref(false); //是否新增 新增父菜单选项不可选
const showAddModal = ref(false);
function showAddMenu(title: string, add: boolean, selectData?: MenuDataType) {
  isAdd.value = add;
  selectItem.value = selectData;
  addMenuModalTitle.value = title;
  showAddModal.value = !showAddModal.value;
}

//=========== 表格 ===============

async function getList() {
  const res = await asyncMenuList();
  dataSource.value = res.list;
  removeChildren(dataSource.value);
}
// 将 children 属性为空的节点置为 null
function removeChildren(list: MenuDataType[]) {
  list.forEach(res => {
    if (!res.children || res.children?.length == 0) {
      res.children = null;
    } else {
      removeChildren(res.children);
    }
  });
}
const expandedKeys = ref<number[]>([]); // 存储展开的节点的 key
function onExpand(expanded: any, record: MenuDataType) {
  // 更新展开的节点的 key
  if (expanded) {
    expandedKeys.value.push(record.ID);
  } else {
    const index = expandedKeys.value.indexOf(record.ID);
    if (index > -1) {
      expandedKeys.value.splice(index, 1);
    }
  }
}

const dataSource = ref<MenuDataType[]>([]);
const columns = [
  { title: 'ID', dataIndex: 'ID', key: 'ID' },
  { title: '展示名称', dataIndex: ['meta', 'title'] },
  { title: '图标', slotName: 'icon' },
  { title: '路由Name', dataIndex: 'name', key: 'name' },
  { title: '路由Path', dataIndex: 'path' },
  {
    title: '是否隐藏',
    dataIndex: 'hidden',
    customRender: function ({ value }: any) {
      return value ? '是' : '否';
    },
  },
  { title: '父节点', dataIndex: 'parentId' },
  { title: '排序', dataIndex: 'sort' },
  { title: '文件路径', dataIndex: 'component' },
  { title: '操作', slotName: 'edit', width: 300 },
];
</script>

<style scoped></style>
