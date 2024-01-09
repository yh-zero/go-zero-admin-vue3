<template>
  <Upload :file-number="10" v-model:value="file" list-type="picture-card"></Upload>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Upload from '@/components/sysUpload/index.vue';
const file = ref();
</script>

<style scoped></style>
