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
      <a-tab-pane v-for="tab in tabList" :key="tab.name" :closable="tab.meta.closable">
        <template #tab>
          <a-dropdown
            :trigger="['contextmenu']"
            placement="bottom"
            arrow
            v-if="tab.name !== userStore.loginResp.userInfo.authority.defaultRouter"
          >
            <span>
              {{ tab.meta.title }}
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="closeTabBySelect('this', tab.name)">关闭当前</a-menu-item>
                <a-menu-item @click="closeTabBySelect('left', tab.name)">关闭左侧</a-menu-item>
                <a-menu-item @click="closeTabBySelect('right', tab.name)">关闭右侧</a-menu-item>
                <a-menu-item @click="closeTabBySelect('other', tab.name)">关闭其他</a-menu-item>
                <a-menu-item @click="closeTabBySelect('all', tab.name)">关闭所有</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <span v-else>
            {{ tab.meta.title }}
          </span>
        </template>
      </a-tab-pane>
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

onMounted(() => {
  initTab();
});

// ========== 下拉菜单事件===========
type SelectType = 'this' | 'left' | 'right' | 'other' | 'all';

function closeTabBySelect(type: SelectType, name: string) {
  if (type === 'this') {
    tabList.value = tabList.value.filter(tab => tab.name !== name);
    router.push({ name: tabList.value[tabList.value.length - 1].name });
  } else if (type === 'left') {
    const tabIndex = tabList.value.findIndex(tab => tab.name === name);
    if (tabIndex !== -1) {
      tabList.value = tabList.value.slice(tabIndex);
      router.push({ name: tabList.value[tabList.value.length - 1].name });
    }
  } else if (type === 'right') {
    const tabIndex = tabList.value.findIndex(tab => tab.name === name);
    if (tabIndex !== -1) {
      tabList.value = tabList.value.slice(0, tabIndex + 1);
      router.push({ name: tabList.value[tabList.value.length - 1].name });
    }
  } else if (type === 'other') {
    tabList.value = tabList.value.filter(tab => tab.name === name);
    router.push({ name: name });
  } else if (type === 'all') {
    tabList.value = [];
    router.push({ name: userStore.loginResp.userInfo.authority.defaultRouter });
  } else {
    console.error('Invalid type:', type);
  }
  // 默认路由不存在 则在数组最前面添加默认路由
  if (tabList.value.findIndex(tab => tab.name === userStore.loginResp.userInfo.authority.defaultRouter) == -1) {
    setDefaultRouter(layoutStore.menuResList);
  }
  setTabStorage();
}

// =========== 路由 ===============
// 获取缓存中的列表
function initTab() {
  // 添加默认路由
  setDefaultRouter(layoutStore.menuResList);
  tabList.value = getTabStorage();
}
const defaultTab = ref<TabType>();
function setDefaultRouter(list: MenuRespType[]) {
  list.forEach(menu => {
    if (userStore.loginResp.userInfo.authority.defaultRouter == menu.name) {
      tabList.value.unshift({
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
  },
  { deep: true },
);

//  切换路由
function checkRouter(tabName: string) {
  tabList.value.forEach(tab => {
    if (tabName == tab.name) {
      router.push({ name: tab.name, params: tab.param, query: tab.query });
    }
  });
}

// =========== 标签 ===============
// 标签列表
const tabList = ref<TabType[]>([]);
const activeKey = ref();
// 添加标签
function addTab(tab: RouteLocationNormalizedLoaded) {
  tab.meta.closable = userStore.loginResp.userInfo.authority.defaultRouter !== tab.name; //默认路由不能关闭
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
  setTabStorage();
}

//  删除标签
const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action !== 'add') {
    remove(targetKey as string);
  }
};
const remove = (targetKey: string) => {
  tabList.value = tabList.value.filter(tab => tab.name !== targetKey);
  router.push({ name: tabList.value[tabList.value.length - 1].name });
  setTabStorage();
};

// ========== sessionStorage ==========
const TAB_SESSION_KEY = 'tabs';
// 存储标签
function setTabStorage() {
  window.sessionStorage.setItem(TAB_SESSION_KEY, JSON.stringify(tabList.value));
}
// 获取标签
function getTabStorage(): TabType[] {
  return JSON.parse(sessionStorage.getItem(TAB_SESSION_KEY) || '') || [];
}
</script>

<style scoped lang="scss"></style>
