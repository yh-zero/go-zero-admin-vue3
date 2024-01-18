<template>
  {{ diceDetail }}
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
