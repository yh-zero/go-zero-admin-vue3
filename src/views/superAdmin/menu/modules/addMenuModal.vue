<template>
  <SysModal width="1080px" @callBackOk="callBackOk" :formRef="formRef">
    <div class="pt-[20px]">
      <div class="flex items-center w-full bg-[#fffae6] p-2">
        <div class="bg-[#f08c0e] w-[12px] h-[12px] flex justify-center items-center rounded-full text-xs text-white mr-1">!</div>
        <span class="text-[#f08c0e] text-xs"> 新增菜单，需要在角色管理内配置权限才可使用</span>
      </div>
      <a-form ref="formRef" @finishFailed="finishFailed" :rules="rules" :model="menuData" name="basic" :labelCol="{ span: 24 }" :wrapper-col="{ span: 24 }" layout="inline">
        <a-form-item name="name" label="路由Name" class="w-[30%]">
          <a-input v-model:value="menuData.name" placeholder="唯一英文字符串" />
        </a-form-item>
        <a-form-item name="path" label="路由Path" class="w-[30%]">
          <a-input v-model:value="menuData.path" placeholder="建议只在后方拼接参数" />
        </a-form-item>
        <a-form-item label="是否隐藏" class="w-[30%]">
          <a-select allowClear v-model:value="menuData.hidden" placeholder="请选择" :options="selectYesNo" />
        </a-form-item>
        <!--  -->
        <div class="mt-5 w-full flex">
          <a-form-item label="父节点ID" class="w-[30%]">
            <a-input :disabled="attrs.isAdd" v-model:value="menuData.parentId" placeholder="父节点ID" />
          </a-form-item>
          <a-form-item name="component" label="文件路径" class="w-[62%]">
            <a-input v-model:value="menuData.component" placeholder="页面:view/xxx/xx.vue 插件:plugin/xx/xx.vue" />
            <div class="pt-1">
              <span class="text-xs"> 如果菜单包含子菜单，请创建router-view二级路由页面或者 </span>
              <a-button size="small" @click="menuData.component = 'views/routerHolder.vue'">点我设置</a-button>
            </div>
          </a-form-item>
        </div>
        <!--  -->
        <div class="mt-5 w-full flex">
          <a-form-item :name="['meta', 'title']" :rules="[{ required: true, message: '请输入文件路径' }]" label="展示名称" class="w-[30%]">
            <a-input v-model:value="menuData.meta.title" placeholder="展示名称" />
          </a-form-item>
          <a-form-item label="图标" class="w-[30%]">
            <a-select allowClear v-model:value="menuData.meta.icon" placeholder="图标">
              <a-select-option :value="icon.value" v-for="icon of selectIcon" :key="icon.value">
                <component :is="icon.value"></component>
                {{ icon.value }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="排序标记" class="w-[30%]">
            <a-input-number class="w-full" :min="0" v-model:value="menuData.sort" placeholder="排序标记" />
          </a-form-item>
        </div>
        <!--  -->
        <div class="mt-5 w-full flex">
          <a-form-item label="高亮菜单" class="w-[30%]">
            <a-input v-model:value="menuData.meta.activeName" placeholder="高亮菜单" />
          </a-form-item>
          <a-form-item label="keepAlive" class="w-[30%]">
            <a-select allowClear v-model:value="menuData.meta.keepAlive" placeholder="请选择" :options="selectYesNo" />
          </a-form-item>
          <a-form-item label="CloseTab" class="w-[30%]">
            <a-select allowClear v-model:value="menuData.meta.closeTab" placeholder="请选择" :options="selectYesNo" />
          </a-form-item>
        </div>
        <!--  -->
        <div class="mt-5 w-full flex">
          <a-form-item label="是否为基础页面" class="w-[30%]">
            <a-select allowClear v-model:value="menuData.meta.defaultMenu" placeholder="请选择" :options="selectYesNo" />
          </a-form-item>
        </div>
      </a-form>
      <!-- ======== 新增菜单参数 ======= -->
      <div class="mt-5 w-full">
        <a-button type="primary" @click="addParamaters">
          <template #icon><EditOutlined /></template>
          <span>新增菜单参数</span>
        </a-button>
        <!-- table -->
        <SysTable rowKey="ID" :dataSource="menuData.parameters" :pagination="false" :columns="columns">
          <template #tableSlot="{ column, record, index }">
            <template v-if="column.slotName == 'type'">
              <a-select v-model:value="record.type" class="w-full" allowClear placeholder="请选择" :options="selectParameters" />
            </template>
            <template v-if="column.slotName == 'key'">
              <a-input v-model:value="record.key" class="w-full" placeholder="请输入参数key" />
            </template>
            <template v-if="column.slotName == 'value'">
              <a-input v-model:value="record.value" class="w-full" placeholder="请输入备注" />
            </template>
            <template v-if="column.slotName == 'edit'">
              <a-button type="primary" danger @click="menuData.parameters.splice(index, 1)"
                ><template #icon> <DeleteOutlined /> </template><span>删除</span></a-button
              >
            </template>
          </template>
        </SysTable>
      </div>
      <!-- ========= 新增可控按钮 ======= -->
      <div class="mt-5 w-full">
        <div class="flex items-center">
          <a-button type="primary" @click="addBtns">
            <template #icon><EditOutlined /></template>
            <span>新增可控按钮</span>
          </a-button>
          <!-- <span class="w-[15px] h-[15px] bg-[#606266] text-white rounded-full items-center text-center text-[12px] ml-2 cursor-pointer">?</span> -->
        </div>
        <!-- table -->
        <SysTable :dataSource="menuData.menuBtn" :pagination="false" :columns="columnsBtn">
          <template #tableSlot="{ column, record, index }">
            <template v-if="column.slotName == 'name'">
              <a-input v-model:value="record.name" class="w-full" placeholder="请输入按钮名称" />
            </template>
            <template v-if="column.slotName == 'desc'">
              <a-input v-model:value="record.desc" class="w-full" placeholder="请输入备注" />
            </template>
            <template v-if="column.slotName == 'edit'">
              <a-button type="primary" danger @click="menuData.menuBtn.splice(index, 1)"
                ><template #icon> <DeleteOutlined /> </template><span>删除</span></a-button
              >
            </template>
          </template>
        </SysTable>
      </div>
    </div>
  </SysModal>
</template>

<script setup lang="ts">
import { useAttrs, watchEffect, reactive, ref } from 'vue';
import SysModal from '@/components/sysModal/index.vue';
import { useSelectHooks } from '@/hooks/baseSelectHooks';
import { defaultMenuData, selectParameters, columns, columnsBtn, rules } from './data';
import { addBaseMenu, updateBaseMenu } from '@/api/modules/menuApi';
import { MenuDataType } from '@/types/menu';
const { selectYesNo, selectIcon } = useSelectHooks();
const emits = defineEmits(['getList']);
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initMenuData();
  }
});
let menuData = ref<MenuDataType>({ ...defaultMenuData });
// 设置默认表单
function initMenuData() {
  if (attrs.selectItem) {
    if (attrs.isAdd) {
      const selectItem = attrs.selectItem as MenuDataType;
      menuData.value = { ...defaultMenuData };
      menuData.value.parentId = selectItem.ID;
    } else {
      menuData.value = { ...(attrs.selectItem as MenuDataType) };
    }
  } else {
    menuData.value = { ...defaultMenuData };
  }
}
const formRef = ref();
async function callBackOk() {
  if (attrs.isAdd) {
    await addBaseMenu(menuData.value);
  } else {
    await updateBaseMenu(menuData.value);
  }
  emits('getList');
}
function addParamaters() {
  menuData.value.parameters.push({
    type: 'query',
    key: '',
    value: '',
  });
}
function addBtns() {
  menuData.value.menuBtn.push({
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
