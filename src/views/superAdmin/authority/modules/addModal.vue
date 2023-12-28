<template>
  <SysModal width="800px" @ok="ok" :formRef="formRef">
    <div class="pt-[20px]">
      <div class="flex items-center w-full bg-[#fffae6] p-2">
        <div class="bg-[#f08c0e] w-[12px] h-[12px] flex justify-center items-center rounded-full text-xs text-white mr-1">!</div>
        <span class="text-[#f08c0e] text-xs"> 新增菜单，需要在角色管理内配置权限才可使用</span>
      </div>
      <a-form ref="formRef" @finishFailed="finishFailed" :rules="rules" :model="menuData" name="basic" :labelCol="{ span: 24 }" :wrapper-col="{ span: 24 }">
        <a-form-item name="name" label="路由Name" class="w-full">
          <a-input v-model:value="menuData.name" placeholder="唯一英文字符串" />
        </a-form-item>
        <a-form-item name="path" label="路由Path" class="w-full">
          <a-input v-model:value="menuData.path" placeholder="建议只在后方拼接参数" />
        </a-form-item>
        <a-form-item label="是否隐藏" class="w-full">
          <a-select allowClear v-model:value="menuData.hidden" placeholder="请选择" :options="selectYesNo" />
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
import { MenuDataType } from '@/types/menu';
const { selectYesNo, selectIcon } = useSelectHooks();
const emits = defineEmits(['getList']);
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initMenuData();
  }
});
let menuData = reactive<MenuDataType>({ ...defaultData });
// 设置默认表单
function initMenuData() {
  if (attrs.selectItem) {
    if (attrs.isAdd) {
      const selectItem = attrs.selectItem as MenuDataType;
      menuData = reactive<MenuDataType>({ ...defaultData });
      menuData.parentId = selectItem.ID;
    } else {
      menuData = attrs.selectItem as MenuDataType;
    }
  } else {
    menuData = reactive<MenuDataType>({ ...defaultData });
  }
}
const formRef = ref();
async function ok() {
  await addBaseMenu(menuData);
  emits('getList');
}
function addParamaters() {
  menuData.parameters.push({
    type: 'query',
    key: '',
    value: '',
  });
}
function addBtns() {
  menuData.menuBtn.push({
    name: '',
    desc: '',
  });
}

//
function finishFailed({ values, errorFields, outOfDate }: any) {
  // message.error('请完善表单信息');
}
</script>

<style scoped></style>
