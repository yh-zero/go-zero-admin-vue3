<template>
  <a-select
    class="w-full"
    :fieldNames="fieldNames"
    v-bind="$attrs"
    optionFilterProp="label"
    :options="diceDetail.sysDictionaryInfoList"
    allowClear
    :placeholder="'请选择' + diceDetail.name"
  />
</template>

<script setup lang="ts">
import { DiceDetail } from '@/types/dictionary';
defineProps<{
  diceDetail: DiceDetail;
}>();

// 别名
const fieldNames = {
  label: 'label',
  value: 'ID',
};
</script>

<style scoped></style>
