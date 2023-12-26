<template>
  <a-modal :cancelText="cancelText" :okText="okText" v-model:open="_open" @ok="handleOK">
    <slot></slot>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
interface Props {
  open: boolean;
  okText?: string;
  cancelText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  okText: '确定',
  cancelText: '取消',
});
const emits = defineEmits(['update:open', 'ok']);

const _open = computed({
  get: () => {
    return props.open;
  },
  set: val => {
    if (!val) {
      close(val);
    }
  },
});

function close(val: any) {
  emits('update:open', val);
}

function handleOK() {
  close(false);
  emits('ok');
}
</script>

<style lang="scss" scoped></style>
