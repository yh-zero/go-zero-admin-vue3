<template>
  <div
    class="flex items-center rounded-full bg-[#fff]/[0.2] pl-[1rem] pr-[1rem]"
  >
    <input
      @click="show = true"
      readonly
      v-model="fieldValue"
      placeholder="请选择所在地区"
      class="h-[2rem] bg-[#fff]/[0] placeholder-[#fff]"
    />
    <img
      v-show="!loading"
      class="h-[2rem] w-[2rem] cursor-pointer"
      @click="getUserLocation"
      src="@/assets/svg/当前定位.svg"
      alt=""
    />
    <van-loading v-show="loading" class="h-[2rem] w-[2rem]" color="#fff" />
  </div>
  <van-popup
    v-model:show="show"
    round
    position="bottom"
    style="background-color: #1d2032"
  >
    <van-cascader
      :show-header="false"
      :closeable="false"
      v-model="cascaderValue"
      :options="options"
      @close="show = false"
      @finish="onFinish"
    />
  </van-popup>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue';
import { useCascaderAreaData } from '@vant/area-data';
import { getAddressByIp } from '@/api/modules/miniTools';
import type { AddressByIpResp } from '@/types/miniTools';
const props = defineProps({
  address: String,
});
const show = ref(false);
const loading = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
const options = useCascaderAreaData();
const onFinish = ({ selectedOptions }: any) => {
  show.value = false;
  fieldValue.value = selectedOptions
    .map((option: any) => option.text)
    .join('/');
  emitAddress();
};

// 获取用户地址
function getUserLocation() {
  loading.value = true;
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      addressByIp(data.ip);
    })
    .catch(error => {
      console.log(error);
    });
}
async function addressByIp(ip: string) {
  const res = await getAddressByIp({ ip: ip });
  cascaderValue.value = res.info.adcode;
  fieldValue.value = `${res.info.region}/${res.info.city}/${res.info.district}`;
  loading.value = false;
  emitAddress();
}
const emits = defineEmits(['update:address', 'change']);
function emitAddress() {
  emits('update:address', fieldValue.value);
  emits('change', fieldValue.value);
}
</script>

<style scoped lang="scss">
::v-deep(.van-field) {
  border-radius: 100px;
}
::v-deep(.van-tab__text) {
  color: #fff;
}
::v-deep(.van-tabs__nav) {
  background-color: #1d2032;
}
</style>
