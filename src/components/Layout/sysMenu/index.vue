<template>
  <a-layout-sider v-model:collapsed="menuStatus.collapsed" :trigger="null" collapsible class="themebg textColor !w-[220px] text-center">
    <a-menu v-model:openKeys="menuStatus.openKeys" v-model:selectedKeys="menuStatus.selectedKeys" class="themebg textColor" mode="inline" :style="{ height: '100%', borderRight: 0 }">
      <MenuItem :menu-list="menuResList"></MenuItem>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import MenuItem from './menuItem/menuItem.vue';
import { useLayoutStore } from '@/store/modules/layout';
import { storeToRefs } from 'pinia';
const layoutStore = useLayoutStore();
const { menuStatus } = storeToRefs(layoutStore);
const menuResList = layoutStore.menuList;
</script>

<style scoped lang="scss"></style>
