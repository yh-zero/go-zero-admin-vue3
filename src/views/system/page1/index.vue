<template>
  <div>asdasd</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLayoutStore } from '@/store/modules/layout';
const layoutStore = useLayoutStore();
onMounted(() => {
  layoutStore.getMenu();
});
</script>

<style scoped></style>
