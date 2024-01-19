<template>
  <a-table
    :dataSource="dataSource"
    :loading="loading"
    @change="handleChange"
    :pagination="pagination"
    :customRow="customRow"
  >
    <template #bodyCell="{ text, record, index, column }">
      <slot name="tableSlot" :text="text" :index="index" :column="column" :record="record"></slot>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { useAttrs, watchEffect, reactive, onMounted } from 'vue';
import { usePagination } from 'vue-request';
interface Props {
  getList?: Function; //请求列表的方法
  searchData?: any;
  dataSource: any;
  pageSize?: number; //每页显示条数
}
const props = withDefaults(defineProps<Props>(), {
  getList: (): Promise<any> => {
    return Promise.resolve();
  },
  pageSize: 10,
  searchData: {},
});

const emits = defineEmits(['update:dataSource', 'asyncListCallback']);

const attrs = useAttrs();
const customRow = () => {
  return {
    // align: 'center',
  };
};

// =========== 分页处理 ===========
onMounted(() => {
  if (attrs.pagination == false) {
    toGetList({ pageSize: 99999 });
  } else if (props.pageSize) {
    toGetList();
  }
});

const {
  data: _data,
  run,
  loading,
  current,
  pageSize,
  total,
  changePageSize,
} = usePagination(props.getList as any, {
  manual: true,
  pagination: {
    currentKey: 'pageNo',
    pageSizeKey: 'pageSize',
    totalKey: 'total',
  },
});
watchEffect(() => {
  const data = _data as any;
  if (data.value) {
    emits('update:dataSource', data.value?.list);
    emits('asyncListCallback', data.value?.list);
  }
});
const pagination = reactive({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
});
watchEffect(() => {
  pagination.total = total.value;
  pagination.current = current.value;
  pagination.pageSize = pageSize.value;
});

const handleChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
  run({
    pageSize: pag.pageSize,
    pageNo: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
    ...props.searchData,
  });
};
// 暴露重新请求
function toGetList(search?: Object) {
  run({
    pageNo: current.value,
    pageSize: pageSize.value,
    ...props.searchData,
    ...search,
  });
}
// 主动暴露childMethod方法
defineExpose({ toGetList });
</script>
<style scoped lang="scss">
// 表头文字位置
// :deep(.ant-table-thead > tr > th) {
//   text-align: center;
// }
// 表头颜色
:deep(.ant-table-thead > tr > th) {
  background: #f7fbff !important;
}
</style>
