<template>
  <SysModal width="800px" @callBackOk="callBackOk" :formRef="formRef">
    <div class="pt-[20px]">
      <a-form layout="horizontal" ref="formRef" @finishFailed="finishFailed" :rules="rules" :model="formData" name="basic" :labelCol="{ span: 3 }" :wrapper-col="{ span: 24 }">
        <a-form-item name="name" label="字典名(中)" class="w-full">
          <a-input v-model:value="formData.name" placeholder="字典名(中)" />
        </a-form-item>
        <a-form-item name="type" label="字典名(英)" class="w-full">
          <a-input v-model:value="formData.type" placeholder="字典名(英)" />
        </a-form-item>
        <a-form-item name="status" label="状态" class="w-full">
          <a-switch v-model:checked="formData.status" :checkedValue="1" :unCheckedValue="0" />
        </a-form-item>
        <a-form-item name="desc" label="描述" class="w-full">
          <a-input v-model:value="formData.desc" placeholder="描述" />
        </a-form-item>
      </a-form>
    </div>
  </SysModal>
</template>

<script setup lang="ts">
import { useAttrs, watchEffect, reactive, ref } from 'vue';
import SysModal from '@/components/sysModal/index.vue';
import { defaultData, rules } from './data';
import { DictionaryListResp } from '@/types/dictionary';
import { createSysDictionary, updateSysDictionary } from '@/api/modules/dictionary';
const emits = defineEmits(['getList']);
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initformData();
  }
});
let formData = ref<DictionaryListResp>({ ...defaultData });
// 设置默认表单
function initformData() {
  if (attrs.selectItem) formData.value = { ...(attrs.selectItem as DictionaryListResp) };
}

const formRef = ref();
async function callBackOk() {
  if (attrs.isAdd) {
    await createSysDictionary(formData.value);
  } else {
    await updateSysDictionary(formData.value);
  }
  emits('getList');
}
//
function finishFailed({ values, errorFields, outOfDate }: any) {
  // message.error('请完善表单信息');
}
</script>

<style scoped></style>
