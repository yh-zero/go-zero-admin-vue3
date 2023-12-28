<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(() => {
  console.log('====================================');
  console.log('aaas');
  console.log('====================================');
  router.go(-1);
});
</script>

<style scoped></style>
