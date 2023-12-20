<template>
  <div class="w-[100px] h-[100px] themebg textColor">SYSTEM</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { asyncMenu } from '@/api/modules/menuApi';
onMounted(() => {
  asyncMenu();
});
</script>

<style scoped></style>
