<template>
  <div class="h-[56px] flex items-center">
    <div
      @click="menuStatus.collapsed = !menuStatus.collapsed"
      class="mr-2 cursor-pointer"
    >
      <DoubleLeftOutlined v-show="!menuStatus.collapsed" />
      <DoubleRightOutlined v-show="menuStatus.collapsed" />
    </div>

    <a-breadcrumb separator=">">
      <a-breadcrumb-item v-for="(route, index) in $route.matched" :key="index">
        {{ route.meta.title }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store/modules/layout';
import { storeToRefs } from 'pinia';
const layoutStore = useLayoutStore();
const { menuStatus } = storeToRefs(layoutStore);
</script>

<style lang="scss" scoped></style>
