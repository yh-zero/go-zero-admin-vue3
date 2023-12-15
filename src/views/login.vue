<template>
  <div
    class="h-screen w-screen bg-[#f0f2f5] bg-[url('@/assets/svg/login/bg.svg')] flex flex-center"
  >
    <div
      class="w-[370px] h-[412px] border-solid border border-[#bbbbbb] rounded-[16px] bg-white flex flex-col items-center"
    >
      <p class="text-[26px] text-black font-[600] mt-[20px]">绩效考评系统</p>
      <div class="p-[30px]">
        <Form
          ref="formInline"
          :model="loginFrom"
          :rules="ruleInline"
          class="w-[308px]"
        >
          <FormItem prop="user" class="h-[40px]">
            <Input
              type="text"
              v-model="loginFrom.username"
              placeholder="请输入账户名"
            >
              <template #prepend>
                <Icon type="ios-person-outline"></Icon>
              </template>
            </Input>
          </FormItem>
          <FormItem prop="password" class="h-[40px]">
            <Input
              type="password"
              v-model="loginFrom.password"
              placeholder="请输入密码"
            >
              <template #prepend>
                <Icon type="ios-lock-outline"></Icon>
              </template>
            </Input>
          </FormItem>
          <FormItem prop="password" class="h-[40px]">
            <Input
              type="password"
              v-model="loginFrom.captcha"
              placeholder="请输入验证码"
            >
              <template #append>
                <img
                  @click="toGetCaptcha"
                  class="min-w-[105px] min-h-[35px]"
                  :src="captchaImg"
                  alt=""
                />
              </template>
            </Input>
          </FormItem>

          <FormItem>
            <Button
              @click="handleSubmit"
              class="w-full"
              size="large"
              type="primary"
            >
              确定
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { LoginType, LoginRespType } from '@/types/login';
import { getCaptcha } from '@/api/modules/loginApi';
onMounted(() => {
  toGetCaptcha();
});
// 获取验证码
const captchaImg = ref<string>('');
async function toGetCaptcha() {
  const res = await getCaptcha({ timestamp: Date.now() + '' });
  captchaImg.value = res.captchaImg;
}
const loginFrom = reactive<LoginType>({
  username: '',
  password: '',
  captcha: '',
  checkKey: '',
});

function handleSubmit() {}

// ============  非业务 ===============
// 校验表单
const ruleInline = reactive({
  username: [
    {
      required: true,
      message: '请输入账户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
});
// 登录表单信息
</script>

<style scoped></style>
