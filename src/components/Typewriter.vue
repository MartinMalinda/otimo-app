<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{ text: string, interval?: number, delay?: number }>();

const elementRef = ref<HTMLElement>();
const letters = ref([...props.text].map((letter) => {
  return {
    letter,
    animate: false
  }
}));

onMounted(() => {
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      setTimeout(() => {
        letters.value.forEach((letter, index) => {
          setTimeout(() => requestAnimationFrame(() => letter.animate = true), index * (props.interval ? props.interval : 16));
        });
      }, props.delay || 0);
      observer.disconnect();
    }
  }, { rootMargin: '0px', threshold: 1 });

  observer.observe(elementRef.value as HTMLElement);
});


</script>

<template>
  <div ref="elementRef" class="typewriter">
    <span v-for="letter in letters" class="letter" :class="{ animate: letter.animate, empty: letter.letter === ' ' }">{{
      letter.letter
    }}</span>
  </div>
</template>

<style scoped lang="scss">
.typewriter {
  vertical-align: middle;
  display: flex;
  flex-wrap: wrap;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translate(0, -20%);
    transform-origin: 50% 50%;
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

.letter {
  opacity: 0;
  vertical-align: middle;
  display: inline-block;
  padding: 0px;
  background: rgba(0, 0, 0, 0.284);

  &.empty {
    width: 5px;
    line-height: 1em;
  }

  &.animate {
    animation: 1s fadeIn forwards;
  }

  &:first-child {
    padding-left: 16px;
  }

  &:last-child {
    padding-right: 16px;
  }
}
</style>
