<template>
  <SysModal width="800px" @callBackOk="callBackOk" :formRef="formRef">
    <div class="flex items-center w-full bg-[#fffae6] p-2">
      <div class="bg-[#f08c0e] w-[12px] h-[12px] flex justify-center items-center rounded-full text-xs text-white mr-1">!</div>
      <span class="text-[#f08c0e] text-xs"> 新增API，需要在角色管理内配置权限才可使用</span>
    </div>
    <div class="pt-[20px]">
      <a-form layout="horizontal" ref="formRef" @finishFailed="finishFailed" :rules="rules" :model="ApiData" name="basic" :labelCol="{ span: 3 }" :wrapper-col="{ span: 24 }">
        <a-form-item name="path" label="路径" class="w-full">
          <a-input v-model:value="ApiData.path" placeholder="请输入路径" />
        </a-form-item>
        <a-form-item name="method" label="请求方式" class="w-full">
          <a-select allowClear v-model:value="ApiData.method" placeholder="请输入Api分组" :options="selectMethods" />
        </a-form-item>
        <a-form-item name="apiGroup" label="Api分组" class="w-full">
          <a-input v-model:value="ApiData.apiGroup" placeholder="请选择请求方式" />
        </a-form-item>
        <a-form-item name="description" label="Api简介" class="w-full">
          <a-input v-model:value="ApiData.description" placeholder="Api简介" />
        </a-form-item>
      </a-form>
    </div>
  </SysModal>
</template>

<script setup lang="ts">
import { useAttrs, watchEffect, reactive, ref } from 'vue';
import SysModal from '@/components/sysModal/index.vue';
import { defaultData, rules, selectMethods } from './data';
import { ApiListRespType } from '@/types/api';
import { createApi, updateApi } from '@/api/modules/api';
const emits = defineEmits(['getList']);
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initApiData();
  }
});
let ApiData = ref<ApiListRespType>({ ...defaultData });
// 设置默认表单
function initApiData() {
  ApiData.value = { ...(attrs.selectItem as ApiListRespType) };
}

const formRef = ref();
async function callBackOk() {
  if (attrs.isAdd) {
    await createApi(ApiData.value);
  } else {
    await updateApi(ApiData.value);
  }
  emits('getList');
}
//
function finishFailed({ values, errorFields, outOfDate }: any) {
  // message.error('请完善表单信息');
}
</script>

<style scoped></style>
