<template>
  <div class="h-[40px] flex items-center" v-if="tabList && tabList.length > 0">
    <a-tabs
      size="samll"
      v-model:activeKey="activeKey"
      type="editable-card"
      @edit="onEdit"
      tab-position="top"
      class="w-full"
      hideAdd
      @tabClick="checkRouter"
    >
      <a-tab-tab v-for="tab in tabList" :key="tab.name" :tab="tab.meta.title" :closable="tab.meta.closable">
      </a-tab-tab>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { RouteLocationNormalizedLoaded, RouteParamsRaw, LocationQueryRaw } from 'vue-router';
import { MateType } from '@/types/layout';
import { useLayoutStore } from '@/store/modules/layout';
import { useUserStore } from '@/store/modules/user';
import { MenuRespType } from '@/types/layout';
const route = useRoute();
const router = useRouter();
const layoutStore = useLayoutStore();
const userStore = useUserStore();
interface TabType {
  name: string; //跳转路由name
  param: RouteParamsRaw; //参数
  query: LocationQueryRaw; //参数
  meta: MateType; //路由信息
}
// 标签列表
const tabList = ref<TabType[]>([]);

const activeKey = ref();
onMounted(() => {
  // 添加默认路由
  setDefaultRouter(layoutStore.menuResList);
});
const defaultTab = ref<TabType>();
function setDefaultRouter(list: MenuRespType[]) {
  list.forEach(menu => {
    if (userStore.loginResp.userInfo.authority.defaultRouter == menu.name) {
      tabList.value.push({
        name: menu.name,
        param: {},
        query: {},
        meta: menu.meta,
      });
      tabList.value[0].meta.closable = false;
      defaultTab.value = tabList.value[0];
    }
    if (menu.children) {
      setDefaultRouter(menu.children);
    }
  });
}

// 监听路由变化
watch(
  () => route,
  (to: RouteLocationNormalizedLoaded) => {
    if (to.name === 'login' || to.name === 'Reload') {
      return;
    }
    // 添加到标签列表
    addTab(to);
    // 激活tab
    activeKey.value = to.name;
    setTabStorage(to);
  },
  { deep: true },
);

// ========== 切换路由 ==========
function checkRouter(tabName: string) {
  tabList.value.forEach(tab => {
    if (tabName == tab.name) {
      router.push({ name: tab.name, params: tab.param, query: tab.query });
    }
  });
}
// ========== 添加标签 ==========
function addTab(tab: RouteLocationNormalizedLoaded) {
  // 判断是否已经存在 不存在则添加 反之则替换
  const findIndex = tabList.value.findIndex(res => {
    return res.name == tab.name;
  });
  if (findIndex != -1) {
    tabList.value[findIndex] = {
      name: tab.name as string,
      param: tab.params,
      query: tab.query,
      meta: tab.meta as MateType,
    };
  } else {
    tabList.value.push({
      name: tab.name as string,
      param: tab.params,
      query: tab.query,
      meta: tab.meta as MateType,
    });
  }
}

// ========== 删除标签 ==========
const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action !== 'add') {
    remove(targetKey as string);
  }
};
const remove = (targetKey: string) => {
  tabList.value = tabList.value.filter(tab => tab.name !== targetKey);
};
// ========== sessionStorage ==========
// 存储标签
function setTabStorage(tab: RouteLocationNormalizedLoaded) {
  return;
}
// remove
function removeTabStorage() {
  return;
}
</script>

<style scoped></style>
