<template>
  <SysModal width="800px" @callBackOk="callBackOk" :formRef="formRef">
    {{ authData }}
    <div class="pt-[20px]">
      <a-form layout="horizontal" ref="formRef" @finishFailed="finishFailed" :rules="rules" :model="authData" name="basic" :labelCol="{ span: 3 }" :wrapper-col="{ span: 24 }">
        <a-form-item name="parentId" label="父级角色" class="w-full">
          <a-tree-select
            :disabled="attrs.title != '编辑角色'"
            v-model:value="authData.parentId"
            show-search
            :fieldNames="{
              label: 'authorityName',
              value: 'authorityId',
            }"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="Please select"
            allow-clear
            tree-default-expand-all
            :tree-data="attrs.dataSource"
            tree-node-filter-prop="label"
          >
            <template #authorityName="{ authorityName }">
              <template>{{ authorityName }}</template>
            </template>
          </a-tree-select>
          <!-- <a-select :disabled="attrs.title == '添加子角色'" allowClear v-model:value="authData.parentId" placeholder="父级角色" :options="selectYesNo" /> -->
        </a-form-item>
        <a-form-item name="authorityId" label="角色ID" class="w-full">
          <a-input-number :controls="false" class="w-full" :disabled="attrs.title == '编辑角色'" v-model:value="authData.authorityId" placeholder="角色ID" />
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
import SysModal from '@/components/sysModal/index.vue';
import { useSelectHooks } from '@/hooks/baseSelectHooks';
import { defaultData, rules } from './data';
import { createAuthority, updateAuthority } from '@/api/modules/authority';
import { AuthorityType } from '@/types/authority';

const { selectYesNo, selectIcon } = useSelectHooks();
const emits = defineEmits(['getList']);
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initauthData();
  }
});
let authData = reactive<AuthorityType>(defaultData);
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
async function callBackOk() {
  if (attrs.isAdd) {
    await createAuthority(authData);
  } else {
    await updateAuthority(authData);
  }
  emits('getList');
}

//
function finishFailed({ values, errorFields, outOfDate }: any) {
  // message.error('请完善表单信息');
}
</script>

<style scoped></style>
