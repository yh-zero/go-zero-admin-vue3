<template>
  <div
    class="h-screen w-screen bg-[#f0f2f5] bg-[url('@/assets/svg/login/bg.svg')] flex flex-center"
  >
    <div
      class="w-[370px] h-[412px] border-solid border border-[#bbbbbb] rounded-[16px] bg-white flex flex-col items-center"
    >
      <p class="text-[26px] text-black font-[600] mt-[20px]">绩效考评系统</p>
      <div class="p-[30px]">
        <div class="demo-login">
          <a-form
            :model="loginFrom"
            name="basic"
            autocomplete="off"
            @finish="handleSubmit"
            @finishFailed="onFinishFailed"
          >
            <a-form-item
              label=""
              name="username"
              :rules="[{ required: true, message: '请输入账户名!' }]"
            >
              <a-input
                size="large"
                placeholder="请输入账户名"
                v-model:value="loginFrom.username"
              >
                <template #addonBefore>
                  <UserOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item
              label=""
              name="password"
              :rules="[{ required: true, message: '请输入密码!' }]"
            >
              <a-input-password
                size="large"
                placeholder="密码"
                v-model:value="loginFrom.password"
              >
                <template #addonBefore>
                  <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                </template>
              </a-input-password>
            </a-form-item>
            <!-- 验证码 -->
            <a-row :gutter="0">
              <a-col :span="16">
                <a-form-item
                  name="captcha"
                  :rules="[{ required: true, message: '请输入验证码!' }]"
                >
                  <a-input
                    v-model:value="loginFrom.captcha"
                    size="large"
                    type="text"
                    placeholder="请输入验证码"
                  >
                    <template #addonBefore>
                      <SmileOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <img
                  @click="toGetCaptcha"
                  :src="captchaImg || '@/assets/images/login/checkcode.png'"
                />
              </a-col>
            </a-row>
            <a-form-item style="margin-top: 24px">
              <a-button
                size="large"
                type="primary"
                htmlType="submit"
                class="w-full h-[40px]"
                :loading="loginBtn"
                :disabled="loginBtn"
                >确定
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserOutlined,
  LockOutlined,
  SmileOutlined,
} from '@ant-design/icons-vue';
import { onMounted, reactive, ref } from 'vue';
import { LoginType, LoginRespType } from '@/types/login';
import { getCaptcha, login } from '@/api/modules/loginApi';
import { mode } from '@/config/config';
onMounted(() => {
  toGetCaptcha();
  if (mode.IS_DEV) {
    loginFrom.captcha = '000000';
    loginFrom.username = 'yanghao';
    loginFrom.password = '123456';
  }
});
// 获取验证码
const captchaImg = ref<string>('');
async function toGetCaptcha() {
  const res = await getCaptcha();
  captchaImg.value = res.captchaImg;
}
// 登录表单信息
const loginBtn = ref(false);
const loginFrom = reactive<LoginType>({
  username: '',
  password: '',
  captcha: '',
});
// 登录
async function handleSubmit() {
  const res = await login(loginFrom);
  console.log(res);
}
// 表单校验
const onFinishFailed = (errorInfo: string) => {
  // message.error('请完善表单信息');
};
</script>

<style scoped></style>
