<template>
  <SysModal width="960px" @call-back-ok="ok" :formRef="formRef">
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

        <a-form-item name="selectIds" label="用户角色" class="w-full">
          <a-tree-select
            v-model:value="modalData.selectIds"
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
        <a-form-item label="启用" class="w-full">
          <a-switch :checkedValue="1" :unCheckedValue="-1" v-model:checked="modalData.enable" />
        </a-form-item>
        <a-form-item label="启用" class="w-full">
          <Upload v-if="attrs.open" :file-number="1" v-model:value="modalData.headerImg" list-type="picture-card"></Upload>
        </a-form-item>
      </a-form>
    </div>
  </SysModal>
</template>

<script setup lang="ts">
import { useAttrs, watchEffect, reactive, ref } from 'vue';
import Upload from '@/components/sysUpload/index.vue';
import SysModal from '@/components/sysModal/index.vue';
import { defaultData, rules } from './data';
import { UserListType } from '@/types/userList';
import { register, editUserList } from '@/api/modules/userList';
import lodash from 'lodash';
const emits = defineEmits(['getList']);
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initmodalData();
  }
});
let modalData = ref<UserListType>({ ...defaultData });
// 设置默认表单
function initmodalData() {
  if (attrs.selectItem) {
    modalData.value = lodash.cloneDeep(attrs.selectItem) as UserListType;
  }
}

const formRef = ref();
async function ok() {
  modalData.value.authorityIds = modalData.value.selectIds;
  if (!modalData.value.ID) {
    await register(modalData.value);
  } else {
    await editUserList(modalData.value);
  }
  emits('getList');
}
//
function finishFailed({ values, errorFields, outOfDate }: any) {
  // message.error('请完善表单信息');
}
</script>

<style scoped></style>
