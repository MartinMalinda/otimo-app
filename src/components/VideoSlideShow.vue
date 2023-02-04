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

document.addEventListener('scroll', (event) => {
  console.log(document.scrollingElement?.scrollTop);
  if (document.scrollingElement?.scrollTop === 0) {
  }
});

onMounted(() => {
  videos.value.forEach((video) => {
    video.el?.addEventListener('canplay', () => {
      video.canPlay = true;
    });

    if (videos.value.length > 1) {
      video.el?.addEventListener('ended', () => {
        const nextVideo = getNextVideo(video);
        if (nextVideo.canPlay) {
          if (nextVideo !== video) {
            setTimeout(() => {
              video.isPlaying = false;
            }, 200)
          }
          nextVideo.el?.play();
        } else {
          video.el?.play();
        }
      });
    } else {
      video.el!.loop = true;
    }

    video.el?.addEventListener('play', () => {
      video.isPlaying = true;
      const nextVideo = getNextVideo(video);
      nextVideo.el!.preload = 'auto';
    });
  });

  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      console.log('playing', videos.value[0]?.src);
      videos.value[0].el?.play();
    } else {
      console.log('pausing', videos.value[0]?.src);
      videos.value.forEach((video) => video.el?.pause());
    }
  }, { rootMargin: '200px', threshold: 0.2 });

  observer.observe(videos.value[0].el as HTMLMediaElement);

});

const getVideoPath = (path: string) => {
  let params = `c_scale,w_1650`;
  if (window.innerWidth < 900 && window.innerHeight > window.innerWidth) {
    params = `c_crop,g_center,h_1200,w_700`;
  }

  return `https://res.cloudinary.com/serenity-themes/video/upload/${params}/v1675517586/otimo${path}`;
};
</script>
<template>
  <div class="videos">
    <video v-for="video in videos" :class="{ hidden: !video.isPlaying }" :key="video.src" :src="getVideoPath(video.src)"
      muted playsinline :ref="(el: any) => video.el = el" />
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
