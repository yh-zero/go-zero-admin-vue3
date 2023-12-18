<template>
  <div
    class="h-screen w-screen bg-[#f0f2f5] bg-[url('@/assets/svg/login/bg.svg')] flex flex-center"
  >
    <div
      class="w-[370px] h-[412px] border-solid border border-[#bbbbbb] rounded-[16px] bg-white flex flex-col items-center"
    >
      <p class="text-[26px] text-black font-[600] mt-[20px]">绩效考评系统</p>
      <div class="p-[30px]">
        <div class="demo-login"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { LoginType, LoginRespType } from '@/types/login';
import { getCaptcha, login } from '@/api/modules/loginApi';
onMounted(() => {
  toGetCaptcha();
});
// 获取验证码
const captchaImg = ref<string>('');
async function toGetCaptcha() {
  const res = await getCaptcha();
  captchaImg.value = res.captchaImg;
}
// 登录表单信息
const loginFrom = reactive<LoginType>({
  username: '',
  password: '',
  captcha: '',
});

async function handleSubmit(
  valid: boolean,
  { username, password, captcha }: LoginType,
) {
  if (valid) {
    loginFrom.username = username;
    loginFrom.password = password;
    loginFrom.captcha = captcha;
    const res = await login(loginFrom);
    console.log('====================================');
    console.log(res);
    console.log('====================================');
  }
}
</script>

<style scoped></style>
