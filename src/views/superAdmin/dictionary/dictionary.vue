<template>
  <div class="w-full h-full">
    <div class="flex items-center w-full bg-[#fffae6] p-2">
      <div class="bg-[#f08c0e] w-[12px] h-[12px] flex justify-center items-center rounded-full text-xs text-white mr-1">!</div>
      <span class="text-[#f08c0e] text-xs"> 取字典且缓存方法已在前端utils/dictionary 已经封装完成 不必自己书写 使用方法查看文件内注释</span>
    </div>
    <div class="flex h-full">
      <div class="w-[240px] bg-white p-[1rem] mt-2">
        <LeftList v-model:value="selectId"></LeftList>
      </div>
      <div class="flex-1 bg-white p-[1rem] mt-2 ml-4">
        <RightList :selectId="selectId"></RightList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LeftList from './modules//leftList/index.vue';
import RightList from './modules/rightList/index.vue';
const selectId = ref();
</script>

<style scoped></style>
