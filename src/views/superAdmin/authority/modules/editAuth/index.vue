<template>
  <a-drawer width="600px" :closable="false" placement="right">
    <div class="w-full h-[100%] border-solid border-[1px] border-[#dcdfe6]">
      <a-tabs v-model="activeKey" type="card">
        <a-tab-pane key="1" tab="角色菜单" class="p-2">
          <AuthList :defaultRouter="selectAuth.defaultRouter" :showMenuIds="selectAuth.showMenuIds"></AuthList>
        </a-tab-pane>
        <a-tab-pane key="2" tab="角色API" class="p-2">
          <AuthApi></AuthApi>
        </a-tab-pane>
        <a-tab-pane key="3" tab="资源权限"></a-tab-pane>
      </a-tabs>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { useAttrs, watchEffect, reactive, ref } from 'vue';
import AuthList from './authList.vue';
import AuthApi from './authApi.vue';
import { defaultData } from '../data';
import { AuthorityType } from '@/types/authority';
const attrs = useAttrs();
watchEffect(() => {
  if (attrs.open) {
    initAuthData();
  }
});
let selectAuth = reactive<AuthorityType>({ ...defaultData });
// 设置默认表单
function initAuthData() {
  if (attrs.selectItem) {
    selectAuth = reactive<AuthorityType>({ ...(attrs.selectItem as AuthorityType) });
  } else {
    selectAuth = reactive<AuthorityType>({ ...defaultData });
  }
}
const activeKey = ref('');
</script>

<style scoped></style>
