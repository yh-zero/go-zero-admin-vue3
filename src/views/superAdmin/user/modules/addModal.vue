<template>
  <SysModal width="960px" @ok="ok" :formRef="formRef">
    <div class="pt-[20px]">
      <a-form layout="horizontal" ref="formRef" @finishFailed="finishFailed" :rules="rules" :model="modalData" name="basic" :labelCol="{ span: 3 }" :wrapper-col="{ span: 24 }">
        <a-form-item name="userName" label="路径" class="w-full">
          <a-input v-model:value="modalData.userName" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item name="passWord" label="密码" class="w-full" v-if="attrs.isAdd">
          <a-input v-model:value="modalData.passWord" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item name="nickName" label="昵称" class="w-full">
          <a-input v-model:value="modalData.nickName" placeholder="请输入昵称" />
        </a-form-item>
        <a-form-item name="authorityIds" label="用户角色" class="w-full">
          <a-tree-select
            v-model:value="modalData.authorityIds"
            :fieldNames="{
              label: 'authorityName',
              value: 'authorityId',
            }"
            style="width: 100%"
            tree-checkable
            :allowClear="false"
            tree-default-expand-all
            :height="233"
            :tree-data="attrs.authorityListTree"
            :max-tag-count="3"
            tree-node-filter-prop="title"
          >
            <template #authorityName="{ authorityName }">
              <template>{{ authorityName }}</template>
            </template>
          </a-tree-select>
        </a-form-item>
      </a-form>
    </div>
  </SysModal>
</template>

<script setup lang="ts">
import { useAttrs, watchEffect, reactive, ref } from 'vue';
import SysModal from '@/components/sysModal/index.vue';
import { defaultData, rules } from './data';
import { AddUserInfoType, UserListType } from '@/types/userList';

const emits = defineEmits(['getList']);
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initmodalData();
  }
});
let modalData = reactive<AddUserInfoType>({ ...defaultData });
// 设置默认表单
function initmodalData() {
  if (attrs.selectItem) {
    const item = attrs.selectItem as UserListType;
    modalData.userName = item.userName;
    modalData.passWord = '';
    modalData.nickName = item.nickName;
    modalData.authorityIds = item.selectIds || [];
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
