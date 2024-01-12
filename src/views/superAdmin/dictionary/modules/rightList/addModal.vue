<template>
  <SysModal width="800px" @callBackOk="callBackOk" :formRef="formRef">
    <div class="pt-[20px]">
      <a-form layout="horizontal" ref="formRef" @finishFailed="finishFailed" :rules="rules" :model="formData" name="basic" :labelCol="{ span: 3 }" :wrapper-col="{ span: 24 }">
        <a-form-item name="label" label="展示值" class="w-full">
          <a-input v-model:value="formData.label" placeholder="展示值" />
        </a-form-item>
        <a-form-item name="value" label="字典值" class="w-full">
          <a-input-number class="w-full" v-model:value="formData.value" placeholder="字典值" />
        </a-form-item>
        <a-form-item name="extend" label="拓展值" class="w-full">
          <a-input v-model:value="formData.extend" placeholder="拓展值" />
        </a-form-item>
        <a-form-item name="status" label="状态" class="w-full">
          <a-switch v-model:checked="formData.status" :checkedValue="1" :unCheckedValue="0" />
        </a-form-item>
        <a-form-item name="sort" label="排序" class="w-full">
          <a-input-number class="w-full" v-model:value="formData.sort" placeholder="排序" />
        </a-form-item>
      </a-form>
    </div>
  </SysModal>
</template>

<script setup lang="ts">
import { useAttrs, watchEffect, reactive, ref } from 'vue';
import SysModal from '@/components/sysModal/index.vue';
import { defaultData, rules } from './data';
import { DictionaryDetailListResp } from '@/types/dictionary';
import { createSysDictionaryInfo, updateSysDictionaryInfo } from '@/api/modules/dictionary';

const emits = defineEmits(['getList']);
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initformData();
  }
});
let formData = ref<DictionaryDetailListResp>({ ...defaultData });
// 设置默认表单
function initformData() {
  if (attrs.selectItem) formData.value = { ...(attrs.selectItem as DictionaryDetailListResp) };
  formData.value.sysDictionaryID = attrs.id as number;
}

const formRef = ref();
async function callBackOk() {
  if (attrs.isAdd) {
    await createSysDictionaryInfo(formData.value);
  } else {
    await updateSysDictionaryInfo(formData.value);
  }
  emits('getList');
}
//
function finishFailed({ values, errorFields, outOfDate }: any) {
  // message.error('请完善表单信息');
}
</script>

<style scoped></style>
