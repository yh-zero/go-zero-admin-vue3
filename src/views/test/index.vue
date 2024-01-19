<template>
  <!-- 基本使用 -->

  <SysDict type="select" :needForm="true" dict="method" v-model:value="selectVal"></SysDict>

  <!-- labelName="表单名字" placeholder="请选择123" -->
  <SysDict
    labelName="表单名字"
    placeholder="请选择123"
    type="select"
    :needForm="true"
    dict="method"
    v-model:value="selectVal"
  ></SysDict>
  <!-- 多选 mode="multiple" -->
  <SysDict
    labelName="多选"
    placeholder="请选择123"
    type="select"
    :needForm="true"
    dict="method"
    mode="multiple"
    v-model:value="selectVal"
  ></SysDict>

  <p>select: {{ selectVal }}</p>
  <span>========================================</span>
  <!-- 其他类型 type="checkbox" -->
  <SysDict type="checkbox" :needForm="true" dict="method" v-model:value="checkboxVal"></SysDict>
  <p>checkbox: {{ checkboxVal }}</p>
  <span>========================================</span>

  <!-- 其他类型 type="radio" -->
  <SysDict type="radio" :needForm="true" dict="method" v-model:value="radioVal"></SysDict>
  <p>radio: {{ radioVal }}</p>
  <span>========================================</span>
  <!-- 其他类型 type="text" -->
  <SysDict labelName="TEXT类型" type="text" :id="3" :needForm="true" dict="method" v-model:value="radioVal"></SysDict>

  <SysDict labelName="TEXT插槽" type="text" :id="3" :needForm="true" dict="method" v-model:value="radioVal">
    <template #text="{ text, option }">
      <span class="text-[red]">{{ text }}</span>
      <span class="text-[blue]">{{ option }}</span>
    </template>
  </SysDict>
  <Upload :file-number="1" v-model:value="data" list-type="picture-card"></Upload>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import SysDict from '@/components/sysDict/sysDict.vue';
const selectVal = ref();
const checkboxVal = ref();
const radioVal = ref('');

import Upload from '@/components/sysUpload/index.vue';
const data = ref('');
</script>

<style scoped></style>
