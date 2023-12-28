<template>
  <div>
    <a-dropdown placement="bottom" arrow>
      <div class="h-full flex items-center">
        <div class="h-[30px] w-[30px] bg-orange-400 rounded-full" src="" alt="" />
        <span class="ml-4">{{ userStore.loginResp.userInfo.nickName }}</span>
        <DownOutlined class="ml-1" />
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="item of authList" :key="item">
            {{ item }}
          </a-menu-item>
          <a-menu-item> <UserOutlined class="mr-4" />个人信息 </a-menu-item>
          <a-menu-item @click="userStore.resetState"> <LoginOutlined class="mr-2" />登出 </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user';
import type { MenuProps } from 'ant-design-vue';
const userStore = useUserStore();
//
const authList = ['普通角色', '普通用户子角色', '测试角色'];
//
const handleMenuClick: MenuProps['onClick'] = e => {
  console.log('click', e);
};
</script>

<style scoped></style>
