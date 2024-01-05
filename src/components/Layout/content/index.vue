<template>
  <a-layout-content>
    <div class="bg-[#f5f5f5] p-[20px] h-full overflow-auto">
      <router-view v-if="sysStore.reloadFlag" v-slot="{ Component, route }">
        <KeepAlive v-if="route.meta.keepAlive">
          <component :key="route.fullPath" :is="Component"></component>
        </KeepAlive>
        <component v-else :key="route.fullPath" :is="Component"></component>
      </router-view></div
  ></a-layout-content>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/modules/system';
const sysStore = useSystemStore();
</script>

<style scoped></style>
