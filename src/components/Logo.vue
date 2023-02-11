<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import * as rive from "@rive-app/canvas";
import { timeout } from 'vue-concurrency';

let riv: rive.Rive;
const canvasRef = ref();

const props = defineProps<{
  width: number,
  shouldAnimate: boolean,
  beforeAnimation: () => void,
  afterAnimation: () => void,
}>();

const animate = () => {
  riv.play();
  riv.on(rive.EventType.Stop, async () => {
    await timeout(300);
    props.afterAnimation();
  });
};

const reset = () => {
  riv.unsubscribeAll();
  riv.reset();
};

onMounted(() => {
  riv = new rive.Rive({
    src: "/tree5.riv",
    canvas: canvasRef.value,
  });
});

watch(() => props.shouldAnimate, async () => {
  await nextTick();
  if (props.shouldAnimate) {
    props.beforeAnimation();
    animate();
  } else {
    reset();
  }
}, { immediate: true });
</script>

<template>
  <canvas ref="canvasRef" id="canvas" :width="width" :height="width"></canvas>
</template>

<style lang="scss" scoped>
canvas {
  border-radius: 50%;
  border: 2px solid var(--green);
  background: $whity;
  max-width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
}
</style>
