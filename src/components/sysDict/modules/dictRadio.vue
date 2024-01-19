<template>
  <a-radio-group v-bind="$attrs" :options="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DiceDetail } from '@/types/dictionary';
const props = defineProps<{
  diceDetail: DiceDetail;
}>();

const option = computed(() => {
  return props.diceDetail.sysDictionaryInfoList.map(res => {
    return {
      label: res.label,
      value: res.ID,
    };
  });
});
</script>

<style scoped></style>
