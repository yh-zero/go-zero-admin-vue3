<template>
  <template v-for="item in showMenuList">
    <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.path" :index="item.path">
      <template #title>
        <component :is="item.meta?.icon"></component>
        <span>{{ item.meta?.title }} </span>
      </template>
      <MenuItem :menu-list="item.children"></MenuItem>
    </a-sub-menu>
    <a-menu-item v-else :key="item.path + ''" :index="item.path" @click="toPage(item)">
      <component :is="item.meta?.icon"></component>

      <span> {{ item.meta?.title }}</span>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import { RouterType } from '@/types/layout';
import router from '@/router';
import { onMounted, ref } from 'vue';

// 参数
const props = defineProps<{ menuList: RouterType[] }>();
const showMenuList = ref<RouterType[]>([]);
onMounted(() => {
  showMenuList.value = props.menuList.filter(res => {
    if (!res.hidden) return res;
  });
});
function toPage(page: RouterType) {
  if (page.name) {
    router.push({ name: page.name });
  } else {
    router.push({ path: page.path });
  }
}
</script>

<style scoped></style>
