<template>
  <div>
    <a-button type="primary">
      <template #icon>
        <DownloadOutlined />
      </template>
      新增根菜单</a-button
    >
    <SysTable
      class="mt-3"
      :dataSource="dataSource"
      :columns="columns"
    ></SysTable>
  </div>
</template>

<script setup lang="ts">
import SysTable from '@/components/sysTable/index.vue';
import {} from 'module';
const dataSource = [];
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '展示名称', dataIndex: '', key: '' },
  { title: '图标', dataIndex: '', key: '' },
  { title: '路由Name', dataIndex: '', key: '' },
  { title: '路由Path', dataIndex: '', key: '' },
  { title: '是否隐藏', dataIndex: '', key: '' },
  { title: '父节点', dataIndex: '', key: '' },
  { title: '排序', dataIndex: '', key: '' },
  { title: '文件路径', dataIndex: '', key: '' },
  { title: '操作', dataIndex: '', key: '' },
];
</script>

<style scoped></style>
