<template>
  <a-card class="mb-3">
    <a-form ref="searchRef" class="grid gap-2" layout="inline" :model="formState" name="basic" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }" autocomplete="off">
      <!-- 默认插槽 -->
      <div class="grid grid-cols-4 gap-2">
        <slot name="default"></slot>
      </div>
      <!-- 收缩插槽 -->
      <div class="grid grid-cols-4 gap-2" v-if="isFolded">
        <slot name="folded"></slot>
      </div>
    </a-form>
    <div class="float-right mt-2 mr-4">
      <a-button v-if="slotFolded" @click="isFolded = !isFolded" class="mr-2">
        <CaretUpOutlined :class="{ 'transform rotate-180': !isFolded }" />
        {{ isFolded ? '收起' : '展开' }}
      </a-button>
      <a-button @click="toSearch" type="primary" class="mr-2"><SearchOutlined />搜索</a-button>
      <a-button @click="resetForm"><RetweetOutlined />重置</a-button>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue';
import { ref, computed, useSlots } from 'vue';
const slots = useSlots();
const slotFolded = !!slots['folded']; //使用方式
const props = defineProps({
  search: Object,
});

//========= 折叠 =========
const isFolded = ref(true);
// ========= 搜索 =========
function toSearch() {
  emits('toSearch');
}
//========= 监听props.search的变化 =========
const emits = defineEmits(['update:search', 'toSearch']);
let formState = computed({
  get: () => {
    return props.search;
  },
  set: value => {
    emits('update:search', value);
  },
});
const searchRef = ref();
function resetForm() {
  searchRef.value.resetFields();
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
