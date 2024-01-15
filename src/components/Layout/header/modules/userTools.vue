<template>
  <div>
    <a-dropdown placement="bottom" arrow>
      <div class="h-full flex items-center">
        <img class="h-[30px] w-[30px] rounded-full" :src="userStore.loginResp.userInfo.headerImg" alt="" />
        <span class="ml-4">{{ userStore.loginResp.userInfo.nickName }}</span>
        <DownOutlined class="ml-1" />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="item of userStore.loginResp.userInfo.authorities" :key="item.authorityId" @click="handleMenuClick(item)">
            {{ item.authorityName }}
          </a-menu-item>
          <a-menu-item> <UserOutlined class="mr-4" />个人信息 </a-menu-item>
          <a-menu-item @click="logout"> <LoginOutlined class="mr-2" />登出 </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import { AuthorityType } from '@/types/login';
import { useLayoutStore } from '@/store/modules/layout';
const userStore = useUserStore();
const layoutStore = useLayoutStore();
//
//
function handleMenuClick(item: AuthorityType) {
  console.log('====================================');
  console.log(item);
  console.log('====================================');
}

// 登出
function logout() {
  userStore.resetState();
  layoutStore.setMenuStatus({ collapsed: false, openKeys: [], selectedKeys: [] });
}
</script>

<style scoped></style>
