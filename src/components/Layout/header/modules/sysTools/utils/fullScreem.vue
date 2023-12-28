<template>
  <div class="cursor-pointer" @click="clickFull">
    <FullscreenOutlined v-show="isFull" />
    <FullscreenExitOutlined v-show="!isFull" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import screenfull from 'screenfull'; // 引入screenfull
const isFull = ref(false);
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', changeFullShow);
  }
});
onUnmounted(() => {
  screenfull.off('change');
});
const changeFullShow = () => {
  isFull.value = !screenfull.isFullscreen;
};
const clickFull = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
};
</script>

<style scoped></style>
