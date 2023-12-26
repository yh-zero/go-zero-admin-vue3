<template>
  <SysModal width="1080px" @ok="ok">
    <div class="pt-[20px]">
      <div class="flex items-center w-full bg-[#fffae6] p-2">
        <div class="bg-[#f08c0e] w-[12px] h-[12px] flex justify-center items-center rounded-full text-xs text-white mr-1">!</div>
        <span class="text-[#f08c0e] text-xs"> 新增菜单，需要在角色管理内配置权限才可使用</span>
      </div>
      <a-form :model="menuData" name="basic" :labelCol="{ span: 24 }" :wrapper-col="{ span: 24 }" layout="inline" @finishFailed="onFinishFailed">
        <a-form-item label="路由Name" class="w-[30%]">
          <a-input v-model:value="menuData.name" placeholder="唯一英文字符串" />
        </a-form-item>
        <a-form-item label="路由Path" class="w-[30%]">
          <a-input v-model:value="menuData.path" placeholder="建议只在后方拼接参数" />
        </a-form-item>
        <a-form-item label="是否隐藏" class="w-[30%]">
          <a-select allowClear v-model:value="menuData.hidden" placeholder="请选择" :options="selectYesNo" />
        </a-form-item>
        <!--  -->
        <div class="mt-5 w-full flex">
          <a-form-item label="父节点ID" class="w-[30%]">
            <a-input v-model:value="menuData.parentId" placeholder="父节点ID" />
          </a-form-item>
          <a-form-item label="文件路径" class="w-[62%]">
            <a-input v-model:value="menuData.component" placeholder="页面:view/xxx/xx.vue 插件:plugin/xx/xx.vue" />
            <div class="pt-1">
              <span class="text-xs"> 如果菜单包含子菜单，请创建router-view二级路由页面或者 </span>
              <a-button size="small" @click="menuData.component = 'view/routerHolder.vue'">点我设置</a-button>
            </div>
          </a-form-item>
        </div>
        <!--  -->
        <div class="mt-5 w-full flex">
          <a-form-item label="展示名称" class="w-[30%]">
            <a-input v-model:value="menuData.meta.title" placeholder="展示名称" />
          </a-form-item>
          <a-form-item label="图标" class="w-[30%]">
            <a-select allowClear v-model:value="menuData.meta.icon" placeholder="图标" :options="selectYesNo" />
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
        <SysTable :dataSource="menuData.parameters" :pagination="false" :columns="columns">
          <template #tableSlot="{ column, record }">
            <template v-if="column.slotName == 'type'">
              <a-select class="w-full" allowClear placeholder="请选择" :options="selectParameters" />
            </template>

            <template v-if="column.slotName == 'key'">
              <a-input class="w-full" placeholder="请输入参数key" />
            </template>

            <template v-if="column.slotName == 'value'">
              <a-button type="link"
                ><template #icon> <DeleteOutlined /> </template
              ></a-button>
            </template>
          </template>
        </SysTable>
      </div>
    </div>
  </SysModal>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import SysModal from '@/components/SysModal/index.vue';
import { menuData, selectYesNo, selectParameters, columns } from './data';

function ok() {
  console.log('ok');
}
function addParamaters() {
  menuData.parameters.push({
    type: 'query',
    key: '',
    value: '',
  });
}
//
function onFinishFailed() {
  return true;
}
</script>

<style scoped></style>
