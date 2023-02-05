<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, watchEffect } from 'vue';
import { timeout } from 'vue-concurrency';

export default defineComponent({
  inheritAttrs: false,
  props: {
    tagName: String,
    once: Boolean,
    requestAnimationFrame: Boolean,
    prerenderWhenIdle: Boolean,
    renderImmediately: Boolean,
    yMargin: {
      type: Number,
      default: 200,
    },
    xMargin: {
      type: Number,
      default: 0,
    },
    height: Number,
    onRender: Function,
    unRenderTimer: {
      type: Number,
      default: () => 2000,
    },

  },
  setup(props) {
    const shouldRender = ref(props.renderImmediately);
    let unRenderTimer;
    const minHeight = ref(0);
    const elRef = ref();
    let observer;

    const onEnter = async () => {
      clearTimeout(unRenderTimer);
      if (shouldRender.value && props.once) {
        return;
      }

      await nextTick();

      if (props.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          shouldRender.value = true;
          props.onRender && nextTick(props.onRender as any);
        });
      } else {
        shouldRender.value = true;
        props.onRender && nextTick(props.onRender as any);
      }
    };

    const onLeave = () => {
      if (props.once) {
        return;
      }

      unRenderTimer = setTimeout(() => {
        if (elRef.value) {
          minHeight.value = elRef.value.clientHeight;
        }
        shouldRender.value = false;

      }, props.unRenderTimer);
    };

    onMounted(async () => {
      observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          onEnter();
        } else {
          onLeave();
        }
      }, {
        rootMargin: `${props.yMargin}px ${props.xMargin}px ${props.yMargin}px ${props.xMargin}px`,
        threshold: 0.5
      });

      observer.observe(elRef.value);
      await timeout(200);


      if (props.prerenderWhenIdle) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(
            () => (shouldRender.value = true),
          );
        } else {
          await timeout(400);
          (window as any).requestAnimationFrame(() => {
            shouldRender.value = true;
          });
        }
      }
    });

    watchEffect(() => {
      if (props.height && props.height > minHeight.value) {
        minHeight.value = props.height;
      }
    });

    return {
      elRef,
      shouldRender,
      minHeight,
    };
  },
});
</script>

<template>
  <component :is="tagName || 'div'" v-bind="$attrs" ref="elRef" :style="minHeight ? `min-height: ${minHeight}px` : ''">
    <slot v-if="shouldRender" :is-visible="shouldRender" />
    <slot v-else name="fallback" />
  </component>
</template>
