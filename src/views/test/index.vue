<template>
  <Upload :file-number="10" v-model:value="file" list-type="picture-card"></Upload>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Upload from '@/components/sysUpload/index.vue';
const file = ref(['https://go-zero-admin.oss-cn-beijing.aliyuncs.com/go-zero-admin/1704800888902_PixPin_2024-01-09_10-32-50 - 副本.png']);
</script>

<style scoped></style>
