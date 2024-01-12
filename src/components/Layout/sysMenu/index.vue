<template>
  <a-layout-sider v-model:collapsed="menuStatus.collapsed" :trigger="null" collapsible class="themebg textColor !w-[220px] text-center">
    <a-menu v-model:openKeys="menuStatus.openKeys" v-model:selectedKeys="menuStatus.selectedKeys" class="themebg textColor" mode="inline" :style="{ height: '100%', borderRight: 0 }">
      <MenuItem :menu-list="menuResList"></MenuItem>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import MenuItem from './menuItem/menuItem.vue';
import { useLayoutStore } from '@/store/modules/layout';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const route = useRoute();
const layoutStore = useLayoutStore();
const { menuStatus } = storeToRefs(layoutStore);
const menuResList = layoutStore.menuList;
onMounted(() => {
  layoutStore.setMenuStatus({ collapsed: false, openKeys: openKeys() as string[], selectedKeys: selectedKeys() as string[] });
});
// 根据当前路由获取openKeys
const openKeys = () => {
  const matchedKeys = route.matched.slice(1, route.matched.length - 1).map(item => item.path);
  const openKeysList = matchedKeys.map(res => {
    return res.split('/').pop();
  });
  return openKeysList;
};

// 根据当前路由获取selectedKeys
const selectedKeys = () => {
  const lastRoutePath = route.matched[route.matched.length - 1].path;
  const lastRouteText = lastRoutePath.split('/').pop();
  return [lastRouteText]; // 将最后一个匹配的路由的最后一项作为selectedKeys
};
</script>

<style scoped lang="scss">
/* 根据需要添加样式 */
</style>
