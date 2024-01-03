<template>
  <SysModal width="800px" @ok="ok" :formRef="formRef">
    <div class="pt-[20px]">
      <a-form layout="horizontal" ref="formRef" @finishFailed="finishFailed" :rules="rules" :model="authData" name="basic" :labelCol="{ span: 3 }" :wrapper-col="{ span: 24 }">
        <a-form-item name="parentId" label="父级角色" class="w-full">
          <a-select allowClear v-model:value="authData.parentId" placeholder="父级角色" :options="selectYesNo" />
        </a-form-item>
        <a-form-item name="authorityId" label="角色ID" class="w-full">
          <a-input v-model:value="authData.authorityId" placeholder="角色ID" />
        </a-form-item>
        <a-form-item name="authorityName" label="角色姓名" class="w-full">
          <a-input v-model:value="authData.authorityName" placeholder="角色姓名" />
        </a-form-item>
      </a-form>
    </div>
  </SysModal>
</template>

<script setup lang="ts">
import { useAttrs, watchEffect, reactive, ref } from 'vue';
import SysModal from '@/components/SysModal/index.vue';
import { useSelectHooks } from '@/hooks/baseSelectHooks';
import { defaultData, rules } from './data';
import { addBaseMenu } from '@/api/modules/menuApi';
import { AuthorityType } from '@/types/authority';

const { selectYesNo, selectIcon } = useSelectHooks();
const emits = defineEmits(['getList']);
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initauthData();
  }
});
let authData = reactive<AuthorityType>({ ...defaultData });
// 设置默认表单
function initauthData() {
  if (attrs.selectItem) {
    if (attrs.isAdd) {
      const selectItem = attrs.selectItem as AuthorityType;
      authData = reactive<AuthorityType>({ ...defaultData });
      authData.parentId = selectItem.authorityId;
    } else {
      authData = { ...(attrs.selectItem as AuthorityType) };
    }
  } else {
    authData = reactive<AuthorityType>({ ...defaultData });
  }
}
const formRef = ref();
async function ok() {
  emits('getList');
}

//
function finishFailed({ values, errorFields, outOfDate }: any) {
  // message.error('请完善表单信息');
}
</script>

<style scoped></style>
