<template>
  <div v-if="loading" class="load">
    <span class="loading">
      <span class="loading-inner"></span>
    </span>
  </div>
</template>
<script lang="ts">
import { PropType } from 'vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'vLoading',
  props: {
    tip: {
      type: String as PropType<string>,
      default: '',
    },
    size: {
      type: String as PropType<string>,
      default: 'large',
      validator: (v: string): boolean => {
        return ['default', 'small', 'large'].includes(v);
      },
    },
    absolute: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    background: {
      type: String as PropType<string>,
    },
    theme: {
      type: String as PropType<'dark' | 'light'>,
    },
  },
});
</script>
<style lang="scss" scoped>
/* basic style */
.load {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #1890ff;
  animation: loader 4s infinite ease;
}

.loading-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #1890ff;
  animation: loader-inner 4s infinite ease-in;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}
</style>
