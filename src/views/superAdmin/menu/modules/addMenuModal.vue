<template>
  <SysModal @ok="ok"> </SysModal>
</template>

<script setup lang="ts">
import SysModal from '@/components/SysModal/index.vue';
function ok() {
  console.log('ok');
}
</script>

<style scoped></style>
