<template>
  <template v-for="(item, index) in menuList">
    <a-sub-menu
      v-if="item.children && item.children.length > 0"
      :key="item.path"
      :index="item.path"
    >
      <template #title>
        {{ item.meta?.icon }}
        <span>{{ item.meta?.title }} </span>
      </template>
      <MenuItem :menu-list="item.children"></MenuItem>
    </a-sub-menu>
    <a-menu-item v-else :key="item.path + index" :index="item.path">
      {{ item.meta?.icon }}

      <span> {{ item.meta?.title }}</span>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router';
// 参数
defineProps<{ menuList: RouteRecordRaw[] }>();
</script>

<style lang="scss" scoped></style>
