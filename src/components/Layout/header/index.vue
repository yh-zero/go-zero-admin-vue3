<template>
  <a-layout-header
    class="themebg !h-[96px] textColor flex flex-col justify-center"
  >
    <BreadCrumb></BreadCrumb>
    <Tabs></Tabs>
  </a-layout-header>
</template>
<script setup lang="ts">
import BreadCrumb from './modules/breadcrumb.vue';
import Tabs from './modules/tabs.vue';
</script>
<style scoped></style>
