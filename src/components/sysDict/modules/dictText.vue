<template>
  <div class="w-full">
    <slot name="default" :text="text" :option="props.diceDetail.sysDictionaryInfoList">
      <span>{{ text }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DiceDetail } from '@/types/dictionary';
const props = defineProps<{
  diceDetail: DiceDetail;
  id?: string | number;
}>();

const text = computed(() => {
  let t = '';
  props.diceDetail.sysDictionaryInfoList.forEach(res => {
    if (res.ID == props.id) {
      t = res.label;
    }
  });
  return t;
});
</script>

<style scoped></style>
