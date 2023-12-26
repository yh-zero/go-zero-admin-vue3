<template>
  <a-table :customRow="customRow">
    <template #bodyCell="{ column, record }">
      <slot name="tableSlot" :column="column" :record="record"></slot>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
const attrs = useAttrs();

const customRow = () => {
  return {
    // align: 'center',
  };
};
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
