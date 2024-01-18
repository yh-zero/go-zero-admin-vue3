<template>
  <SysDict :needForm="true" dict="method" v-model:value="search"></SysDict>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SysDict from '@/components/sysDict/sysDict.vue';
const search = ref('');
</script>

<style scoped></style>
