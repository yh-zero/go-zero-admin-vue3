<template>
  <a-layout class="h-screen">
    <SysMenu></SysMenu>
    <a-layout>
      <!-- Header -->
      <SysHeader></SysHeader>
      <SysContent></SysContent>
      <!-- <SysFooter></SysFooter> -->
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SysMenu from './sysMenu/index.vue';
import SysHeader from './header/index.vue';
import SysContent from './content/index.vue';
import SysFooter from './footer/index.vue';
</script>

<style scoped></style>
