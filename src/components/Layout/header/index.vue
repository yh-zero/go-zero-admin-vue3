<template>
  <a-layout-header class="themebg !h-[96px] textColor flex flex-col justify-center">
    <div class="flex w-full relative">
      <BreadCrumb></BreadCrumb>
      <div class="flex items-center absolute right-0">
        <SysTools class="ml-2"></SysTools>
        <UserTools class="ml-2"></UserTools>
      </div>
    </div>
    <Tabs></Tabs>
  </a-layout-header>
</template>
<script setup lang="ts">
import BreadCrumb from './modules/breadcrumb.vue';
import Tabs from './modules/tabs.vue';
import UserTools from './modules/userTools.vue';
import SysTools from './modules/sysTools/index.vue';
</script>
<style scoped></style>
