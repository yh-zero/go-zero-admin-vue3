<template>
  <div class="cursor-pointer" @click="handleReload"><RedoOutlined :class="[reload ? 'reloading' : '']" /></div>
</template>

<script setup lang="ts">
import { store } from '@/store';
import { ref, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSystemStore } from '@/store/modules/system';
const sysStore = useSystemStore();
const router = useRouter();
const route = useRoute();
const reload = ref(false);
const handleReload = () => {
  reload.value = true;
  toReload();
  setTimeout(() => {
    reload.value = false;
  }, 500);
};

let reloadTimer = null;
const toReload = async () => {
  if (reloadTimer) {
    window.clearTimeout(reloadTimer);
  }
  reloadTimer = window.setTimeout(async () => {
    if (route.meta.keepAlive) {
      sysStore.setReloadFlag(false);
      await nextTick();
      sysStore.setReloadFlag(true);
    } else {
      const title = route.meta.title;
      router.push({ name: 'Reload', params: { title } });
    }
  }, 400);
};
</script>

<style scoped>
.reloading {
  animation: turn 0.5s linear infinite;
}
@keyframes turn {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
