<template>
  <a-popconfirm title="确认删除吗?" ok-text="删除" cancel-text="取消" @confirm="confirm">
    <slot>
      <a-button :disabled="disabled" type="link"
        ><template #icon> <DeleteOutlined /> </template>删除</a-button
      >
    </slot>
  </a-popconfirm>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
const emits = defineEmits(['handlerOK']);
function confirm() {
  emits('handlerOK');
}
</script>

<style scoped></style>
