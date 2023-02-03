<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{ videoSources: string[] }>();

const videos = ref(props.videoSources.map((src) => ({
  src,
  el: undefined as HTMLMediaElement | undefined,
  canPlay: false,
  isPlaying: false,
})));

const getNextVideo = (video: typeof videos.value[0]) => {
  const nextIndex = videos.value.indexOf(video) + 1;
  return videos.value[nextIndex] || videos.value[0];
};

onMounted(() => {
  videos.value.forEach((video) => {
    video.el?.addEventListener('canplay', () => {
      video.canPlay = true;
    });

    video.el?.addEventListener('ended', () => {
      const nextVideo = getNextVideo(video)
      if (nextVideo.canPlay) {
        setTimeout(() => {
          video.isPlaying = false;
        }, 200)
        nextVideo.el?.play();
      } else {
        video.el?.play();
      }
    });

    video.el?.addEventListener('play', () => {
      video.isPlaying = true;
      const nextVideo = getNextVideo(video);
      nextVideo.el!.preload = 'auto';
    });
  });

  videos.value[0].el?.play();
});
</script>
<template>
  <div class="videos">
    <video v-for="video in videos" :class="{ hidden: !video.isPlaying }" :key="video.src" :src="video.src" muted
      :ref="(el: any) => video.el = el" />
  </div>
</template>

<style lang="scss" scoped>
video {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  opacity: 0.8;
  transition: 0.4s opacity;

  &.hidden {
    opacity: 0;
  }
}
</style>
