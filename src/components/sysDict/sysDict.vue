<template>
  <a-form-item v-if="diceReq && needForm" :label="labelName || diceReq.name" :name="diceReq.name">
    <DictSelect v-if="type == 'select'" v-bind="$attrs" :diceDetail="diceReq" />
    <DictCheckbox v-if="type == 'checkbox'" v-bind="$attrs" :diceDetail="diceReq" />
    <DictRadio v-if="type == 'radio'" v-bind="$attrs" :diceDetail="diceReq" />
  </a-form-item>
  <div v-else-if="diceReq">
    <DictSelect v-if="type == 'select'" v-bind="$attrs" :diceDetail="diceReq" />
    <DictCheckbox v-if="type == 'checkbox'" v-bind="$attrs" :diceDetail="diceReq" />
    <DictRadio v-if="type == 'radio'" v-bind="$attrs" :diceDetail="diceReq" />
  </div>
  <span class="text-[red]" v-if="hasDiceReq">字典不存在</span>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDictDetailByType } from './dictUtils';
import { DiceDetail } from '@/types/dictionary';
// ============ 组件 ============
import DictSelect from './modules/dictSelect.vue';
import DictCheckbox from './modules/dictCheckbox.vue';
import DictRadio from './modules/dictRadio.vue';
const props = withDefaults(
  defineProps<{
    dict: string;
    type: 'select' | 'checkbox' | 'radio';
    needForm?: boolean; //是否需要form表单格式
    labelName?: string; //表单label名称
  }>(),
  {
    type: 'select',
  },
);

interface DeatilInf {
  aaa: string;
  bbb: number;
}

// 获取字典详情信息
const hasDiceReq = ref(false);
const diceReq = ref<DiceDetail>();
onMounted(async () => {
  try {
    diceReq.value = await getDictDetailByType({ type: props.dict });
  } catch (error) {
    hasDiceReq.value = diceReq.value ? false : true;
  }
});
</script>

<style scoped></style>
