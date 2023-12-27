<template>
  <template v-for="(item, index) in menuList">
    <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.path" :index="item.path">
      <template #title>
        <component :is="item.meta?.icon"></component>
        <span>{{ item.meta?.title }} </span>
      </template>
      <MenuItem :menu-list="item.children"></MenuItem>
    </a-sub-menu>
    <a-menu-item v-else :key="item.path + index" :index="item.path" @click="toPage(item)">
      <component :is="item.meta?.icon"></component>

      <span> {{ item.meta?.title }}</span>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';
import router from '@/router';

// 参数
defineProps<{ menuList: RouteRecordRaw[] }>();
function toPage(page: RouteRecordRaw) {
  if (page.name) {
    router.push({ name: page.name });
  } else {
    router.push({ path: page.path });
  }
}
</script>

<style scoped></style>
