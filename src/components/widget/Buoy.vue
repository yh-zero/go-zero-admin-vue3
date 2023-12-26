<template>
  <div>
    <div
      :class="{ 'WidgetBuoy-editor': inEditor }"
      @touchstart.stop="handleImageStart"
      @touchmove.stop.prevent="handleImageMove"
      class="WidgetBuoy"
      ref="buoyRef"
    >
      <div @click="redirectClick(data.link)" class="WidgetBuoy-image-wrap">
        <img :src="data.imageUrl" class="WidgetBuoy-image" />
        <div
          v-if="data.buoyCloseShown"
          @click.stop="handleClose"
          class="WidgetBuoy-icon-close"
        >
          <!-- 关闭图标 -->
          <!-- <ui-icon name="buoy-close" /> -->
        </div>
      </div>
    </div>
    <div v-show="inEditor" class="WidgetBuoy-editor-info">
      <!-- 由于特殊原因，我就先按组件顺序展示了，用户看到的我其实是在底部 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';
import { setStyle, getPropNumeric } from '@/utils/styles';
import { useRouter, useRoute } from 'vue-router';
type btnType = {
  link: string;
  imageUrl: string;
  buoyCloseShown: boolean;
};
const props = defineProps<{ data: btnType; inEditor: boolean }>();

const router = useRouter();
const buoyRef = ref<any>(null);
const canMoveMaxX = ref<number>(0);
const canMoveMaxY = ref<number>(0);
const toPageX = ref<number>(0);
const toPageY = ref<number>(0);
const startX = ref<number>(0);
const startY = ref<number>(0);

onMounted(() => {
  canMoveMaxX.value =
    window.innerWidth - getPropNumeric(buoyRef.value, 'width');
  canMoveMaxY.value =
    window.innerHeight - getPropNumeric(buoyRef.value, 'height');
});

const redirectClick = (link: any) => {
  if (link.includes('http')) {
    window.open(link);
    return;
  }
  router.push(link);
};

const handleImageStart = (event: any) => {
  const targetRect = buoyRef.value.getBoundingClientRect();
  startX.value = targetRect.left;
  startY.value = targetRect.top;
  const { touches } = event;
  toPageX.value = touches[0].pageX;
  toPageY.value = touches[0].pageY;
};

const handleImageMove = (event: any) => {
  const { touches } = event;
  const { pageX, pageY } = touches[0];
  const moveX = Math.max(
    0,
    Math.min(pageX - toPageX.value + startX.value, canMoveMaxX.value),
  );
  const moveY = Math.max(
    0,
    Math.min(pageY - toPageY.value + startY.value, canMoveMaxY.value),
  );
  setStyle(
    buoyRef.value,
    {
      left: `${moveX}px`,
      top: `${moveY}px`,
    },
    true,
  );
};

const handleClose = () => {
  setStyle(buoyRef.value, {
    display: 'none',
  });
  if (props.inEditor) return;
};
</script>
<style lang="scss" scoped>
.WidgetBuoy {
  position: fixed;
  bottom: 50px;
  right: 0;
  overflow: hidden;
  width: 100px;
  height: 100px;
  z-index: 100;
}

.FieldBuoy-margin {
  margin-bottom: 0.2rem;
}

.WidgetBuoy-editor {
  position: relative;
}

.WidgetBuoy-image-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.WidgetBuoy-image {
  width: 100%;
  height: 100%;
}

.WidgetBuoy-icon-close {
  position: absolute;
  top: 0;
  right: 0;
}

.WidgetBuoy-editor-info {
  font-size: 0.28rem;
  text-align: center;
}
</style>
