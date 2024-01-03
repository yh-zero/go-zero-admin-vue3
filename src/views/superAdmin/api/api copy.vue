<template>
  <div>
    <SysTable class="mt-3" :dataSource="dataSource" :columns="columns" :pagination="pagination"> </SysTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import SysTable from '@/components/sysTable/index.vue';
import { getApiList } from '@/api/modules/api';
const dataSource = ref<any[]>([]);
onMounted(() => {
  toGetApiList();
});
async function toGetApiList() {
  const res = await getApiList({
    page: 0,
    pageSize: 10,
    path: '',
  });
  console.log('====================================');
  console.log(res.list);
  console.log('====================================');
}

const pagination = computed(() => ({
  total: 200,
  current: 2,
  pageSize: 20,
}));
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
