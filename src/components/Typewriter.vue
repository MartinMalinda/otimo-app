<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{ text: string, interval?: number, delay?: number }>();

const elementRef = ref<HTMLElement>();
const words = ref(props.text.split(' ').map((word) => {
  return {
    word,
    animate: false
  }
}));

onMounted(() => {
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      setTimeout(() => {
        words.value.forEach((letter, index) => {
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
    <template v-for="word, index in words">
      <span class="word" :class="{ animate: word.animate }">{{
        word.word
      }}</span>
      <span v-if="index !== words.length - 1" class="word" :class="{ animate: word.animate }">&nbsp;</span>
    </template>
  </div>
</template>

<style scoped lang="scss">
.typewriter {
  vertical-align: middle;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // gap: 0.1em;
}

.word {
  opacity: 0;
  vertical-align: middle;
  display: inline-block;
  padding: 0px;
  background: rgba(0, 0, 0, 0.284);

  &.empty {
    width: 5px;
    border: 1px solid black;
    line-height: 1em;
  }

  &.animate {
    animation: 1s fadeIn forwards;
  }

  &:first-child {
    // padding-left: 16px;
  }

  &:last-child {
    // padding-right: 16px;
  }
}
</style>
