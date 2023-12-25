<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    class="themebg textColor !w-[220px] text-center"
  >
    <a-menu
      class="themebg textColor"
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <MenuItem :menu-list="menuResList"></MenuItem>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuItem from './menuItem/menuItem.vue';
import { useLayoutStore } from '@/store/modules/layout';
const layoutStore = useLayoutStore();
const menuResList = layoutStore.menuList;
const collapsed = ref(false);
</script>

<style scoped lang="scss"></style>
