<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const props = defineProps<{ animate: boolean }>();
const elementRef = ref();
const animate = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      animate.value = true;
    } else {
      animate.value = false;
    }
  }, { threshold: 0.8 });
  observer.observe(elementRef.value);
});
</script>

<template>
  <div ref="elementRef" class="svg-wrapper" :class="{ animate }">
    <svg xmlns="http://www.w3.org/2000/svg">
      <rect class="shape" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
svg {
  width: 100%;
  height: 100%;
}

rect {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.svg-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 32px;
  opacity: 0;
  transition: 0.5s opacity;
  top: 0;
  left: 0;

  &.animate {
    opacity: 1;
  }
}

.shape {
  stroke-dasharray: 400%;
  stroke-dashoffset: -400%;
  stroke-width: 8px;
  fill: transparent;
  stroke: white;
  border-bottom: 5px solid black;
  transition: stroke-width 2s, stroke-dashoffset 2s;
  transition-delay: 1s;
}

.svg-wrapper.animate .shape {
  stroke-width: 4px;
  stroke-dashoffset: 0;
}
</style>
