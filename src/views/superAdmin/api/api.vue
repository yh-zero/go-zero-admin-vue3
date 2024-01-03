<template>
  <div>
    <SysTable v-model:data="dataSource" :getList="getApiList" class="mt-3" :dataSource="dataSource" :columns="columns"> </SysTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SysTable from '@/components/sysTable/index.vue';
import { getApiList } from '@/api/modules/api';
const dataSource = ref();
const columns = [
  { title: 'id', dataIndex: 'ID', key: 'ID' },
  { title: 'API路径', dataIndex: '' },
  { title: 'API分组', dataIndex: '' },
  { title: 'API简介', dataIndex: '' },
  { title: '请求', dataIndex: '' },
  { title: '操作', slotName: 'edit', width: 300 },
];
</script>

<style scoped></style>
